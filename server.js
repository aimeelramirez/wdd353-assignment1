

"use strict"

const https = require('https');
const fs = require('fs')


let ejs = require('ejs');
const path = require('path');

// const sessions = require('express-session')
// const url = require('url');
//cert
const options = require('./config')
//call api to get to server from dir
const api = require('./public/js/api')
//controller on signup for logic
const controller = require("./public/js/auth/controller")


// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);


//get api express
const express = require("express"),
    app = express();
const router = new express.Router();

//set port
const port = 8080
app.set("port", port);


//check dirname
// console.log(process.cwd())

// get the view pages
const viewsPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, 'public');
//set views
app.set('views', viewsPath);
//body parse update
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// engines
// app.engine('html', es6Renderer);
app.engine('ejs', require('ejs').__express);
app.engine('html', ejs.renderFile);
//view engine
app.set('view engine', 'ejs');
app.set('view engine', 'html');
// static
// get public path
app.use(express.static(publicPath));
// //gets the styles to be dynamic
app.use(express.static(path.join(__dirname, 'public/css')));
// //gets  the js to be dynamic
app.use(express.static(path.join(__dirname, 'public/js')));
//use router
app.use('/', router)

/*  Encrypt  */

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// var hw = encrypt("Some serious stuff")
// console.log(hw)
// console.log(decrypt(hw))

router.get("/dashboard", function (req, res) {
    // console.log(req.body)
    res.render('dashboard', {
        title: 'DASHBOARD',
        message: "take a look at the console."
    })
    res.end();

})
router.get("/data", function (req, res) {
    console.log(JSON.stringify(req.body))
    res.render('404', {
        title: 'DATA',
        message: "take a look at the console."
    })
    res.end();

})

router.post("/data", function (req, res) {
    console.log(req.body)

    res.render('404', {
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


router.post("/auth", (req, res) => {
    //get auth
    controller.signup(req, res)
    res.end();

})

router.post("/login", (req, res) => {
    //get auth
    controller.signup(req, res)
    res.end();

})
router.get("/profile", (req, res) => {
    console.log('Sub Pages');
    res.render('profile', {
        title: 'PROFILE',
        message: 'Page not found.'
    })
})
router.get("/overview", (req, res) => {
    console.log('Sub Pages');
    res.render('overview', {
        title: 'OVERVIEW',
        message: 'Page not found.'
    })
})



router.get("/index", (req, res) => {
    res.render('index', {
        title: 'HOME',
        message: "Welcome!"
    })
})
router.get('/', function (req, res) {
    res.render('index', {
        title: 'HOME',
        message: 'Welcome!'
    });
});

router.get("/404", (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.'
    })
})

router.get('/*', (req, res) => {
    res.render('404', {
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