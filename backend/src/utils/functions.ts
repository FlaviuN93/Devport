import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
import AppError from './appError'
import crypto from 'crypto'

export const removePassword = <T extends { [key: string]: any }>(obj: T): T => {
	if (obj.hasOwnProperty('password')) delete obj.password
	if (obj.hasOwnProperty('password_updated_at')) delete obj.password_updated_at
	if (obj.hasOwnProperty('created_at')) delete obj.created_at
	return obj
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

export const checkPasswordChange = (JWTTimestamp: number, passwordTimestamp: string) => {
	const changePasswordTimestamp = Date.parse(passwordTimestamp) / 1000
	return JWTTimestamp < changePasswordTimestamp
}

export const createPasswordResetToken = () => {
	const resetToken = crypto.randomBytes(32).toString('hex')
	const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
	return resetToken
}
