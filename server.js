

"use strict"

const https = require('https');
const fs = require('fs')
const options = require('./config')
const express = require("express");
let ejs = require('ejs');
const path = require('path');
const url = require('url');
const router = new express.Router();
const api = require('./public/js/api')

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


router.get("/data", function (req, res) {
    console.log(req.body)
    res.render('404.html', {
        title: 'DATA',
        message: "take a look at the console."
    })
    res.end();

})


router.post("/data", function (req, res) {
    console.log(req.body)
    res.render('404.html', {
        title: 'DATA',
        message: JSON.stringify(req.body)
    })
    let data = JSON.stringify(req.body).toString()
    fs.writeFile("public/js/data.txt", data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("public/js/data.txt", "utf8"));
        }
    });
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
    .createServer(options, app, api, (req, res) => {
        // app.listen(port, () => {
        console.log(`server is listening at post ${port}.`)
        // })
    }).listen(port);