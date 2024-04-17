declare global {
	module 'express-serve-static-core' {
		interface Request {
			userId?: number
		}
	}
}
