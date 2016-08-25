/*
 * 面向对象的JavaScript
 */

/*
 * 静态类型语言  动态类型语言
 * 动态类型语言   实现一个原则'面向接口编程,而不是面向实现编程'
 */

var duck = {
    sing: function(){
        console.log('123');
    }
};

var chicked = {
     sing: function(){
         console.log('321')
     }
};

var choir = [];

var joinChoir = function(animal){
    if(animal && typeof animal.sing === 'function'){
        choir.push(animal);

        console.log('欢迎你加入');

    }
};

// joinChoir(duck);   //欢迎你加入
// joinChoir(chicked);  //欢迎你加入
// console.log(choir);  //[ { sing: [Function] }, { sing: [Function] } ]


/*  多态
 *  同一个操作作用于不同的对象上面,可以产生不同的解释和不同的执行结果。换句欢说给不同的对象发送同一个消息的时候,这些对象会根据这个消息分别给出不同的反馈
 *  '做什么和怎么去做是分开的'
 */

var makeSound = function( animal ){
    animal.sound();
};

var Duck = function(){};
Duck.prototype.sound = function(){
    console.log('123');
};

var Chicken = function(){};
Chicken.prototype.sound = function(){
    console.log('321');
};

// makeSound( new Duck());  // 123
// makeSound( new Chicken()); // 321



/*
 *  封装 (将信息隐藏)
 *
 */

/*
 *  模拟public和private两种封装
 */
var myObject = (function(){
    var _name = 'sven';     //私有(private)变量
    return {
        getName: function(){
            return _name;  // 公开(public)方法
        }
    }
})();

// console.log(myObject.getName());  //sven
// console.log(myObject._name); //underfined


/*  原型模式和基于原型继承的JavaScript对象系统
 *  (JavaScript)就是使用原型模式来搭建整个面向对象系统的
 *
 *  使用克隆的原型模式(是否提供clone方法,es5提供了object.create)
 */

var Plane = function(){
    this.blood = 100;
};
var plane = new Plane();
plane.blood = 500;

var clonePlane = Object.create(plane);

delete clonePlane.blood;  // 无法删除

// console.log(clonePlane.blood); // {blood:500}  不能删除

// var cc = clone(plane);
//
// delete cc.blood;
//
// console.log(cc.blood);  // 可以删除

function clone(obj) {
    var o, i, j, k;
    if (typeof(obj) != "object" || obj === null) return obj;
    if (obj instanceof(Array)) {
        o = [];
        i = 0;
        j = obj.length;
        for (; i < j; i++) {
            if (typeof(obj[i]) == "object" && obj[i] != null) {
                o[i] = arguments.callee(obj[i]);
            } else {
                o[i] = obj[i];
            }
        }
    } else {
        o = {};
        for (i in obj) {
            if (typeof(obj[i]) == "object" && obj[i] != null) {
                o[i] = arguments.callee(obj[i]);
            } else {
                o[i] = obj[i];
            }
        }
    }

    return o;
}

/* 在不支持的游览器中可以
 */
// Object.create = Object.create || function (obj) {
//        var F = function () {
//        };
//        F.prototype = obj;
//
//         return new F();
//     };

/*  JavaScript 原型继承的基本规则
 *  所有的数据都是对象
 *  要得到一个对象,不是通过实例类,而是找到一个对象作为原型并克隆它
 *  对象会记住它的原型  (chrome中的__proto__)
 *  如果对象无法响应某个请求,它会把这个请求委托给它自己的原型
 */

/* 所有的数据都是对象
 * JavaScript 中的根对象是Object.prototype
 * getPrototypeOf 方法(获取对象的原型)
 * prototype (返回对象类型原型的引用)
 */
var obj1 = new Object();
var obj2 = {};

// console.log(Object.getPrototypeOf(obj1) === Object.prototype ); // true
// console.log(Object.getPrototypeOf(obj2) === Object.prototype ); // true


/*  最常用的原型继承方式
 */
var obj = {name:'sven'};

var A = function(){};
A.prototype = obj;

var a = new A();
// console.log(a.name);  // sven

