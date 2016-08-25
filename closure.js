/* 闭包和高阶函数
 *
 */

// 乘法每次计算是一种浪费,加入缓存机制

// var cache = {};
//
// var mult = function(){
//     var args = Array.prototype.join.call(arguments,',');
//     // console.log(args); // 1,2,3 变成这个  1,2,3
//     // console.log(arguments); // { '0': 1, '1': 2, '2': 3 }  [1,2,3]本来是这个
//
//     if(cache[args]){
//        return cache[args];
//     }
//
//     var a = 1;
//
//     for(var i = 0, l = arguments.length; i < l; i++){
//         a = a * arguments[i];
//     }
//
//     return cache[args] = a;
// };
//
// console.log(mult(1,2,3));
// console.log(mult(1,2,3));


// 提炼函数是代码重构中的一种常见技巧
var mult = (function(){
    var cache = {};

    var calculate = function (){  // 封装 calculate 函数
        var a = 1;

        for(var i = 0, l = arguments.length; i < l; i++){
           a = a * arguments[i];
        }

        return a;
    };

    return function(){
       var args = Array.prototype.join.call( arguments,',');

        if( args in cache ){
            return cache[ args ];
        }

        return cache[ args ] = calculate.apply(null,arguments);
    }
})();

// console.log(mult(1,2,3));
// console.log(mult(1,2,3));



/*   闭包和面向对象设计
 *
 *
 */


// AOP (面向切片编程)
Function.prototype.before = function (beforefn){
      var _self = this;
      return function(){
          beforefn.apply( this, arguments); // 执行新函数,修正this
          return _self.apply( this, arguments); // 执行原函数
      }
};

Function.prototype.after = function (afterfn){
      var _self = this;
      return function(){
          var ret = _self.apply( this,arguments);

          afterfn.apply( this, arguments);

          return ret;
      }
};

var func = function(){
    console.log(2);
};

func = func.before(function(){
    console.log(1);
}).after(function(){
    console.log(3);
})

// console.log(func)
//
// func();

/*
 * 高阶函数的其他应用
 */

// currying 部分求值  待到函数被真正需要求值的时候,之前传入的所有参数都会被一次性用于求值

var cost = (function(){
    var args = [];

    return function(){
        if ( arguments.length === 0 ){
             var money = 0;

             for( var i= 0, l = args.length; i < l; i++){
                 money += args[ i ];
             }
             return money;
        } else {
             [].push.apply( args,arguments );
        }
    }
})();

// cost(100);
// cost(200);
//
// console.log(cost());

var currying = function(fn){
    var args = [];

    return function(){
        if( arguments.length === 0 ){
            return fn.apply(this, args);
        }else{
            [].push.apply( args, arguments);

            return arguments.callee;
        }
    }
};

var cost1 = (function(){
    var money = 0;

    return function(){
        for (var i = 0, l = arguments.length; i < l; i++){
            money += arguments[i];
        }
        return money;
    }
})();


var cost2 = currying(cost1);

// cost2(100);
// cost2(200);
//
// console.log( cost2() );

// uncurrying 泛化this的过程提取处理啊

// 分析调用Array.prototype.push.uncurrying() 这句代码时发生了什么事情

Function.prototype.uncurrying = function(){
    var self = this;  // self 此时是 Array.prototype.push

    return function(){
        var obj = Array.prototype.shift.call( arguments );  // array.shift 删除并返回第一个元素
        // obj 是
        // {
        //   'length' : 1,
        //   '0' :1
        // }
        // arguments 对象的第一个元素被截去,剩下[2]
        return self.apply( obj, arguments);
        // 相当于 Array,prototype.push.apply(obj,2);
    }
};

var push = Array.prototype.push.uncurrying();

var obj = {
    'length' : 1,
    '0': 1
};

// push( obj, 2 );
// console.log( obj ); // { '0': 1, '1': 2, length: 2 }


// 函数节流  (如果该次延迟支线还没完成,则忽略接下来调用该函数的请求)

var throttle = function ( fn, interval ){
    var _self = fn,   // 保存需要被延迟执行的函数引用
        timer,  // 定时器
        firstTime = true;  // 是否第一次调用

    return function (){
        var args = arguments,
            _me = this;

        if(firstTime) {
           _self.apply(_me, args);
           return firstTime = false;
        }


        if (timer){
            return false;
        }

        timer = setTimeout(function(){
            clearTimeout(timer);
            timer = null;

            __self.apply(_me, args);
        },interval || 500);
    }
};

// setInterval(function(){
//     var aa = throttle(function(){
//         console.log(1);
//     },500);
//
//     aa()
// },100);

// 分时函数  timeChunk (创建节点时需要用到的数据,封装了创建节点逻辑的函数,每一批创建的节点数量)

var timeChunk = function ( ary, fn, count){
    var obj,
        t;

    var len = ary.length;

    var start = function(){
        for (var i = 0; i < Math.min(count||1,ary.length); i++){
            var obj = ary.shift();
            fn( obj );
        }
    };

    return function(){
       t = setInterval(function(){
           if( ary.length === 0 ){ //如果全部的节点都已经被创建好
               return clearInterval( t );
           }
           start();
       },200);  // 分批执行的时间间隔,也可以用参数的形式传入
    };
};

var ary = [];

for (var i=1; i <= 1000; i++){
    ary.push( i );
}

var renderFriendList = timeChunk(ary,function(n){
    console.log(n)
},8);

// renderFriendList();


// 惰性加载函数 (在下一次进入addEvent函数的时候,addEvent函数里不再存在条件分支语句)
var aa = 123;
var addEvent = function(elem, type, handler){
    if( aa == 123){
        addEvent = function(){
            console.log(1)
        }
    }else if( aa == 321){
        addEvent = function(){
            console.log(2)
        }
    }

    addEvent(elem, type, handler);
};

addEvent(1,'type',function(){
     console.log(3)
});

addEvent(2,'type',function(){
    console.log(3)
});














