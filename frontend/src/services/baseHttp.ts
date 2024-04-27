import axios, { Method } from 'axios'
import { HttpParamsType } from './types'

const instance = axios.create({ baseURL: process.env.LOCAL_DOMAIN, withCredentials: true, timeout: 1000 })

const request = async <T>(method: Method, url: string, paramsData?: HttpParamsType): Promise<T | any> => {
	try {
		const { data } = await instance.request({
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
		console.log(err, 'CheckError')
	}
}

export const getReq = <T>(url: string, paramsData?: HttpParamsType): Promise<T | Error> =>
	request<T>('get', url, paramsData)

export const postReq = <T>(url: string, paramsData?: HttpParamsType): Promise<T | Error> =>
	request<T>('post', url, paramsData)

export const patchReq = <T>(url: string, paramsData?: HttpParamsType): Promise<T | Error> =>
	request<T>('post', url, paramsData)

export const deleteReq = <T>(url: string, paramsData?: HttpParamsType): Promise<T | Error> =>
	request<T>('post', url, paramsData)
