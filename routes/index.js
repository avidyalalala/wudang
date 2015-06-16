var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect("./index.html");
});

router.get('/index.html', function(req, res, next) {
    //res.send("hello index")
    res.render('index' , { title: '太极家园' }
    );
});

var ccap=require('ccap');
var captcha = ccap();

router.get('/captcha', function(req, res, next) {
    //res.send("hello index")
    var ary=captcha.get();
    var txt=ary[0];
    console.log(txt);
    var buf=ary[1];

    res.end(buf);
});


module.exports = router;
