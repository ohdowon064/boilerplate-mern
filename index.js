const express = require('express')
const database = require("./config.js").DATABASE
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect(database.CONNECT, {
    userNewUrlPaser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})