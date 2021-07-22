

"use strict"

const axios = require('axios');
const https = require('https');
const fs = require('fs')
const options = require('./config')
const express = require("express");
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

app.set('view engine', 'ejs');
app.engine('html', require('ejs').__express);


//set views
app.set('views', path.join(__dirname, 'views'));
app.set('views', viewsPath);

//get use views
app.use(express.static(viewsPath));
//get public path
app.use(express.static(publicPath));
//gets the styles to be dynamic
app.use(express.static(path.join(__dirname, 'public/css')));
//gets  the js to be dynamic
app.use(express.static(path.join(__dirname, 'public/js')));


// router.get("/", (req, res) => {
//     res.render('/', {
//         title: '404',
//         errorMessage: 'Page not found.'
//     })
//     res.write("404")
// })
router.post("/404", (req, res) => {
    res.render('404.html', {
        title: '404',
        message: 'Page not found.'
    })
})
router.get("/", (req, res) => {
    res.render('index.html', {
        title: 'HOME',
        message: "Welcome! "
    })
})
app.use('/', router)

app.listen(port, () => {
    console.log(`server is listening at post ${port}.`)
})