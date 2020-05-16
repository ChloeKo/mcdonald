const order = require('./data/Orders.json');
const ratings = require('./data/Ratings.json');
const sellers = require('./data/Sellers.json');
const express = require('express');
const app = express();


//商品資訊
app.get('/order', (req, res)=>{
    res.json(order);
});

//評價資訊
app.get('/rating', (req, res)=>{
    res.json(ratings);
});

//賣家資訊
app.get('/seller', (req, res)=>{
    res.json(sellers);
});

app.listen(process.env.PORT||5000, process.env.IP, ()=>{
    console.log('server start');
});
