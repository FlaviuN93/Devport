import axios, { AxiosError, Method } from 'axios'
import { HttpParamsType } from './types'

const instance = axios.create({
	baseURL: import.meta.env.VITE_LOCAL_DOMAIN,
	withCredentials: true,
	timeout: 1000,
})

const request = async <D, B = undefined>(
	method: Method,
	url: string,
	paramsData?: HttpParamsType<B>
): Promise<D> => {
	try {
		const { data } = await instance.request<D>({
			method,
			url,
			data: paramsData?.body,
			params: paramsData?.query,
			headers: {
				'content-type': paramsData?.body instanceof FormData ? 'multipart/form-data' : 'application/json',
			},
		})
		return data
	} catch (err) {
		if (err instanceof AxiosError) {
			if (!err.response)
				throw {
					statusTitle: `500: ${err.code}`,
					type: err.code,
					message: 'Unexpected Error. Please give us some time to fix the problem.',
				}
			const error = err.response

			throw {
				statusTitle: `${error.status}: ${error.statusText}`,
				type: error.data.type,
				message: error.data.message,
			}
		}

		throw {
			statusTitle: '500: Server Error',
			type: '',
			message: 'Unexpected Error. Please give us some time to fix the problem.',
		}
	}
}

export const get = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>): Promise<D> =>
	request<D, B>('get', url, paramsData)

export const post = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>): Promise<D> =>
	request<D, B>('post', url, paramsData)

export const patch = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>): Promise<D> =>
	request<D, B>('post', url, paramsData)

export const remove = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>): Promise<D> =>
	request<D, B>('post', url, paramsData)
