const { User } = require('../models/User.js')

let auth = (req, res, next) => {

    // 인증 처리를 하는 곳
    // 클라이언트 쿠키에서 토큰 가져온다.
    let token = req.cookies.x_auth

    // 토큰 복호화 후 유저 찾기
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) {
            console.log("유저가 없다")
            return res.json({isAuth: false, error: true})
        }
        
        req.token = token;
        req.user = user;
        next(); // 미들웨어이므로 다음으로 넘어감
    })
}

module.exports = { auth };