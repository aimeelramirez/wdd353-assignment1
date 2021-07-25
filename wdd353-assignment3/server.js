

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

const crypto = require('crypto');



// // Using the factory defaults.
// crypto.scrypt('password', 'salt', 64, (err, derivedKey) => {
//     if (err) throw err;
//     console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
// });
// // Using a custom N parameter. Must be a power of two.
// crypto.scrypt('password', 'salt', 64, { N: 1024 }, (err, derivedKey) => {
//     if (err) throw err;
//     console.log(derivedKey.toString('hex'));  // '3745e48...aa39b34'
//     crypto.privateDecrypt(derivedKey.toString('hex'))
// });

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
            let encryptedText = Buffer.from(derivedKey, 'hex');
            let test = derivedKey.toString('hex')
            console.log(encryptedText)
            console.log(test)
            resolve(key == derivedKey.toString('hex'))
        });
    })
}

async function run(input) {
    const password1 = await hash(input)
    // console.log(password1)
    //  const password2 = await hash(input)

    // console.log("password1 >", await verify(input, password1));

    let data = JSON.stringify(password1).toString()

    fs.writeFile("public/js/auth/verify.txt", data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents on password:");
            console.log(fs.readFileSync("public/js/auth/auth.txt", "utf8"));
        }
    });

}
const algorithm = 'aes-256-cbc-hmac-sha256';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let data = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    console.log(data)
    fs.writeFile("public/js/auth/auth.txt", JSON.stringify(data), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents on password:");
            console.log(fs.readFileSync("public/js/auth/auth.txt", "utf8"));
        }
    });
    return data
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


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


router.get("/auth", function (req, res) {
    let getCheck = async () => {

        let promise2 = new Promise((resolve, reject) => {
            fs.readFile('public/js/auth/verify.txt', 'utf-8', (err, data) => {
                if (err) throw err;
                resolve(data + "\n")
            });
        });
        let result2 = await promise2;


        let promise1 = new Promise((resolve, reject) => {
            fs.readFile('public/js/auth/auth.txt', 'utf-8', (err, data) => {
                if (err) throw err;
                resolve(data + "\n")
            });
        });
        let result1 = await promise1;

        console.log(result1)
        // let read = decrypt(JSON.parse(result1))
        // console.log("read: ", read)
        // console.log("password", await verify(read, JSON.parse(result2)));

        // console.log("result == result2", result == result2);
    }

    getCheck()
    res.render('profile.html', {
        title: 'AUTH',
        message: "User has been authenticated."
    })
    res.end();

})
router.post("/auth", function (req, res) {
    console.log(req.body.password)
    let getdata = encrypt(req.body.password)
    let data = JSON.stringify(getdata).toString()
    fs.writeFile("public/js/auth/auth.txt", data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents on password:");
            console.log(fs.readFileSync("public/js/auth/auth.txt", "utf8"));
        }
    });
    run(JSON.stringify(req.body.password))
    // var hw1 = encrypt(req.body.password)

    // console.log(hw)
    // console.log(hw1)

    // decrypt(hw)
    // decrypt(hw1)

    res.render('profile.html', {
        title: 'AUTH',
        message: "User has been authenticated."
    })
    res.end();

})
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