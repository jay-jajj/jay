const mongoose = require('mongoose');

//비밀번호 암호화를 위해 가져온 모듈
const bcrypt = require('bcrypt');
const saltRouds = 10;

//로그인상태를 유지, 유효성을 검사하기 위해 토큰을 사용할거임
//그중 JWT(json web token)을 사용할거임
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey!';

//date를 좀더 쉽고 편하게 다루기위한 모듈
const moment = require('moment');


const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: true
    },
    password: {
        type: String,
        minglength: 5
    },
    lastName: {
        type:String,
        maxlength: 50,
        unique : true
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
},{ collection: 'users' });

//pre프로퍼티는 지정한 메소드가 실행되기전에 실행해주는 메소드이다.
//회원가입할때 비밀 번호를 암호화하기 위해서 필요한 작업이다.
userSchema.pre('save', function(next) {
    let user = this;
    //isModified함수는 해당 값이 db에 기록된 값과 비교해서 변경된 경우 
    // true를, 그렇지 않은 경우 false를 반환하는 함수
    if(user.isModified('password')){
        //비밀번호를 암호화
        bcrypt.genSalt(saltRouds, function(err, salt){
            // 에러 발생시 에러 반환
            if(err) return next(err);
            //해싱
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                //해쉬된 비밀번호 저장
                user.password = hash;
                next();
            });
        });
    }else{
        next()
    }
});


//스키마에 메소드를 추가
//비밀 번호가 맞는지 확인하는 메소드
userSchema.methods.comparePassword = function(plainPassword, next){
    //compare는 해쉬된 비밀번호와 현재입력한 plainPassword를 비교하여 
    // 세번째 인자인 result에 boolean 값을 반환
    //세번째인자로 콜백함수를 주어 함수의 인자에 result를 담아 에러를 검출할수 있게함
    bcrypt.compare(plainPassword, this.password, function(err, result){
        if(err) return next(err);
        //err인자를 받는 부분에 null을 주면 err가 없는거임
        next(null, result);
    });
}

//
userSchema.methods.generateToken = function(next){
    let user = this;
    //sign의 첫번째 인자에는 payload가 들어가고 두번째 인자에는 비밀키값이 들어간다.
    // payload에는 클레임이 들어가고 클레임에는 객체같은 데이터가 들어감
    //결론 첫번째 인자에 저장할 데이터를 넣으면됨 두번째는 비밀키값
    //이러면 인코딩된 jwt를 반환해준다.
    let token = jwt.sign(user._id.toHexString(), secretKey)
    //토큰 유효기간 설정
    let tokenExp = moment().add(1, 'hour').valueOf();
    user.token = token;
    user.tokenExp = tokenExp;
    user.save(function(err, user){
        if(err) return next(err);
        next(null, user);
    })

}
//statics와 methods차이점 : https://github.com/bestdevhyo1225/dev-log/blob/master/MongoDB/Mongoose-statics-methods.md
userSchema.statics.findByToken = function(token, next){
    let user = this;
    //verify 는 현재 토큰과 비밀키값을 넣어주면 새번째 인자에 결과를 반환해준다.
    jwt.verify(token, secretKey, function(err, decoded){
        //복호화된 id로 user를 찾음
        user.findOne({"_id": decoded, "token":token}, function(err, user){
            if(err) return next(err);
            next(null, user);
        })
    });

}

const User = mongoose.model('User', userSchema);

module.exports = {User}