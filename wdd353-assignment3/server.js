




const https = require('https');
const fs = require('fs')
const options = require('./config')
const express = require("express");
const path = require('path');
const url = require('url');
// let bodyParser = require('body-parser');
const router = new express.Router();

//get api
const app = express();

//set port
const port = 8080
app.set("port", port);

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
console.log(__dirname);

// // get the view pages of htmls
const viewsPath = path.join(__dirname, './views');
const publicPath = path.join(__dirname, './public');
//set views
app.set('views', viewsPath);
app.set('view engine', 'ejs');


//get use views
app.use(express.static(viewsPath));
//get public path
app.use(express.static(publicPath));
//gets the images from public to call
app.use(express.static('public/img'));
//gets the styles to be dynamic
app.use(express.static('public/css'));
//gets  the js to be dynamic
app.use(express.static('public/js'));


var users = [
    { name: 'somebody', email: 'somebody@domain.com' },
    { name: 'ales', email: 'ales@domain.com' },
    { name: 'aimee', email: 'aimee@domain.com' }
];


//ssl
// https
//     .createServer(options, (req, res) => {

//         console.log(`Your server is running on port ${port}`);



//     }).listen(port)
app.use('/', router)




router.get("/", (req, res) => {
    res.render("index", {
        title: '404',
        name: 'Aimee Ramirez',
        errorMessage: 'Page not found.'
    })
})
app.listen(port, () => {
    console.log(`server is listening at post ${port}.`)
})