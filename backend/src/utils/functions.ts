import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
import AppError from './appError'
import crypto from 'crypto'

export const removeUserColumns = <T extends { [key: string]: any }>(obj: T): T => {
	if (obj.hasOwnProperty('password')) delete obj.password
	if (obj.hasOwnProperty('passwordUpdatedAt')) delete obj.passwordUpdatedAt
	if (obj.hasOwnProperty('created_at')) delete obj.created_at
	if (obj.hasOwnProperty('resetToken')) delete obj.resetToken
	if (obj.hasOwnProperty('resetTokenExpiresIn')) delete obj.resetTokenExpiresIn

	return obj
}

export const removeUserPassword = <T extends { [key: string]: any }>(user: T): T => {
	if (user.hasOwnProperty('password')) delete user.password
	return user
}

export const verifyToken = <T extends jwt.JwtPayload>(reqToken: string): T | AppError => {
	try {
		const decodedToken = jwt.verify(reqToken, process.env.JWT_SECRET || '')
		if (typeof decodedToken === 'string') return new AppError(500, 'JsonWebToken')
		return decodedToken as T
	} catch (err) {
		// Order matters here. TokenExpiredError is a subclass of JsonWebTokenError. That's why JsonWebTokenError is at the end.

		if (err instanceof NotBeforeError)
			return new AppError(403, err.message, 'Your token is not active. Nice try!')

		if (err instanceof TokenExpiredError)
			return new AppError(403, err.message, 'Your token has expired! Please log in again.')

		if (err instanceof JsonWebTokenError)
			return new AppError(403, err.message, 'Invalid token. Please login in again.')
	}

	return new AppError(500, 'JsonWebToken')
}

export const checkPasswordChange = (JWTTimestamp: number, passwordTimestamp: string) =>
	JWTTimestamp < Date.parse(passwordTimestamp) / 1000

export const createPasswordResetToken = (): PasswordResetTokenData => {
	const resetToken = crypto.randomBytes(32).toString('hex')
	const encryptedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
	const tokenExpiresIn = Date.now() + 15 * 60 * 1000
	return { resetToken, encryptedResetToken, tokenExpiresIn }
}

export const signToken = (id: number): string =>
	jwt.sign({ userId: id }, process.env.JWT_SECRET || '', {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})

type PasswordResetTokenData = {
	resetToken: string
	encryptedResetToken: string
	tokenExpiresIn: number
}
