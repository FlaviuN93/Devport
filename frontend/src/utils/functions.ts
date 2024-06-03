import { Area } from 'react-easy-crop'
import { IDefaultError } from '../services/types'
import { ObjectType, PasswordValidationType } from './types'

export const getMessageForValidation = (messageKey: PasswordValidationType): string => {
	const validationRules = {
		lowerCase: 'Lowercase letter',
		upperCase: 'Uppercase letter',
		specialChar: 'Special character (!?<>@#$)',
		number: 'Number',
		minLength: '8 characters or more',
		maxLength: '20 caracters maximum',
	}

	return validationRules[messageKey]
}
export const getValueFromStorage = <T>(key: string, initialValue: T) => {
	if (typeof window.localStorage === 'undefined') console.log('localStorage is not supported')
	const item = window.localStorage.getItem(key)
	if (!item) return initialValue

	const data: T = JSON.parse(item)

	return data
}

export const getImageFormat = (format: 'landscape' | 'portrait' | 'cover', file: File) => {
	return new Promise<boolean>((resolve) => {
		const img = document.createElement('img')
		img.onload = function () {
			const aspectRatio = img.width / img.height
			if (format === 'landscape' && aspectRatio < 1.3) resolve(false)
			if (format === 'portrait' && aspectRatio > 0.9) resolve(false)
			if (format === 'cover' && aspectRatio < 3.5) resolve(false)
			resolve(true)
		}

		img.src = URL.createObjectURL(file)
	})
}

export const createZodErrorMessage = (error: IDefaultError): string | null => {
	if (error.type === 'zodError' && typeof error.message === 'object') {
		let toastMessage = `${error.statusTitle.toUpperCase()}:\n `
		for (const [field, errorMessage] of Object.entries(error.message)) {
			toastMessage += `${field.toUpperCase()}: ${Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage}\n`
		}

		return toastMessage
	}

	return null
}

export const convertToFormData = (data: ObjectType): FormData => {
	const formData = new FormData()
	const fileKeys = Object.keys(data).filter((key: string) => key.endsWith('File'))
	const bodyData = structuredClone(data)
	fileKeys.forEach((key) => formData.append(key, bodyData[key]))
	fileKeys.forEach((key) => delete bodyData[key])
	formData.append('body', JSON.stringify(bodyData))
	return formData
}

export const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
	return new Promise((resolve) => {
		const reader = new FileReader()
		reader.addEventListener('load', () => resolve(reader.result), false)
		reader.readAsDataURL(file)
	})
}

export const getRadianAngle = (degreeValue: number) => (degreeValue * Math.PI) / 180

export const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image()
		image.addEventListener('load', () => resolve(image))
		image.addEventListener('error', (error) => reject(error))
		image.src = url
	})

export const rotateSize = (width: number, height: number, rotation: number) => {
	const rotRad = getRadianAngle(rotation)

	return {
		width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
		height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
	}
}

export async function getCroppedImg(
	imageSrc: string | null,
	pixelCrop: Area | null
): Promise<{ croppedFile: File; croppedUrl: string } | null> {
	if (!imageSrc) return null
	if (!pixelCrop) return null
	const image = await createImage(imageSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	if (!ctx) return null

	// draw the initial image to canvas
	canvas.width = image.width
	canvas.height = image.height
	ctx.drawImage(image, 0, 0)

	const croppedCanvas = document.createElement('canvas')
	const croppedCtx = croppedCanvas.getContext('2d')

	if (!croppedCtx) return null
	// add the cropped values to the croppedCanvas
	croppedCanvas.width = pixelCrop.width
	croppedCanvas.height = pixelCrop.height

	// Draw the cropped image onto the new canvas
	croppedCtx.drawImage(canvas, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height)

	return new Promise((resolve) => {
		croppedCanvas.toBlob((canvasBlob) => {
			if (!canvasBlob) return null
			const croppedFile = new File([canvasBlob], 'coverFile', { lastModified: Date.now(), type: 'image/jpeg' })
			const croppedUrl = URL.createObjectURL(croppedFile)
			resolve({ croppedFile, croppedUrl })
		}, 'image/jpeg')
	})
}

// export async function getCroppedImg(
// 	imageSrc: string | null,
// 	pixelCrop: Area | null,
// 	rotation = 0,
// 	flip = { horizontal: false, vertical: false }
// ): Promise<Blob | null> {
// 	if (!imageSrc) return null
// 	if (!pixelCrop) return null

// 	const image = await createImage(imageSrc)
// 	const canvas = document.createElement('canvas')
// 	const ctx = canvas.getContext('2d')

// 	console.log(image, imageSrc, 'helloFromIMage')
// 	if (!ctx) return null
// 	const rotRad = getRadianAngle(rotation)
// 	// calculate bounding box of the rotated image
// 	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, 0)
// 	console.log(bBoxHeight, bBoxWidth, 'helloFROMBBOXHEIGHTWIDTH')
// 	// // set canvas size to match the bounding box
// 	canvas.width = bBoxWidth
// 	canvas.height = bBoxHeight
// 	console.log(canvas, 'canvasAGAIN')

// 	// translate canvas context to a central location to allow rotating and flipping around the center
// 	ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
// 	ctx.rotate(rotRad)
// 	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
// 	ctx.translate(-image.width / 2, -image.height / 2)
// 	console.log(ctx, 'CTX AGAIN')

// 	// draw rotated image
// 	ctx.drawImage(image, 0, 0)
// 	console.log(canvas, 'CANVAS', ctx, 'CTX', 'what is this')
// 	const croppedCanvas = document.createElement('canvas')

// 	const croppedCtx = croppedCanvas.getContext('2d')

// 	if (!croppedCtx) return null

// 	// Set the size of the cropped canvas
// 	croppedCanvas.width = pixelCrop.width
// 	croppedCanvas.height = pixelCrop.height
// 	console.log(croppedCanvas, croppedCtx, pixelCrop, 'also what is this')
// 	// Draw the cropped image onto the new canvas
// 	croppedCtx.drawImage(croppedCanvas, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height)
// 	// Return the result as a blob
// 	return new Promise((resolve) => {
// 		croppedCanvas.toBlob((file) => {
// 			if (!file) return null
// 			resolve(file)
// 		}, 'image/jpeg')
// 	})
// }
