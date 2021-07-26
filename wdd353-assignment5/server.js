

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
async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString("hex")
        crypto.scrypt(password, salt, 24, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 24, (err, derivedKey) => {
            if (err) reject(err);
            // let encryptedText = Buffer.from(derivedKey, 'hex');
            // let test = derivedKey.toString('hex')
            resolve(key == derivedKey.toString('hex'))
        });
    })
}

async function run(input) {
    let password1 = await hash(input)

    let promise = new Promise((resolve, reject) => {
        fs.readFile('public/js/auth/verify.txt', 'utf-8', (err, data) => {
            if (err) throw err;
            resolve(data + "\n")
        });
    });
    let result = await promise;
    let verifyPassword = await verify(input, JSON.parse(result))
    let resultPassword = await verify(input, password1)
    // console.log("password2 ", await verify(input, JSON.parse(result)))
    // console.log("password1", await verify(input, password1))
    if (resultPassword === verifyPassword) {
        console.log("match")
        return "match"
    } else {
        return "no match"
    }


}
function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let sendData = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    fs.writeFile("public/js/auth/verify.txt", JSON.stringify(sendData), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("public/js/auth/verify.txt", "utf8"));
        }
    });
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
        message: "Profile is authenicated.",
        session: sess
    })
    res.end();

})
router.get("/data", function (req, res) {
    sess = req.session

    console.log(JSON.stringify(req.body))
    res.render('404', {
        title: 'DATA',
        message: "Profile is authenicated."
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
        errors.push('Not the right email for user, try again.')
    }
    //hash it
    let checkHash = run(req.body.password)
    //created this to get the verify on password.
    // let data = JSON.stringify(password1).toString()
    // fs.writeFile("public/js/auth/verify.txt", data, (err) => {
    //     if (err)
    //         console.log(err);
    //     else {
    //         console.log("File written successfully\n");
    //         console.log("The written has the following contents:");
    //         console.log(fs.readFileSync("public/js/auth/verify.txt", "utf8"));
    //     }
    // });
    if (checkHash === "no match") {
        errors.push('Not the right User on hashed password. Try Again.')
    }
    return errors
}

router.post("/login", (req, res) => {
    //get auth
    console.log('Sub Pages- Dashboard');

    controller.login(req, res)
    sess = req.session
    let checkAuth = auth(req, res)
    console.log(checkAuth)
    if (checkAuth.length <= 0) {
        sess.loggedIn = true
        sess.userEmail = req.body.email
        console.log(sess)
        return res.redirect('/profile')

    } else {
        console.log('Sub Pages- Dashboard - Error User');

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

    if (sess.loggedIn) {
        res.render('profile', {
            title: 'PROFILE',
            message: 'Profile is authenicated.',
            session: sess
        })
        console.log('Sub Pages - Profile Signed In');
        console.log(sess)

    } else {
        res.render('404', {
            title: '404',
            message: 'Profile is private sorry.',
            session: sess
        })
    }

    res.end()


})
router.get("/logout", (req, res) => {
    console.log('Sub Pages- Dashboard - logout');

    sess = req.session
    sess.loggedIn = false
    res.end()

})
router.get("/overview", (req, res) => {
    console.log('Sub Pages - Overview');
    sess = req.session
    res.render('overview', {
        title: 'OVERVIEW',
        message: 'Overview is here after authenication.',
        session: sess
    })
})



router.get("/index", (req, res) => {
    sess = req.session
    if (sess.loggedIn) {
        res.render('index', {
            title: 'HOME',
            message: `Welcome signed in ${sess.userEmail}!`,
            session: sess
        })
    } else {
        res.render('index', {
            title: 'HOME',
            message: 'Welcome!',
            session: sess
        })
    }
})
router.get('/', function (req, res) {
    sess = req.session
    if (sess.loggedIn) {
        res.render('index', {
            title: 'HOME',
            message: 'Welcome signed in User!',
            session: sess
        })
    } else {

        res.render('index', {
            title: 'HOME',
            message: 'Welcome!',
            session: sess
        })
    }
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