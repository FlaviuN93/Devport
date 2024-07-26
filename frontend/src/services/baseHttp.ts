import axios, { AxiosError, Method, RawAxiosRequestHeaders } from 'axios'
import { HttpParamsType } from './types'

export const axiosApiInstance = axios.create({
	baseURL: import.meta.env.VITE_API_DOMAIN,
	withCredentials: true,
	timeout: 15000,
})

const request = async <D, B = undefined>(
	method: Method,
	url: string,
	paramsData?: HttpParamsType<B>,
	headers?: RawAxiosRequestHeaders
): Promise<D> => {
	try {
		const { data } = await axiosApiInstance.request<D>({
			method,
			url,
			data: paramsData?.body,
			params: paramsData?.query,
			headers,
		})

		return data
	} catch (err) {
		if (err instanceof AxiosError) {
			if (!err.response) {
				if (err.code === 'ECONNABORTED') err.code = 'CONNECTION ISSUES'
				if (err.code === 'ERR_NETWORK') err.code = 'NETWORK ERROR'
				throw {
					statusTitle: `500: ${err.code}`,
					message: 'Something went wrong. Please give us some time to fix the problem.',
					type: err.code,
				}
			}
			const error = err.response
			throw {
				statusTitle: `${error.status} ${error.statusText}`,
				message: error.data.message,
				type: error.data.type,
			}
		}

		throw {
			type: 'Server Error',
			statusTitle: '500: Server Error',
			message: 'Something went wrong. Please give us some time to fix the problem.',
		}
	}
}

export const get = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>, headers?: RawAxiosRequestHeaders): Promise<D> =>
	request<D, B>('get', url, paramsData, headers)

export const post = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>, headers?: RawAxiosRequestHeaders): Promise<D> =>
	request<D, B>('post', url, paramsData, headers)

export const patch = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>, headers?: RawAxiosRequestHeaders): Promise<D> =>
	request<D, B>('patch', url, paramsData, headers)

export const put = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>, headers?: RawAxiosRequestHeaders): Promise<D> =>
	request<D, B>('put', url, paramsData, headers)

export const remove = <D, B = undefined>(url: string, paramsData?: HttpParamsType<B>, headers?: RawAxiosRequestHeaders): Promise<D> =>
	request<D, B>('delete', url, paramsData, headers)
