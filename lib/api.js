const util = require('util'); // show object

var PARTNER_CODE =require('./config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('./config').CREDENTIAL_CODE;
process.env.TZ = 'America/Vancouver';


class FlashPayApi{
    // constructor(PARTNER_CODE, CREDENTIAL_CODE){
    //     this.PARTNER_CODE = PARTNER_CODE;
    //     this.CREDENTIAL_CODE = CREDENTIAL_CODE;
    // }

    qrOrder(inputObj, timeOut = 15){
        var orderId = inputObj.getOrderId();
        console.log("api//// getorderid  " + orderId);
        var url = "https://www.flashpayment.com//api/v1.0/gateway/partners/"+ PARTNER_CODE +"/orders/"+orderId;
        console.log("api////url " + url);
        inputObj.setTime(this.getMillisecond());
        console.log("api////settime " + util.inspect(inputObj, false, null));
        inputObj.setNonceStr(this.getNonceStr());
        console.log("api////setNonceStr " + util.inspect(inputObj, false, null));
        inputObj.setSign();
        console.log("api////setSign " + util.inspect(inputObj, false, null));
        // var response = this.putJsonCurl(url, inputObj, timeOut);
        

    }

      /**
     * 获取毫秒级别的时间戳
     */
    getMillisecond(){
        //获取毫秒的时间戳
        // var date = new Date();
        var millisecond = Date.now();
        // console.log("api///date "+date);
        console.log("api////millisecond "+millisecond);

        // UTC timestamp ???? 
        var d = new Date();
        var d2 = Date.UTC(d.getUTCFullYear(),d.getUTCMonth() ,d.getUTCDate(),d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds());  
        console.log("api////d2 "+d2);
        
        // return millisecond;
        return d2;

    }

    /**
     *
     * 产生随机字符串，不长于30位
     * @param int $length
     * @return $str 产生的随机字符串
     */
    getNonceStr(length = 30){
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        var str = "";
        for(var i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        console.log("api/// getNonceStr " + str);
        return str;
    }
    

        /**
     * 以put方式提交json到对应的接口url
     *
     * @param string $url
     * @param object $inputObj
     * @param int $second url执行超时时间，默认30s
     * @throws FlashPayException
     */
    putJsonCurl(url, inputObj, second = 30){

    }



}
module.exports = FlashPayApi;