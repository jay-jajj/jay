
//환경변수의 값이 production(제품)모드 일때는 제품모드용주소를 내보냄
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}