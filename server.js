

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
const controller = require("./public/js/auth/controller")
// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
//get api

const app = express();

//set port
const port = 8080
app.set("port", port);



console.log(process.cwd())

// // get the view pages of htmls
const viewsPath = path.join(__dirname, './views');

const publicPath = path.join(__dirname, './public');
// const partialsPath = path.join(__dirname, './partials');

//set views
app.set('views', viewsPath);
// app.set('partials', partialsPath);
app.set('ejs', ejs.renderFile);


app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
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

var hw = encrypt("Some serious stuff")
console.log(hw)
console.log(decrypt(hw))

router.get("/dashboard", function (req, res) {
    // console.log(req.body)
    res.render('dashboard.html', {
        title: 'DASHBOARD',
        message: "take a look at the console."
    })
    res.end();

})
router.get("/data", function (req, res) {
    console.log(JSON.stringify(req.body))
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
// router.get("/auth", (req, res) => {
//     // // res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
//     // // res.header(
//     // //     "Access-Control-Allow-Origin",
//     // //     "Access-Control-Allow-Headers",
//     // //     "x-access-token, Origin, X-Requested-With, Content-Type, Accept",
//     // // )

//     // // res.setHeader("Content-Type", "text/html");
//     // console.log(JSON.stringify(req.body))
//     // res.render('dashboard.html', {
//     //     title: 'DASHBOARD',
//     //     message: "take a look at the console."
//     // })

// })

router.post("/auth", (req, res) => {

    controller.signup(req, res)
    res.end();

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
// router.get("/index", (req, res) => {
//     res.render('index', {
//         title: 'HOME',
//         message: "Welcome!"
//     })
// })
// router.get("/", (req, res) => {
//     res.render('index', {
//         title: 'HOME',
//         message: "Welcome!"
//     })
// })
// //get public path
app.use(express.static(publicPath));
// //gets the styles to be dynamic
app.use(express.static(path.join(__dirname, 'public/css')));
// //gets  the js to be dynamic
app.use(express.static(path.join(__dirname, 'public/js')));

app.use('/', router)
app.get('/', function (req, res) {
    res.render(viewsPath + '/*');
});
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