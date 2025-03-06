'use strict'
import express from 'express'
import routes from './routes/routes'
import cookieparser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser())

app.use(routes)
app.listen(3000, () => console.log("Server ready on port 3000!."));

export default app