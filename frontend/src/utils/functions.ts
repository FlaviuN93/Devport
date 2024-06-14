import { Area } from 'react-easy-crop'
import { IDefaultError } from '../services/types'
import { ObjectType, PasswordValidationType } from './types'
import { passwordSchema } from './schemas'
import { ZodError } from 'zod'

interface IUpdateStorage {
	key: string
	keyToUpdate: string
	valueToUpdate: any
}

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

	const data: T = item.startsWith('{') ? JSON.parse(item) : item

	return data
}

export const updateValueFromStorage = (updateStorage: IUpdateStorage): void => {
	if (typeof window.localStorage === 'undefined') console.log('localStorage is not supported')
	const currentItem = window.localStorage.getItem(updateStorage.key)
	if (!currentItem) throw Error('Item from local storage does not exist')

	const convertedItem = JSON.parse(currentItem)
	convertedItem[updateStorage.keyToUpdate] = updateStorage.valueToUpdate
	window.localStorage.setItem(updateStorage.key, JSON.stringify(convertedItem))
}

export const getImageFormat = (format: 'landscape' | 'cover', file: File) => {
	return new Promise<boolean>((resolve) => {
		const img = document.createElement('img')
		img.onload = function () {
			const aspectRatio = img.width / img.height

			if (format === 'landscape' && aspectRatio > 1.5) resolve(false)
			if (format === 'cover' && aspectRatio < 2.75) resolve(false)
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

export const allValuesValid = (data: ObjectType): boolean => {
	for (const value of Object.values(data)) {
		if (typeof value === 'string' && value.trim().length === 0) return false
		if (typeof value === 'undefined' || value === null) return false
		if (Array.isArray(value) && value.length === 0) return false
		if (typeof value === 'number' && value < 0) return false
	}
	return true
}

export const catchPasswordErrors = (password: string): string | string[] => {
	try {
		const result = passwordSchema.parse(password)
		return result
	} catch (err) {
		const error = err as ZodError
		return error.format()._errors
	}
}

export const useValidateResult = (errorTypes: string | string[]) => {
	const passwordErrors = [
		{ type: 'lowerCase', isActive: false },
		{ type: 'upperCase', isActive: false },
		{ type: 'specialChar', isActive: false },
		{ type: 'number', isActive: false },
		{ type: 'minLength', isActive: false },
		{ type: 'maxLength', isActive: false },
	]
	if (typeof errorTypes === 'string') {
		passwordErrors.forEach((error) => (error.isActive = true))
	}

	if (Array.isArray(errorTypes)) {
		passwordErrors.forEach((error) => (errorTypes.includes(error.type) ? (error.isActive = false) : (error.isActive = true)))
	}

	return passwordErrors
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image()
		image.addEventListener('load', () => resolve(image))
		image.addEventListener('error', (error) => reject(error))
		image.src = url
	})

export async function getCroppedImg(imageSrc: string | null, pixelCrop: Area | null): Promise<File | null> {
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
			resolve(croppedFile)
		}, 'image/jpeg')
	})
}
