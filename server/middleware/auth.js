const {User} = require('../models/User');

let auth = (req, res, next) => {
    //인증 처리를 하는곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.u_auth;
    //토큰 복호화후 유저를 찾는다.
    //토큰으로 찾는 메소드는 스키마에 추가한것이다.
    User.findByToken(token,(err, user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth : false,
            error : true
        });
        //req에 넣어준 이유는 라우터에서 req.token req.user
        //이렇게 사용할수있게 해주기 위해서
        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = {auth};