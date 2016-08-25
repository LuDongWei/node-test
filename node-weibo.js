var express = require('express');
var app = require('express')();

var weibo = require('weibo');

// change appkey to yours
var appkey = '4263807830';
var secret = 'f314a703b2586510ae62a8baaef1570e';
var oauth_callback_url = '127.0.0.1:3000';
weibo.init('weibo', appkey, secret, oauth_callback_url);

var user = { blogtype: 'weibo' };
var cursor = {count: 20};


weibo.public_timeline(user, cursor, function (err, statuses) {
    if (err) {
        console.error(err);
    } else {
        console.log(statuses);
    }
});


app.get('/',function(req,res,next){
   console.log(123)

    weibo.public_timeline(user, cursor, function (err, statuses) {
        if (err) {
            res.send(err.data);
        } else {
            res.send(statuses);
        }
    });

});

app.listen(3000,function(req,res,next){
    console.log('3000')
});