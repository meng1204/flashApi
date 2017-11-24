var crypto = require('crypto'); // hash encryption
var PARTNER_CODE =require('./config').PARTNER_CODE;  //get PARTNER_CODE and CREDENTIAL_CODE
var CREDENTIAL_CODE =require('./config').CREDENTIAL_CODE
const { StringDecoder } = require('string_decoder'); //decode to utf8
const decoder = new StringDecoder('utf8');

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
        this.queryValues['monce_str'] = value;
    }

    /**
     * 获取随机字符串，不长于30位。推荐随机数生成算法的值
     * @return 值
     **/
    getNonceStr(){
        return this.queryValues['monce_str'];
    }

    /**
     * 判断随机字符串，不长于32位。推荐随机数生成算法是否存在
     * @return true 或 false
     **/
    isNonceStrSet(){
        // console.log(this.queryValues['monce_str']);
        if(typeof this.queryValues['monce_str'] === 'undefined'){
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
        console.log(this.queryValues['time']);
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
     * 格式化参数格式化成json参数
     */
    toBodyParams(){
        // this.bodyValues = [{
        //     'time' : 123,
        //     'id': 222
        // }]
        // console.log("data/// before tobodyParams: "+this.bodyValues);        
        console.log("data/// tobodyParams: "+JSON.stringify(this.bodyValues));
        return JSON.stringify(this.bodyValues);
    }

        /**
     * 格式化签名参数
     */
    toSignParams(){
        var string = '';
        string += PARTNER_CODE + '&' + this.getTime() +'&' + this.getNonceStr() + '&' + CREDENTIAL_CODE;

        console.log('data///toSignParams: '+ string);
        return string;
    }

    /**
     * 生成签名
     * @return 签名，本函数不覆盖sign成员变量，如要设置签名需要调用setSign方法赋值
     */
    makeSign(){
        //签名步骤一：构造签名参数
        var string = this.toSignParams();
        console.log('data///string:  ' + string);
        // var string = 'abc';

        //签名步骤三：SHA256加密
        var hash = crypto.createHash('sha256',decoder.write(string))
                        .digest('hex');
        console.log('data///hash:  ' +hash);
        
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
    constructor(){
        this.partner_code = "ZZZ6";
        this.credential_code = '2c5NmzajTLeaz5xFzeKldQ3vWARqfGkU';
    }

}

module.exports = FlashPayDataBase;