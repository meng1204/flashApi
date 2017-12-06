var express = require('express');
var router = express.Router();
const util = require('util'); // show object
var empty = require('is-empty'); //check if it empty
//var qrCode = require('qrcode'); //generate qrcode
var qrcode = require('qrcode-js');


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
w.setPrice("1");
w.setCurrency("CAD");
w.setNotifyUrl("https://pay.alphapay.ca/notify_url");
w.setOperator("123456");
var currency = w.getCurrency();
if(!empty(currency) && currency == 'CNY'){

  var inputRate = new FlashPayExchangeRate();

  p.exchangeRate(inputRate).then(function(rate){
    if(rate['return_code'] == 'SUCCESS'){
      var real_pay_amt = w.getPrice()/rate['rate']/100;
      if (real_pay_amt < 0.01){
        console.log("人民币转换加币后必须大于0.01加币");
      }
    }
  });
}
var base64;
p.qrOrder(w).then(function(result){
  console.log("type of result  " + typeof result);

  console.log("qr/// result  " + util.inspect(result,true));
  var url2 = result["code_url"];

  console.log("url2  " + url2);
  base64 = qrcode.toDataURL(url2,4);
  //console.log("base64 " + base64);

});

router.get('/', function(req, res, next) {
  console.log("base64 " + base64);
  res.render('qr', {qrcode: base64});
});

module.exports = router;
