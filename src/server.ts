import express from 'express'
import { routes } from './routes'
import bodyParser from 'body-parser';


var cors = require('cors')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' })); // Ajuste o limite conforme necessário
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Ajuste o limite conforme necessário
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization','id'],
}));
app.use(express.json())
app.use(routes)

const port = process.env.PORT as string || 3333
app.listen(port, () => {
    console.log(`Project running in port ${port}`)
})

export { app } 


