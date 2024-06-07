import { useEffect } from 'react'

const useSuccess = (isLoading: boolean, isSuccess: boolean, action: () => void) => {
	useEffect(() => {
		if (!isLoading && isSuccess) action()
	}, [isLoading, isSuccess, action])
}
export default useSuccess
