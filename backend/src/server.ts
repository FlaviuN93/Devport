import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: process.env.VITE_APP_LOCAL_DOMAIN }))
app.use(bodyParser.json())

app.get('/hello', (req: Request, res: Response) => {
	res.json({ message: 'Hello from express server' })
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

export default app
