/*
 *  虚拟代理实现图片预加载
 *  在图片被真正价值好之前,页面中将出现一张占位的loading,来提示用户图片正在加载
 */

var myImage = (function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc : function( src ){
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function(){
    var img = new Images;

    img.onload = function(){
        myImage.setSrc( this.src );
    };

    return {
       setSrc : function( src ){
           myImage.setSrc('loading');

           img.src = src;
       }
    }
})();

proxyImage.serSrc('aaaa.jpg');


/*
 * 虚拟代理合并HTTP请求
 * 2秒之后才把这2秒之内需要同步的文件ID打包发给服务器
 */

var synchronousFile = function(id){
    console.log('开始同步文件,id为'+id);
};

var proxySynchronousFile = (function(){
    var cache = [],  // 保存一段时间内需要同步的ID
        timer;  // 定时器

    return function ( id ) {
        cache.push(id);

        if( timer ){ // 保证不会覆盖已经启动的定时器
            return;
        }

        timer = setTimeout(function(){
            synchronousFile( cache.join(',') ); // 2秒后向本体发送需要同步的ID集合
            clearTimeout(timer); // 清空定时器

            timer = null;
            cache.length = 0; // 清空ID集合
        },2000);
    }
})();


var checkout = document.getElementsByTagName( 'input' );

for( var i = 0,c; c = checkout[i++];){
    c.onclick = function(){
       if ( this.checked === true ){
           proxySynchronousFile(this.id);
       }
    }
}

/*
 *  虚拟代理在惰性加载中的应用
 *
 */

var minConsole = (function(){
    var cache = [];

    var handler = function( ev ){
        if (ev.keyCode === 113 ){
            var script = document.createElement( 'script' );

            script.onload = function(){
                for (var i = 0, fn; fn = chche[i++];){
                    fn();
                }
            };

            script.src = 'minConsole.js';

            document.getElementsByName( 'head' )[0].appendChild( script );
            document.body.removeEventListener('keydown',handler); // 只加载一次
        }
    };

    document.body.addEventListener('keydown', handler, false);

    return {
       log: function(){
           var args = arguments;

           cache.push(function(){
                return minConsole.log.apply( minConsole, args);
           });
       }
    }
})();

minConsole.log(11);  //开始打印log

minConsole = {
    log : function(){
        // 正在代码。。。
        console.log(Array.prototype.json.call(arguments))
    }
};


/*
 *   缓存代理
 *   缓存代理可以为一些开销大的运算结果提供暂时的 存储
 */

// 缓存代理的例子 -- 计算乘机 例子前面有
// 缓存代理用于ajax异步请求数据


/*
 *  用(高阶函数)动态创建代理
 */

/*** 计算乘积 ***/
var mult = function(){
    var a = 1;
    for( var i = 0, l = arguments.length; i < l; i++ ){
        a = a * arguments[i];
    }
    return a;
};

/*** 计算加和 ***/
var plus = function(){
    var a = 0;
    for( var i = 0, l = arguments.length; i < l; i++){
        a = a + arguments[i];
    }
    return a;
};

/*** 创建缓存代理的工厂 ***/
var createProxyFactory = function( fn ){
    var cache = {};

    return function(){
        var args = Array.prototype.join.call( arguments,',');

        if( args in cache){
            return cache[ args ];
        }

        return cache[args] = fn.apply( this, arguments);
    }
};

var proxyMult = createProxyFactory( mult );
var proxyPlus = createProxyFactory( plus );

// proxyMult(1,2,3,4);
// proxyPlus(1,2,3,4);



/*
 *  其他代理模式
 *  防火墙代理 控制网络资源的访问 保护主题不让'坏人'接近
 *  远程代理 为一个对象在不同的地址空间提供局部代表
 *  保护代理 用户对象应该有不同访问权限的情况
 *  智能引用代理,取代了简单的指针,它在访问对象时执行一些附加操作,比如计算一个对象被引用的次数
 *  写时复制代理
 *
 */


























