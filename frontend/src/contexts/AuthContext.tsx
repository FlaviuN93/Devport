import { FC, ReactNode, createContext, useLayoutEffect, useState } from 'react'
import { axiosApiInstance } from '../services/baseHttp'
import { AxiosError } from 'axios'
import { getRefreshToken } from '../services/api.requests'

interface AuthContextProps {
	handleSetToken: (token: string) => void
}

declare module 'axios' {
	export interface AxiosRequestConfig {
		_retry?: boolean
	}
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string | null>(null)

	const handleSetToken = (token: string) => setToken(token)

	useLayoutEffect(() => {
		const authInterceptor = axiosApiInstance.interceptors.request.use((config) => {
			config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization
			return config
		})
		return () => axiosApiInstance.interceptors.request.eject(authInterceptor)
	}, [token])

	useLayoutEffect(() => {
		const refreshInterceptor = axiosApiInstance.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				if (!error.config) return
				const originalRequest = error.config

				if ((error.response?.status === 500 || error.response?.status === 403) && !originalRequest._retry) {
					originalRequest._retry = true
					try {
						const response = await getRefreshToken()
						setToken(response.token)
						originalRequest.headers.Authorization = `Bearer ${response.token}`
						return axiosApiInstance(originalRequest)
					} catch (err) {
						setToken(null)
					}
				}
				return Promise.reject(error)
			}
		)
		return () => axiosApiInstance.interceptors.response.eject(refreshInterceptor)
	}, [])

	return <AuthContext.Provider value={{ handleSetToken }}>{children}</AuthContext.Provider>
}
