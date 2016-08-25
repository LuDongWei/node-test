/*
 *  策略模式: 定义一系列的算法,把它们一个个封装起来,并且使它们可以相互替换
 */

var strategies = {
    "S" : function (salary){
        return salary*4;
    },
    "A" : function (salary){
        return salary*3;
    },
    "B" : function (salary){
        return salary*2;
    }
};

var calculateBonus = function (level, salary){
    return strategies[level](salary)
};

// console.log( calculateBonus('S',20000) );

/*
 * 表单验证 期望以这样:
 */

// validator.add( registerForm.username,[{
//    strategy : 'isNonEmpty',
//    errorMsg : '用户不能为空'
// },{
//     strategy : 'minLength:6',
//     errorMsg : '用户长度不能小于10位'
// }]);



/*-- 策略对象 --*/
var strategies = {
    isNonEmpty : function( value, errorMag){
        if( value == ''){
            return errorMag;
        }
    },
    minLength : function( value, length, errorMag){
        if( value.length < length){
            return errorMag
        }
    },
    isMobile : function( value, errorMsg){
        if( !/(^1[3|5|8][0-9]{9}$)/.test( value )){
            return errorMsg;
        }
    }
};

/*-- Validator 类 --*/
var Validate = function(){
    this.cache = [];
};


Validate.prototype.add = function( dom, rules){
     var self = this;

     for( var i = 0, rule; rule = rules[i++];){
         (function( rule ){
             var strategAry = rule.strateguAry.split(':');
             var errorMsg = rule.errorMsg;

             self.cache.push(function(){
                  var strategy = strategAry.shift();

                  strategAry.unshift( dom.valve );

                  strategAry.push( errorMsg );

                  return strategies[strategy].apply(dom,strategAry);
             });
         })(rule)
     }
};

Validate.prototype.start = function(){
    for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
         var errorMag = validatorFunc();

          if(errorMag){
              return errorMag
          }
    }
};

/*-- 客户调用代码 --*/
var registerForm = document.getElementById('registerFrom');

var validataFunc = function(){
    var validator = new Validate();

    validator.add( registerFrom.userName, [{
       stratgy: 'isNonEmpty',
       errorMsg: '用户名不能为空'
    }]);

    var errorMsg = validator.start();

    return errorMsg
};

registerForm.onsubmit = function(){
    var errorMsg = validataFunc();

    if(errorMsg){
        //
    }
};






