import express from 'express'
const app = express();

app.use(require('./routes'))

app.listen(5555, () => console.log("Server ready on port 3000."));

export default app