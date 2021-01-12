const express = require('express');
//express에서 제공하는 routerAPI
const router = express.Router();
const {User} = require("../models/User")
const {auth} = require('../middleware/auth')


router.get('/auth', auth, function(req, res){
    //여기까지 들어오면 미들웨어를 성공적으로 통과하면서 인증이 된것임
    //Authentication 이 true라는 말
    //유저 정보를 넘겨 주면 되는데 넘겨주고 싶은것을 넘겨주면 됨
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        nickname : req.user.nickname,
        image: req.user.image,
    });

});


router.post("/login", (req, res) => {
    //findOne은 mongoose에서 제공하는 질의함수 하나의 문서를 가져옴
    User.findOne({email : req.body.email}, (err, user)=> {
        //user가 없다는것은 이 email로 된 계정이 없다는 뜻
        if (!user) {
            return res.json({
                loginSuccess : false,
                message : "Auth failed, email not found"
            });
        }
        user.comparePassword(req.body.password, (err, isMatch) =>{
            //err시에 isMatch의 값이 할당되지않아 에러의 경우를 안잡아도 되는듯
            if (!isMatch) return res.json({
                loginSuccess : false, 
                message : "Wrong password",
                err
            });
            //여기까지 오면 로그인 성공임
            //토근을 생성시켜 줘야함
            user.generateToken(function(err, user){
                if(err) return res.status(400).send(err);
                //쿠키에 토큰을 저장  
                res.cookie("u_auth", user.token);
                res.cookie("u_authExp", user.tokenExp).status(200).json({
                    loginSuccess : true,
                    userId : user.id
                }) 
            });
        })
    }) 
});

router.post("/register", (req, res) => {
    //새로운 데이터 모델을 생성후 요청한 데이터를 넣어준다.
    const user = new User(req.body);
    //save()는 몽고db에서 지원하는 함수로 데이터를 저장해준다.
    user.save((err, doc) => {
        //에러 발생시 객체로 실패와 에러를 보내줌
        if(err) return res.json({success : false, err});
        return res.status(200).json({success : true});
    });
});

router.get("/logout", auth,(req, res)=>{
    // findOneAndUpdate는 찾은뒤 수정하는 메소드
    //토큰과 토큰유효시간값을 지워줌
    User.findOneAndUpdate({_id:req.user._id}, {token:"", tokenExp:""}, (err, doc)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success:true
        });
    });
});

module.exports = router;