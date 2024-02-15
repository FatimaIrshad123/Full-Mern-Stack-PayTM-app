const express = require('express')
const cors = require('cors')

const mainrouter = require('./routes/index')
const userrouter = require('./routes/user')
const app = express()
const port = 3000


app.use(cors())
app.use(express.json())

app.use('/api/r1',mainrouter)



app.listen(port)