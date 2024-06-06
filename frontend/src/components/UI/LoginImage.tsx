import { FC } from 'react'
import styles from './LoginImage.module.css'

const LoginImage: FC<{ title: string; content: string }> = ({ title, content }) => {
	return (
		<svg width='400' height='672' viewBox='0 0 400 672' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect width='400' height='672' rx='12' fill='url(#paint0_linear_1999_244)' />
			<g clipPath='url(#clip0_1999_244)' opacity='0.5'>
				<circle cx='22' cy='654' r='179.5' stroke='white' strokeOpacity='0.4' />
				<circle cx='22' cy='654' r='109.5' stroke='white' strokeOpacity='0.6' />
				<circle cx='22' cy='648' r='39.5' stroke='white' strokeOpacity='0.8' />
				<circle cx='22' cy='654' r='249.5' stroke='white' strokeOpacity='0.4' />
				<circle cx='22' cy='654' r='319.5' stroke='white' strokeOpacity='0.2' />
			</g>

			<foreignObject x='24' y='40' width='340' height='350' className={styles.svgContainer}>
				<div className={styles.svgTitle}>{title}</div>
				<p className={styles.svgContent}>{content}</p>
			</foreignObject>

			<defs>
				<linearGradient id='paint0_linear_1999_244' x1='184' y1='0' x2='184' y2='672' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#838CF1' />
					<stop offset='1' stopColor='#4138C2' />
				</linearGradient>
				<clipPath id='clip0_1999_244'>
					<rect width='400' height='672' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

export default LoginImage
