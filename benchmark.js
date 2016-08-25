var Benchmark = require('Benchmark');
var suite = new Benchmark.Suite;

var int1 = function (str){
    return +str;
};

var int2 = function (str){
    return parseInt(str,10);
};

var int3 = function (str){
    return Number(str);
};

var number = '1000';

suite
    .add('+', function () {
        int1(number);
    })
    .add('parseInt', function () {
        int2(number);
    })
    .add('Number', function () {
        int3(number);
    })
    .on('cycle',function(event){
        console.log(String(event.target));
    })
    .on('complete',function(){
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });