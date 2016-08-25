/*
 * 单例模式: 保证一个类仅有一个实例,并提供一个访问它的全局访问点
 */

var single = function(name){
    this.name = name;
    this.instance = null;
};

single.prototype.getName = function(){
    console.log( this.name );
};

single.getInstence = function(name){
    if( !this.instance ){
         this.instance = new single(name);
    }

    return this.instance
};

// single.getInstence = (function(){
//     var instence = null;
//
//     return function(name){
//         if(!instence){
//             instence = new single(name);
//         }
//         return instence
//     }
// })();

// var a = single.getInstence( 'sven1');
// var b = single.getInstence( 'sven2');

// console.log(a); // { name: 'sven1', instance: null }
// console.log(b); // { name: 'sven1', instance: null }

/*
 *  透明的单例模式 : 用户从这个类中创建对象的时候,可以像使用其他任何普通类一样
 */

var CreateDiv = (function(){
    var instance;

    var CreateDiv = function( html ){ // 创建对象和执行初始化init方法
        if ( instance ){
             return instance;
        }

        this.html = html;
        this.init();

        return instance = this;
    };

    CreateDiv.prototype.init = function(){
        console.log(123);
    };

    return CreateDiv;
})();

// var a = new CreateDiv( 'sven1');
// var b = new CreateDiv( 'sven2');
//
// console.log(a); // { html: 'sven1' }
// console.log(b); // { html: 'sven1' }


/*
 * 用代理实现单例模式
 */

var CreateDiv1 = function( html){
    this.html = html;

    this.init();
};

CreateDiv1.prototype.init = function(){
    console.log(321);
};

// 引入代理类proxySingletonCreateDiv

var proxySingletonCreateDiv = (function(){

    var instance;

    return function( html){
        if( !instance){
             instance = new CreateDiv1();
        }

        return instance;
    }
})();

// var a = new proxySingletonCreateDiv('sven1');
// var b = new proxySingletonCreateDiv('sven2');
//
// console.log(a == b);

// 1. 使用命名空间 2.使用闭包封装私有变量

/*
 *  惰性单例: 指的是在需要的时候才创建对象实例
 */

var createLogin = (function(){
    var div;

    return function(){
        if( !div ){
             div = document.createElement('div');
             div.innerHTML = '123';
             div.style.display = 'none';
             document.body.appendChild(div);
        }

        return div;
    }
})();

document.getElementById('loginBet').onclick = function(){
     var loginLayer = createLogin();

    loginLayer.style.display = 'block';
};

// 通用的惰性单例

var getSingle = function (fn){
    var result;

    return function(){
        return result || ( result = fn.apply(this, arguments) );
    }
};

// 单例模式是一种简单但非常实用的模式,特别是惰性单例技术,在合适的时候才创建对象,并且只创建唯一的一个。
// 创建对象和管理单例的职责被分布在两个不同的方法中,这两个方法组合起来才具有单例模式的威力。






















