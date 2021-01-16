const express = require('express');
const app = express();

const port = process.env.PORT || 4000

//body부분을 분석해주는 미들웨어
const bodyParser = require('body-parser');
//쿠키를 분석해주는 미들웨어
const cookieParser = require('cookie-parser');


//mongodb object modeling tool
const mongoose = require("mongoose");
//몽고db 키를 가져온다.
const config = require("./config/key");
//첫번째 인자로 주소를 넣어주고 두번째로 오류해결을 위한 객체를 넣어줌
const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected Successfully!!!'))
    .catch(err => console.log(err));




//밑의 두개를 함으로써 request에 body 가 담겨 분석할수잇다.   
// 'application/x-www-form-urlencoded' 방식의 Content-Type데이터를 받아준다.
app.use(bodyParser.urlencoded({
    extended : true
}));
//json 타입의 데이터를 받아준다.
app.use(bodyParser.json());
//쿠키를 분석가능하게 미들웨어 등록실행
app.use(cookieParser());

//라우터 폴더의 users라우터를 미들웨어로 등록
//이렇게 하면 해당 경로로 요청시 등록한 미들웨어 실행
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));


app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});