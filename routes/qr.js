var express = require('express');
var router = express.Router();
const util = require('util'); // show object


var PARTNER_CODE =require('../lib/config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('../lib/config').CREDENTIAL_CODE
process.env.TZ = 'America/Vancouver';


var FlashPayApi = require('../lib/api');
var FlashPayUnifiedOrder = require('../lib/data').FlashPayUnifiedOrder;
var FlashPayResults = require('../lib/data').FlashPayResults;


var p = new FlashPayApi;
// console.log("p.getMillisecond():" + p.getMillisecond());

var w = new FlashPayUnifiedOrder;
var time = new Date();
w.setOrderId(PARTNER_CODE + time);
w.setDescription("test");
w.setPrice("100");
w.setCurrency("CAD");
w.setNotifyUrl("https://pay.alphapay.ca/notify_url");
w.setOperator("123456");



//  p.qrOrder(w).then(function(response){
//   console.log("qr/// result  " + response);
// });
var result =  p.qrOrder(w);
// console.log("p :" + util.inspect(p, false, null));
// console.log("w :" + util.inspect(w, false, null));
console.log("result :" + util.inspect(result, false, null));
// s.setOrderId(s.partner_code);

var s = new FlashPayResults;
var result = s.fromArray();
console.log("result :" + util.inspect(result, false, null))
/* GET qr. */
router.get('/', function(req, res, next) {
  res.render('qr');
});

module.exports = router;
