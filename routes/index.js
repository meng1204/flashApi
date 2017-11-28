var express = require('express');
var router = express.Router();
var FlashPayDataBase = require('../lib/data');
var FlashPayUnifiedOrder = require('../lib/data');
var FlashPayApi = require('../lib/api');

var PARTNER_CODE =require('../lib/config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('../lib/config').CREDENTIAL_CODE
process.env.TZ = 'America/Vancouver';


var p = new FlashPayApi;
console.log("p.getMillisecond():" + p.getMillisecond());


var s = new FlashPayDataBase;
s.setTime('123');
s.setNonceStr('string');
s.setSign('abc');
console.log("s.gettime():" + s.getTime());
console.log("s.getNonceStr():" + s.getNonceStr());
console.log("s.toSignParams():" + s.toSignParams());
console.log("s.makeSign():" + s.setSign());
console.log("s.toBodyParams():" + s.toBodyParams());

var w = new FlashPayUnifiedOrder;
var time = new Date();
      // .toISOString().
      // replace(/T/, ' ').      // replace T with a space
      // replace(/\..+/, '')     // delete the dot and everything after
w.setOrderId(PARTNER_CODE + time);
w.setDescription("test");
w.setPrice("100");
w.setCurrency("CAD");
w.setNotifyUrl("https://www.flashpayment.com/notify_url");
w.setOperator("123456");

var result = p.qrOrder(w);
console.log("result :" + result);
// s.setOrderId9(s.partner_code);







/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express asdjlasdl' });
  console.log("test");
});




module.exports = router;
