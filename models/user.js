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

    // jsonwebtoken을 사용해서 token 생성
    var token = jwt.sign(user._id.toHexString(), config.secretKey)
    user.token = token
    user.save((err, user) => {
        if(err) return callback(err)
        callback(null, user)
    })
}

const User = mongoose.model('User', userSchema)
module.exports = {User}