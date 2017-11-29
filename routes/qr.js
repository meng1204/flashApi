var express = require('express');
var router = express.Router();

var PARTNER_CODE =require('../lib/config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('../lib/config').CREDENTIAL_CODE
process.env.TZ = 'America/Vancouver';

var FlashPayApi = require('../lib/api');
var FlashPayUnifiedOrder = require('../lib/data');

var p = new FlashPayApi;

var w = new FlashPayUnifiedOrder;
// var q = new FlashPayResults;

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
// s.setOrderId(s.partner_code);

/* GET qr. */
router.get('/', function(req, res, next) {
  res.render('qr');
});

module.exports = router;
