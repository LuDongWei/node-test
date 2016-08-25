/*   原型链作为实现继承的主演方法
 *   prototype:  返回对象类型原型的引用
 */

function SuperType(){
    this.prototype = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.prototype;
};

function SubType(){
     this.subproperty = false;
}

// 继承了 SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubrValue = function(){
    return this.subproperty;
};


var instance = new SubType();

// console.log(instance.getSuperValue());
// console.log(instance.prototype);


function SuperValue (){

}

var aa = new SuperValue();

console.log(aa.prototype)
console.log(aa.prototype.constructor)