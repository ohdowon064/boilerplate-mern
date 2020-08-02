const express = require('express') // express 모듈을 가져온다.
const app = express() // express함수를 이용해서 express 객체생성
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:dhehdnjs123@education-9l52i.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex : true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! ~~ 안녕하세요!'))
// 루트 디렉토리로 오면 Hello World! 출력
// npm run start를 하면 script에 있는 start값이 들어온다.

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

