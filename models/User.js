const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true, // 글자사이의 공백을 없애준다.
        unique : true
    },
    password : {
        type : String,
        maxlength : 50
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    }, 
    image : String,
    token : { // 유효성관리
        type : String
    }, 
    tokenExp : {
        type : Number
    }
})

const User = mongoose.model('User', userSchema) // 스키마를 모델로 감쌈
module.exports = {User}
