var express = require('express');
var app = require('express')();

var request = require('request');
var cheerio = require('cheerio');


app.get('/',function(req,res,next){
    request('https://cnodejs.org/', function (error, response, body) {
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

        res.send(items);
          // console.log(error)
          // console.log(response)
          // console.log(body)
    });


});

app.listen(3000,function(req,res,next){
   console.log('30021')
});
