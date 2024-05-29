import Cropper, { Area, Point } from 'react-easy-crop'
import styles from './TestComponent.module.css'
import { ChangeEvent, useState } from 'react'

const TestComponent = () => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		console.log(croppedArea, croppedAreaPixels)
	}
	return (
		<div className={styles.App}>
			<div className={styles.cropContainer}>
				<Cropper
					image='https://liakrqgjvgqicvzrakra.supabase.co/storage/v1/object/public/user-covers/35634.jpg'
					crop={crop}
					zoom={zoom}
					aspect={4 / 3}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
			<div className={styles.controls}>
				<input
					type='range'
					value={zoom}
					min={1}
					max={3}
					step={0.1}
					aria-labelledby='Zoom'
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setZoom(+e.target.value)
					}}
					className={styles.zoomRange}
				/>
			</div>
		</div>
	)
}

export default TestComponent
