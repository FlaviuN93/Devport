import axios, { AxiosError, Method } from 'axios'
import { HttpParamsType } from './types'

const instance = axios.create({
	baseURL: import.meta.env.VITE_LOCAL_DOMAIN,
	withCredentials: true,
	timeout: 1000,
})

const request = async <T>(method: Method, url: string, paramsData?: HttpParamsType): Promise<T> => {
	try {
		const { data } = await instance.request<T>({
			method,
			url,
			data: paramsData?.body,
			params: paramsData?.queryParams,
			headers: {
				'content-type': paramsData?.body instanceof FormData ? 'multipart/form-data' : 'application/json',
			},
		})
		return data
	} catch (err) {
		if (err instanceof AxiosError) {
			if (!err.response)
				throw { statusCode: 500, statusText: 'Server Error', type: err.code, message: err.message }
			const error = err.response

			throw {
				statusCode: error.status,
				statusText: error.statusText,
				type: error.data.type,
				message: error.data.message,
			}
		}

		throw {
			statusCode: 500,
			statusText: 'Server Error',
			type: '',
			message: 'Unexpected Error. Please give us some time to fix the problem.',
		}
	}
}

export const get = <T>(url: string, paramsData?: HttpParamsType): Promise<T> =>
	request<T>('get', url, paramsData)

export const post = <T>(url: string, paramsData?: HttpParamsType): Promise<T> =>
	request<T>('post', url, paramsData)

export const patch = <T>(url: string, paramsData?: HttpParamsType): Promise<T> =>
	request<T>('post', url, paramsData)

export const remove = <T>(url: string, paramsData?: HttpParamsType): Promise<T> =>
	request<T>('post', url, paramsData)
