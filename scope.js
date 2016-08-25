// var 作用域

/*
 *  没有使用var关键字,会被定义成全局变量
 */
function foo() {
    value = "hello";
}
foo();
console.log(value); // 输出hello
console.log(global.value) // 输出hello


/*
 *  在函数中声明的变量在整个函数中都有定义
 */
function foo2() {
    for (var i = 0; i < 10; i++) {
        var value = 'hello world';
    }

    console.log(i); // 10

    console.log(value);  // hello world
}

foo2();


// 闭包

/*
 *  在函数式编程常见,使内部函数可以访问定义在外部函数中的变量
 */

var add = function(x){
    var base = x;

    return function(n){
        return n+base;
    }
};

var add1 = add(5);
console.log(add1(6));


/*
 * 坑
 */
for (var i = 0; i<5; i++){
    setTimeout(function(){
        console.log(i);
    },5);
}


for(var n= 0;n<5;n++){
    (function(aa){
        setTimeout(function(){
            console.log(aa);
        },5)
    })(n);
}


// this

/*
 *
 */








