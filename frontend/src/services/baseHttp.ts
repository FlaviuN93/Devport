import axios, { Method } from 'axios'
import { HttpParamsType } from '../utils/types'

const instance = axios.create({ baseURL: process.env.LOCAL_DOMAIN, withCredentials: true })

export const request = async <T>(method: Method, url: string, paramsData?: HttpParamsType): Promise<T> => {
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
		throw Error
	}
}
