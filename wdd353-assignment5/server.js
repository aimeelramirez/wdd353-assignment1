

"use strict"

const https = require('https');
const fs = require('fs')
const url = require('url');


let ejs = require('ejs');
const path = require('path');

const session = require('express-session')
let sess;
// const url = require('url');
//cert
const options = require('./config')
//call api to get to server from dir
// const api = require('./public/js/api')
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
//use session
app.use(session({ secret: "secret", saveUninitialized: true, resave: true }))
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
    sess = req.session

    res.render('dashboard', {
        title: 'DASHBOARD',
        message: "take a look at the console.",
        session: sess
    })
    res.end();

})
router.get("/data", function (req, res) {
    sess = req.session

    console.log(JSON.stringify(req.body))
    res.render('404', {
        title: 'DATA',
        message: "take a look at the console."
        ,
        session: sess
    })
    res.end();

})

router.post("/data", function (req, res) {
    console.log(req.body)
    sess = req.session

    res.render('404', {
        title: 'DATA',
        message: JSON.stringify(req.body)
        ,
        session: sess
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


// router.post("/auth", (req, res) => {
//     //get auth
//     controller.signup(req, res)
//     res.end();

// })

const auth = (req, res) => {
    let errors = [];
    if (req.body.email !== "Mike@aol.com") {
        errors.push('not the right user, try again.')
    }
    if (req.body.password !== "abc123") {
        errors.push('not the right user, try again.')
    }
    return errors
}

router.post("/login", (req, res) => {
    //get auth
    console.log('Sub Pages - Dashboard');

    controller.login(req, res)
    sess = req.session
    let checkAuth = auth(req, res)
    console.log(checkAuth)
    if (checkAuth.length <= 0) {
        sess.loggedIn = true
        console.log(sess)
        if (sess.loggedIn) {
            req.session.destroy();

            res.setHeader('Content-Type', 'text/html')
            res.redirect('/profile')
            // res.write('<p>views: ' + req.session.loggedIn + '</p>')
            res.end()
        }
    } else {
        console.log('Sub Pages - Dashboard still');

        res.render('index', {
            title: 'HOME',
            message: 'Back to Home page.',
            session: sess
        })
    }
    // res.end();

})
router.get("/profile", (req, res) => {
    sess = req.session
    res.render('profile', {
        title: 'PROFILE',
        message: 'Hello this is redirected.',
        session: sess
    })
    console.log('Sub Pages - Profile');

})
router.get("/overview", (req, res) => {
    console.log('Sub Pages - Overview');
    sess = req.session

    res.render('overview', {
        title: 'OVERVIEW',
        message: 'Page not found.',
        session: sess
    })
})



router.get("/index", (req, res) => {
    sess = req.session

    res.render('index', {
        title: 'HOME',
        message: "Welcome!",
        session: sess
    })
})
router.get('/', function (req, res) {
    sess = req.session

    res.render('index', {
        title: 'HOME',
        message: 'Welcome!',
        session: sess
    })
});

router.get("/404", (req, res) => {
    sess = req.session

    res.render('404', {
        title: '404',
        message: 'Page not found.',
        session: sess
    })
})

router.get('/*', (req, res) => {
    sess = req.session

    res.render('404', {
        title: '404',
        message: 'Page not found.',
        session: sess
    })
})


//ssl
https
    .createServer(options, app, (req, res) => {
        // app.listen(port, () => {
        console.log(`server is listening at post ${port}.`)
        // })
    }).listen(port);