import express from 'express'
import dotenv from 'dotenv'
import  dbConnect  from './src/config/dbConnect.js'
import router from './src/Middleware/indexRoutes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
dotenv.config()
const port = process.env.PORT||3003
const URL = process.env.MONGOURL
const app = express()
dbConnect(URL)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json())
app.use(cors())

app.use(router)

app.listen(port, (err) => {
    if (err) {
        return console.error('Error starting server:', err);
    }
    console.log('Server is running on Port ' + port);
});

// const port = process.env.PORT || 8000; // Ensure this matches your request in Postman
// app.listen(port, () => {
//     console.log('Server is running on Port ' + port);
// });
