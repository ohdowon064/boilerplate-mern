const express = require('express')
const config = require("./config/key.js")
const mongoose = require('mongoose')
const { User } = require('./models/user.js')
const app = express()
const port = 3000

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// application/json
app.use(express.json())

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
    // 회원가입 데이터를 client에서 가져오면
    // 해당 데이터들을 데이터베이스에 넣는다.

    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})