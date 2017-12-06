var express = require('express');
var router = express.Router();
const util = require('util'); // show object
var empty = require('is-empty'); //check if it empty
var qrcode = require('qrcode-js');//generate qrcode
var urlencode = require('urlencode'); // encode URIcompment


var PARTNER_CODE =require('../lib/config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('../lib/config').CREDENTIAL_CODE
process.env.TZ = 'America/Vancouver';


var FlashPayApi = require('../lib/api');
var FlashPayUnifiedOrder = require('../lib/data').FlashPayUnifiedOrder;
var FlashPayExchangeRate = require('../lib/data').FlashPayExchangeRate;
var FlashPayRedirect = require('../lib/data').FlashPayRedirect;


/**
 * 流程：
 * 1、创建QRCode支付单，取得code_url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、支付完成之后，FlashPay服务器会通知支付成功
 * 4、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）
 */
//获取扫码

var p = new FlashPayApi;
var input = new FlashPayUnifiedOrder;
var time = new Date();
input.setOrderId(PARTNER_CODE + time);
input.setDescription("test");
input.setPrice("1");
input.setCurrency("CAD");
input.setNotifyUrl("https://pay.alphapay.ca/notify_url");
input.setOperator("123456");
var currency = input.getCurrency();
//if(!empty(currency) && currency == 'CAD'){

  var inputRate = new FlashPayExchangeRate();
  //console.log("inputerada  " + util.inspect(inputRate,true));
  p.exchangeRate(inputRate).then(function(rate){
    if(rate['return_code'] == 'SUCCESS'){
      var real_pay_amt = input.getPrice()/rate['rate']/100;
      if (real_pay_amt < 0.01){
        console.log("人民币转换加币后必须大于0.01加币");
      }
    }
  });
//}

// scan QRcode
var base64; // QRcode image

var pay_url; // url path

p.qrOrder(input).then(function(result){
  //console.log("type of result  " + typeof result);

  //console.log("qr/// result  " + util.inspect(result,true));
  var url2 = result["code_url"];

  //console.log("url2  " + url2);
  // get QRcode
  base64 = qrcode.toDataURL(url2,4);
  //console.log("base64 " + base64);

  // Redirect
  var inputObj = new FlashPayRedirect();
  inputObj.setRedirect(urlencode('order_id='+ input.getOrderId().toString()));
  pay_url = p.getQRRedirectUrl(result['pay_url'],inputObj);
  //console.log("pay_url " + pay_url);
});


 

router.get('/', function(req, res, next) {
  //console.log("base64 " + base64);
  res.render('qr', {qrcode: base64, pay_url:pay_url});
});

module.exports = router;
