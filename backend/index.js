const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')    // connecting to frontend

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


// available routes

app.use('/api/auths', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Notebook listening on port ${port}`)
})
