import { useEffect, useState } from 'react'

const useLoadImage = (imageUrls: string[]): boolean => {
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	useEffect(() => {
		const loadImage = (imageUrl: string) => {
			return new Promise((resolve, reject) => {
				const loadImg = new Image()
				loadImg.src = imageUrl
				loadImg.onload = () =>
					setTimeout(() => {
						resolve(imageUrl)
					}, 500)

				loadImg.onerror = (err) => reject(err)
			})
		}

		Promise.all(imageUrls.map((url) => loadImage(url)))
			.then(() => setIsImageLoaded(true))
			.catch((err) => console.log('Failed to load images', err))
	}, [imageUrls])

	return isImageLoaded
}

export default useLoadImage
