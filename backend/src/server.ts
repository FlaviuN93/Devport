import app from './app'

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

process.on('unhandledRejection', (err: Error) => {
	console.log(err.name, err.message)
	console.log('Shutting down...')
	server.close(() => {
		process.exit(1)
	})
})

process.on('uncaughtException', (err: Error) => {
	console.log(err.name, err.message)
	console.log('Shutting down...')
	server.close(() => {
		process.exit(1)
	})
})
