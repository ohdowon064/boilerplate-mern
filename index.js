const express = require('express') // express 모듈을 가져온다.
const app = express() // express함수를 이용해서 express 객체생성
const port = 3000
const mongoose = require('mongoose')
const {User} = require('./models/User')
const bodyParser = require('body-parser')

// application/x-www-form-urlencoded 타입으로 된것을 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended:true})) 
// application/json : 타입으로 된것을 분석해서 가져온다.
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://root:dhehdnjs123@education-9l52i.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex : true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! ~~ 안녕하세요! DSC 리드 오도원입니다!'))
// 루트 디렉토리로 오면 Hello World! 출력
// npm run start를 하면 script에 있는 start값이 들어온다.

app.post('/register', (req, res)=> {
    // 회원가입시 필요한 정보를 클라이언트에서 가져오면
    // 그것들을 DB에 저장한다.
    const user = new User(req.body) // body-parser로 분석해서 가져온 정보로 User 객체생성
    
    user.save((err, userInfo) => {// 정보들이 user모델에 저장된다.
        if(err) return res.json({success:false, err})
        return res.status(200).json({ // 성공(에러코드200)하면 json파일로 success : true를 보내라
            success:true
        })
    }) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

