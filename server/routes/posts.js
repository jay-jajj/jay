const express = require('express');
//express에서 제공하는 routerAPI
const router = express.Router();
const {Post} = require("../models/Post");
const {auth} = require('../middleware/auth')

router.post("/read", (req, res) => {
    const category = req.body.category;
    const condition = category ? {category:{$in : category}} : {}
    Post.find(condition, (err, docs) => {
        if(err) return res.json({success: false, err});
        res.send(docs)
        console.log(condition)
    });
});

router.post("/create", (req, res) => {
    //새로운 데이터 모델을 생성후 요청한 데이터를 넣어준다.
    const post = new Post(req.body);
    //save()는 몽고db에서 지원하는 함수로 데이터를 저장해준다.
    post.save((err, doc) => {
        //에러 발생시 객체로 실패와 에러를 보내줌
        if(err) return res.json({success : false, err});
        return res.status(200).json({success : true});
    });
});

router.get("/delete",(req, res)=>{

    Post.findOneAndDelete({_id:req.user._id}, (err, doc)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success:true
        });
    });
});

module.exports = router;