

"use strict"

const axios = require('axios');
const https = require('https');
const fs = require('fs')
const options = require('./config')
const express = require("express");
let ejs = require('ejs');
const path = require('path');
const url = require('url');
const router = new express.Router();
//get api
const app = express();

//set port
const port = 8080
app.set("port", port);

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// // get the view pages of htmls
const viewsPath = path.join(__dirname, './views');

const publicPath = path.join(__dirname, './public');
// const partialsPath = path.join(__dirname, './partials');

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

//set views
app.set('views', viewsPath);
// app.set('partials', partialsPath);
app.engine('html', ejs.renderFile);


// app.get('/', function (req, res) {
//     res.render('index.html', {
//         title: 'HOME',
//     });
// });

// index page


// // about page
// app.get('/404', function (req, res) {
//     res.render('/404');
// });
router.get("/data", function (req, res) {
    res.render('404.html', {
        title: 'DATA',
        message: "take a look at the console."
    })
    // res.end();
})
router.post("/data", function (req, res) {
    console.log(req.body)
    res.render('404.html', {
        title: 'DATA',
        message: JSON.stringify(req.body)
    })
})
router.get("/dashboard", (req, res) => {
    console.log('Sub Pages');
    res.render('dashboard.html', {
        title: 'DASHBOARD',
        message: 'Page not found.'
    })
})
router.get("/profile", (req, res) => {
    console.log('Sub Pages');
    res.render('profile.html', {
        title: 'PROFILE',
        message: 'Page not found.'
    })
})
router.get("/overview", (req, res) => {
    console.log('Sub Pages');
    res.render('overview.html', {
        title: 'OVERVIEW',
        message: 'Page not found.'
    })
})

router.post("/404", (req, res) => {
    res.render('404.html', {
        title: '404',
        message: 'Page not found.'
    })
})
router.get("/index", (req, res) => {
    res.render('index.html', {
        title: 'HOME',
        message: "Welcome!"
    })
})
router.get("/", (req, res) => {
    res.render('index.html', {
        title: 'HOME',
        message: "Welcome!"
    })
})
// //get public path
app.use(express.static(publicPath));
// //gets the styles to be dynamic
app.use(express.static(path.join(__dirname, 'public/css')));
// //gets  the js to be dynamic
app.use(express.static(path.join(__dirname, 'public/js')));

app.use('/', router)
app.get('/*', (req, res) => {
    res.render('404.html', {
        title: '404',
        message: 'Page not found.'
    })
})
//ssl
https
    .createServer(options, app, (req, res) => {
        // app.listen(port, () => {
        console.log(`server is listening at post ${port}.`)
        // })
    }).listen(port);