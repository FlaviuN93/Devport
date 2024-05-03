import { AxiosError } from 'axios'

class AppError<T> extends AxiosError {
	constructor(public error: T) {
		super()
	}
}
export default AppError
