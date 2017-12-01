'use strict';

const util = require('util'); // show object
var express = require('express');
var router = express.Router();
var request = require('request-promise');
var promise = require('promise');


// var http = require('http');
// var bodyParser = require('body-parser');

var PARTNER_CODE =require('./config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('./config').CREDENTIAL_CODE;
var FlashPayResults = require('./data');
process.env.TZ = 'America/Vancouver';


class FlashPayApi{

    /**
     *
     * 汇率查询，nonce_str、time不需要填入
     * @param FlashPayExchangeRate $inputObj
     * @param int $timeOut
     * @throws FlashPayException
     * @return $result 成功时返回，其他抛异常
     */
    exchangeRate(inputObj, timeOut){
        timeOut = 10;
        var url = "https://pay.alphapay.ca//api/v1.0/gateway/partners/" + PARTNER_CODE +"/exchange_rate";
        inputObj.setTime(this.getMillisecond());//时间戳
        inputObj.setNonceStr(this.getNonceStr());//随机字符串
        inputObj.setSign();
        response = this.getJsonCurl(url, inputObj, timeOut);
        // result = FlashPayResults.init(response);
        // return result;
    }

    qrOrder(inputObj, timeOut){
        timeOut = 15;
        var orderId = inputObj.getOrderId();
        // console.log("api//// getorderid  " + orderId);
        var url = "https://pay.alphapay.ca//api/v1.0/gateway/partners/"+ PARTNER_CODE +"/orders/"+orderId;
        // console.log("api////url " + url);
        inputObj.setTime(this.getMillisecond());
        // console.log("api////settime " + util.inspect(inputObj, false, null));
        inputObj.setNonceStr(this.getNonceStr());
        // console.log("api////setNonceStr " + util.inspect(inputObj, false, null));
        inputObj.setSign();
        // console.log("api////setSign " + util.inspect(inputObj, false, null));
        
        this.putJsonCurl(url, inputObj, timeOut).then(function(response){
            console.log("api//// inside putJsoncurl response  " + response);
            
        })
        

        

        // return response;

    }

      /**
     * 获取毫秒级别的时间戳
     */
    getMillisecond(){
        //获取毫秒的时间戳
        var millisecond = Date.now();
        // console.log("api////millisecond "+millisecond);

        return millisecond;
    }

    /**
     * 以get方式提交json到对应的接口url
     *
     * @param string $url
     * @param object $inputObj
     * @param int $second url执行超时时间，默认30s
     * @throws FlashPayException
     */
    getJsonCurl(url, inputObj, second ){
        second = 30;
    }

    /**
     *
     * 产生随机字符串，不长于30位
     * @param int $length
     * @return $str 产生的随机字符串
     */
    getNonceStr(length){
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        var str = "";
        length  = 30;
        for(var i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // console.log("api/// getNonceStr " + str);
        return str;
    }

    /**
     * 以get方式提交json到对应的接口url
     *
     * @param string $url
     * @param object $inputObj
     * @param int $second url执行超时时间，默认30s
     * @throws FlashPayException
     */
    getJsonCurl(url, inputObj, second){
        second = 30;
        url +='?'+inputObj.toQueryParams();
        console.log("get///url in getjsonurl after url + = "+ url);
        console.log("get///inputObj.toQueryParams  " + inputObj.toQueryParams());
        console.log("get///inputObj.toBodyParams  " + inputObj.toBodyParams());
        console.log("get///inputObj.toBodyParams type  " + typeof inputObj.toBodyParams());

        request.get(
            {
                url: url,
                headers: {
                    "Accept": "application/json"
                }
            },function(error,req,body){
                if (error) {
                    console.log('failed:', error);
                }
                console.log('req::::   '+ JSON.stringify(req));
                // console.log('body::::   '+ util.inspect(body, false, null));
            }
        )

    }

        /**
     * 以put方式提交json到对应的接口url
     *
     * @param string $url
     * @param object $inputObj
     * @param int $second url执行超时时间，默认30s
     * @throws FlashPayException
     */
    putJsonCurl(url, inputObj, second){
        // console.log("url in putjsonurl before url += "+ url);
        return new Promise(
            function(resolve, reject){
                url +='?'+inputObj.toQueryParams();
                console.log("url in putjsonurl after url + = "+ url);
                console.log("inputObj.toQueryParams  " + inputObj.toQueryParams());
                console.log("inputObj.toBodyParams  " + inputObj.toBodyParams());
                console.log("inputObj.toBodyParams type  " + typeof inputObj.toBodyParams());
        
                var options = {
                    url: url,
                    body: inputObj.toBodyParams(),
                    timeout: second*1000,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                };
                request.put(options,function(error,req,body){
                    if (error) {
                        console.log('failed:', error);
                    }
                    // console.log('req::::   '+ JSON.stringify(req));
                    //console.log('body::::   '+ JSON.stringify(body));
                   // return JSON.stringify(body);
                    resolve(JSON.stringify(body));
                });
                
            }
        );
        // url +='?'+inputObj.toQueryParams();
        // console.log("url in putjsonurl after url + = "+ url);
        // console.log("inputObj.toQueryParams  " + inputObj.toQueryParams());
        // console.log("inputObj.toBodyParams  " + inputObj.toBodyParams());
        // console.log("inputObj.toBodyParams type  " + typeof inputObj.toBodyParams());

        // var options = {
        //     url: url,
        //     body: inputObj.toBodyParams(),
        //     timeout: second*1000,
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     }
        // };

        // request.put(options)
        //     .then(function(body){
        //         console.log('body::::   '+ JSON.stringify(body));
        //         return JSON.stringify(body);
        //     })
        //     .catch(function(error){
        //         if (error) {
        //              console.log('failed:', error);
        //         }
        //     });
        
        
        
        
        // request.put(
        //     {
        //         url: url,
        //         body: inputObj.toBodyParams(),
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Accept": "application/json"
        //         },
        //     },function(error,req,body){
        //         if (error) {
        //             console.log('failed:', error);
        //         }
        //         // console.log('req::::   '+ JSON.stringify(req));
        //         console.log('body::::   '+ JSON.stringify(body));
        //         return JSON.stringify(body);
        //     }
        // )
    }



}
module.exports = FlashPayApi;
