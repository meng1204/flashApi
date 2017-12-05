var express = require('express');
var router = express.Router();
const util = require('util'); // show object
var empty = require('is-empty'); //check if it empty


var PARTNER_CODE =require('../lib/config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('../lib/config').CREDENTIAL_CODE
process.env.TZ = 'America/Vancouver';


var FlashPayApi = require('../lib/api');
var FlashPayUnifiedOrder = require('../lib/data').FlashPayUnifiedOrder;


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
var currency = w.getCurrency();
if(){

}




// p.qrOrder(w).then(function(result){
//   console.log("type of result  " + typeof result);

//   console.log("qr/// result  " + util.inspect(result,true));
// });

router.get('/', function(req, res, next) {
  res.render('qr');
});

module.exports = router;
