var url = require('url');

var express = require('express');
var app = require('express')();

var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var cnodeUrl = 'https://cnodejs.org/';


app.get('/',function(req,res,next){
    getLIst(function(json){
        res.send(json);
    })
});



getLIst(function(json){
    console.log(json);
});

/* 获取 node 中文论坛 的
 * 帖子 列表 与连接
 *
 */
function getLIst(callback) {
    request(cnodeUrl, function (error, response, body) {
        if(error){
            res.send('cuowu')
        }

        var $ = cheerio.load(body);
        var items = [];
        $('#topic_list .topic_title').each(function(a,b){

            var bb = $(b);


            items.push({
                title:bb.attr('title'),
                href:bb.attr('href')
            });
        });

        gitmore(items);
    });
}


/*  接下来获取 每个帖子的 用户积分
 *
 */
function gitmore(items){
     var moreUrl = [];

     for ( var i = 0; i < items.length; i++ ){
         moreUrl.push(url.resolve(cnodeUrl,items[i].href));
     }

     async.everyLimit(moreUrl,2,function(url,callback){
         request(url,function(error, response, body){
             if(error){
                 callback(url,'连接不成功');
             }

             var $ = cheerio.load(body);

             var aa = $(".big").html();

             console.log(aa);

             callback(null,aa);
         });

     },function(error,value){
         console.log(error);
         console.log(value);
     });

}



app.listen(3000,function(req,res,next){
   console.log('30021')
});
