'use strict';


var sha256 = require('sha256');


var PARTNER_CODE =require('./config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('./config').CREDENTIAL_CODE;

class FlashPayDataBase{
    constructor(pathValues,queryValues,bodyValues){
        this.pathValues = [];

        this.queryValues = [];

        this.bodyValues = [];
    }

    /**
     * 设置随机字符串，不长于30位。推荐随机数生成算法
     * @param string $value
     **/
    setNonceStr(value){
        this.queryValues['nonce_str'] = value;
    }

    /**
     * 获取随机字符串，不长于30位。推荐随机数生成算法的值
     * @return 值
     **/
    getNonceStr(){
        return this.queryValues['nonce_str'];
    }

    /**
     * 判断随机字符串，不长于32位。推荐随机数生成算法是否存在
     * @return true 或 false
     **/
    isNonceStrSet(){
        // console.log(this.queryValues['nonce_str']);
        if(typeof this.queryValues['nonce_str'] === 'undefined'){
            return false;
        }else{
            return true;
        }

    }

    /**
     * 设置时间戳
     * @param long $value
     **/
    setTime(value){
        this.queryValues['time'] = value;
        // console.log(this.queryValues['time']);
    }

    /**
     * 获取时间戳
     * @return 值
     **/
    getTime(){
        return this.queryValues['time'];
    }

      /**
     * 判断时间戳是否存在
     * @return true 或 false
     **/
    isTimeSet(){
        if(typeof this.queryValues['time'] === 'undefined'){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 设置签名，详见签名生成算法
     * @param string $value
     **/
    setSign(){
        var sign = this.makeSign();
        this.queryValues['sign'] = sign;
        return sign;
    }

    /**
     * 获取签名，详见签名生成算法的值
     * @return 值
     **/
     getSign(){
        return this.queryValues['sign'];
     }

     /**
     * 判断签名，详见签名生成算法是否存在
     * @return true 或 false
     **/
    isSignSet(){
        if(typeof this.queryValues['sign'] === 'undefined'){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 格式化参数格式化成url参数
     */
    toQueryParams(){
        var buff = "";
        // console.log("toqueryParams returlar query values:" + this.queryValues);
        for (var i in this.queryValues){
            if (this.queryValues.hasOwnProperty(i)) {
                buff += i + "=" + this.queryValues[i] + "&";
           }
        }
        // console.log("toqueryParams buff:" + buff);

        buff = buff.slice(0,-1);
        // console.log("result buff:" + buff);

        return buff;
    }

    /**
     * 格式化参数格式化成json参数
     */

    toBodyParams(){
        // console.log("data/// before tobodyParams: "+this.bodyValues);
        // console.log("data/// tobodyParams: "+JSON.stringify(this.bodyValues));
        // console.log("/////////////type " +typeof this.bodyValues);
        // console.log("/////////////JSON type " +typeof JSON.stringify(this.bodyValues));
        // return JSON.stringify(this.bodyValues);

        var body = new Object();
        body.description = this.bodyValues['description'];
        body.price = this.bodyValues['price'];
        body.currency = this.bodyValues['currency'];
        body.notify_url = this.bodyValues['notify_url'];
        body.operator = this.bodyValues['operator'];
        //console.log("data/// tobodyParams: " +JSON.stringify(body));
        //console.log("/////////////type " +typeof JSON.stringify(body));

        return JSON.stringify(body);

        // return body;
    }

        /**
     * 格式化签名参数
     */
    toSignParams(){
        var string = '';
        string += PARTNER_CODE + '&' + this.getTime() +'&' + this.getNonceStr() + '&' + CREDENTIAL_CODE;

        // console.log('data///toSignParams: '+ string);
        return string;
    }

    /**
     * 生成签名
     * @return 签名，本函数不覆盖sign成员变量，如要设置签名需要调用setSign方法赋值
     */
    makeSign(){
        //签名步骤一：构造签名参数
        var string = this.toSignParams();
        // console.log('data///string:  ' + string);
        // var string = 'abc';

        //签名步骤三：SHA256加密
        // var hash = crypto.createHash('sha256',decoder.write(string))
        //                 .digest('hex');
        var hash = sha256(string);
        // console.log('data///hash:  ' +hash);

        //签名步骤四：所有字符转为小写
        var result = hash.toLowerCase();
        return result;
    }

    /**
     * 获取设置的path参数值
     */
    getPathValues(){
        return this.pathValues;
    }

    /**
     * 获取设置的query参数值
     */
    getQueryValues(){
        return this.queryValues;
    }

    /**
     * 获取设置的body参数值
     */
    getBodyValues(){
        return this.bodyValues;
    }



}

class FlashPayUnifiedOrder extends FlashPayDataBase{

    /**
     * 设置商户支付订单号，同一商户唯一
     * @param string $value
     **/
    setOrderId(value){
        this.pathValues['order_id'] = value;
    }

    /**
     * 获取商户支付订单号
     * @return 值
     **/
    getOrderId(){
        return this.pathValues['order_id'];
    }

    /**
     * 判断商户支付订单号是否存在
     * @return true 或 false
     **/
    isOrderIdSet(){
        if(typeof this.pathValues['order_id'] === 'undefined'){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 设置订单标题
     * @param string $value
     **/
    setDescription(value){
        this.bodyValues['description'] = value;
    }

    /**
     * 获取订单标题
     * @return 值
     **/
    getDescription(){
        return this.bodyValues['description'];
    }

    /**
     * 判断订单标题是否存在
     * @return true 或 false
     **/
    isDescriptionSet(){
        if(typeof this.bodyValues['description'] === 'undefined'){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 设置金额，单位为货币最小单位
     * @param string $value
     **/
    setPrice(value){
        this.bodyValues['price'] = value;
    }

    /**
     * 获取金额，单位为货币最小单位
     * @return 值
     **/
    getPrice(){
        return this.bodyValues['price'];
    }

    /**
     * 判断金额是否存在
     * @return true 或 false
     **/
    isPriceSet(){
        if(typeof this.bodyValues['price'] === 'undefined'){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 设置币种代码
     * 默认值: CAD
     * 允许值: CAD, CNY
     * @param string $value
     **/
    setCurrency(value){
        this.bodyValues['currency'] = value;
    }

    /**
     * 获取币种代码
     * 默认值: AUD
     * 允许值: AUD, CNY
     * @return 值
     **/
    getCurrency(){
        return this.bodyValues['currency'];
    }

    /**
     * 判断币种代码是否存在
     * @return true 或 false
     **/
    isCurrencySet(){
        if(typeof this.bodyValues['currency'] === 'undefined'){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 设置支付通知url,不填则不会推送支付通知
     * @param string $value
     **/
    setNotifyUrl(value){
        this.bodyValues['notify_url'] = value;
    }

    /**
     * 获取支付通知url
     * @return 值
     **/
    getNotifyUrl(){
        return this.bodyValues['notify_url'];
    }

    /**
     * 判断支付通知url是否存在
     * @return true 或 false
     **/
    isNotifyUrlSet(){
        if(typeof this.bodyValues['notify_url'] === 'undefined'){
            return false;
        }else{
            return true;
        }
    }

      /**
     * 设置操作人员标识
     * @param string $value
     **/
    setOperator(value){
        this.bodyValues['operator'] = value;
    }

      /**
     * 获取操作人员标识
     * @return 值
     **/
    getOperator(){
        return this.bodyValues['operator'];
    }

    /**
     * 判断操作人员标识是否存在
     * @return true 或 false
     **/
    isOperatorSet(){
        if(typeof this.bodyValues['operator'] === 'undefined'){
            return false;
        }else{
            return true;
        }
    }





}

// class FlashPayExchangeRate extends FlashPayDataBase{

// }

class FlashPayResults extends FlashPayDataBase{

      /**
     *
     * 使用数组初始化
     * @param array $array
     */
    fromArray(array){
        if (Array.isArray(this.bodyValues)){
            console.log(this.bodyValues);
            console.log("array");
        }
        else{
            console.log("not array");
        }
        //this.bodyValues = JSON.parse(array);
        if (Array.isArray(this.bodyValues)){
            console.log(this.bodyValues);
            console.log("after array");
        }
        else{
            console.log("after not array");
        }
        //Array.isArray(this.bodyValues);
        return array;
    }

      /**
     * 将json转为array
     * @param string $json
     * @throws FlashPayException
     *
     * 返回信息:
     * return_code          return_msg
     * --------------------------------------
     * ORDER_NOT_EXIST      订单不存在
     * ORDER_MISMATCH       订单号与商户不匹配
     * SYSTEMERROR          系统内部异常
     * INVALID_SHORT_ID     商户编码不合法或没有对应商户
     * SIGN_TIMEOUT         签名超时，time字段与服务器时间相差超过5分钟
     * INVALID_SIGN         签名错误
     * PARAM_INVALID        参数不符合要求，具体细节可参考return_msg字段
     * NOT_PERMITTED        未开通网关支付权限
     * --------------------------------------
     */
    init(array){
        var obj = new FlashPayDataBase;
        console.log("===========new class  " + obj);

        obj.fromArray(array);
        console.log("===========from array  " + obj);
        console.log("===========obj.getBodyValues()  " + obj.getBodyValues());

        return obj.getBodyValues();

    }
}

module.exports.FlashPayDataBase = FlashPayDataBase;
module.exports.FlashPayUnifiedOrder = FlashPayUnifiedOrder;
// module.exports = FlashPayExchangeRate;
module.exports.FlashPayResults = FlashPayResults;
