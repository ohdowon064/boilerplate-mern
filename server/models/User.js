const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/key.js')

const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        minlength: 5
    },
    password : {
        type: String
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

// 저장 전 동작정의
userSchema.pre('save', function(next) {
    
    var user = this

    if(user.isModified('password')) {

        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)

                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback) {
    var user = this;
    console.log(user)

    // jsonwebtoken을 사용해서 token 생성
    var token = jwt.sign(user._id.toHexString(), config.secretKey)
    user.token = token
    user.save((err, user) => {
        if(err) return callback(err)
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    // var user = this; static 메서드이므로 this로 접근 불가
    // User로 사용해야한다.
    // 토큰 복호화

    jwt.verify(token, config.secretKey, (err, decoded) => {
        // 유저 아이디 이용해서 유저 찾은 후
        // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰 일치여부 확인

        console.log(decoded)
        User.findOne({"_id" : decoded, "token" : token}, (err, user) => {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = {User}