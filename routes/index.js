var express = require('express');
var router = express.Router();
var FlashPayDataBase = require('../lib/data');

var s = new FlashPayDataBase;
s.setTime('123');
s.setNonceStr('string');
s.setSign('abc');
console.log("s.gettime():" + s.getTime());
console.log("s.getNonceStr():" + s.getNonceStr());
console.log("s.toSignParams():" + s.toSignParams());
console.log("s.makeSign():" + s.setSign());
console.log("s.toBodyParams():" + s.toBodyParams());





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express asdjlasdl' });
  console.log("test");
});




module.exports = router;
