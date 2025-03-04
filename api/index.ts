'use strict'
import express from 'express'
import routes from './routes/routes'

const app = express();
app.use(express.json());

app.use(routes)
app.listen(3000, () => console.log("Server ready on port 3000!."));

export default app