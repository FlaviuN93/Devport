import styles from './Loading.module.css'

const Loading = () => {
	return (
		<div className='w-full flex justify-center'>
			<div className={styles.loading}></div>
		</div>
	)
}

export default Loading