//  尝试遍历对象a中的所有属性,但没有找到name这个属性
//  查找name属性的这个请求被委托给对象a的构造器的原型,它被a.__proto__记录着并且指向A.prototype,而A.prototype被设置为对象obj
//  在对象obj中找到了name 属性,并返回它的值



/*  typeof  获取值的类型 对于对象类型的值,只能得到一个'object'
 *  instanceof  得到一个值的具体类型
 *  constructor 指向对象的构造函数
 *
 *  prototype 返回对象类型原型的引用
 */

function Person(){

}

Person.prototype = {
    name : "aaa",
    age: 29,
    sayName : function(){
        console.log(this.name);
    }
};


var xiaom = new Person();


// console.log(typeof xiaom);  // Object
// console.log(xiaom instanceof  Object); // true
// console.log(xiaom instanceof  Person); // true
//
// console.log(xiaom.constructor == Object); // true
// console.log(xiaom.constructor == Person); // false


/* this,call和apply
 *
 */

/* this的指向大致可以分为以下4种 (除去with和eval)
 * 作为对象的方法调用 - 指向该对象
 * 作为普通函数调用 - 指向全局对象
 * 构造器调用
 * Function.prototype.call 和 Function.prototype.apply调用
 */

// 作为普通函数调用

name = 'globaName';  // 在游览器中可以用window.name

var getName = function (){
    return this.name;
};

// console.log(getName()); // globaName

var myObject2 = {
    name : 'sven',
    getName : function(){
        return this.name;
    }
};

var getName = myObject2.getName;

// console.log(getName());  // globaName

// console.log(myObject2.getName()); // sven


// 构造器调用
// 如果构造器不显示地返回任何数据,或者是返回一个非对象类型的数据,会造成下面的问题:
var myClass = function(){
    this.name = 'sven';

    return {   // 显示地返回一个对象
        name: 'anne'
    }
};

var obj = new myClass();

// console.log( obj.name ); // anne


// Function.prototype.call 或 Function.prototype.apply 调用 可以动态的改变传入函数的this
var obb = {
    name : 'sven',
    getName : function(){
        return this.name;
    }
};

var occ = {
    name : 'anne'
};


// console.log( obb.getName() );   // sven
// console.log( obb.getName.call(occ)); // anne


// 丢失this
var obbb = {
    myName: 'sven',
    getName: function(){
       return this.myName;
    }
};

// console.log(obbb.getName()); // sven

var getName2 = obbb.getName();

// console.log(getName2());  // errot
// console.log(getName2);  // undefined



/*  Function.prototype.call  传入参数的数量不固定,跟apply相同的是,一个参数也是代表函数体内的this指向,第二个参数开始往后,每个参数被依次传入函数
 *  Function.prototype.apply 接受2个参数,第一个参数指定了函数体内this的指向,第二个参数为一个带下标的集合
 *  当第一个参数为null,函数体内的this会指向默认的宿主对象,游览器则是window
 *  在 'use strict' 在严格模式下 函数体内的this还是为null
 */

// 改变this的指向
var ob1 = {
    name : 'sven'
};

var ob2 = {
    name : 'anne'
};

nn = 'window';

var getName = function(){
    console.log(this.name);
};

// getName();  // globaName
// getName.call( ob1 ); // sven
// getName.call( ob2 ); // anne



var aabb = function(){
    console.log(this.nn);  // aa
    var func = function(){
        console.log(this.nn); // window  在时间内部调用func函数时,func函数体内的this就指向了window
    };
    func();
};

// aabb.call({nn:'aa'});


// var bbcc = (function(func){
//     return function(){
//         return func.apply(document,arguments);
//     }
// })({aa:nn});
//
// var aa = bbcc;
// var bbb = aa({aa:nn});
// console.


/*  Function.prototype.bind 用来指定函数内部this指向
 *
 */

Function.prototype.bind = function(context){
    var self = this;

    return function (){
        return self.apply(context,arguments);
    }
};


var ccc = {
    name: 'sven'
};

var fff = function(){
    console.log(this.name);
}.bind(ccc);

fff();


/*  想往arguments中添加一个新的元素,通常会借用Array.prototype.push
 *
 */












