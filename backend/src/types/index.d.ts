declare global {
	module 'express' {
		interface Request {
			userId?: number
		}
	}
}
