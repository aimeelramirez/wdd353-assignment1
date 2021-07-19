const https = require('https');
const fs = require('fs')
const options = require('./config')
const path = require('path');
//set port
const port = 8080
let sendUsers = `let users = [
    { "0": "ales" },
    { "1": "mila" },
    { "2": "gilbert" },
    { "3": "gilbert jr." },
    { "4": "chris" },
    { "5": "kristine" },
    { "6": "aimee" }
]`

console.log(`Starting up server.... https://localhost:${port}`)
//ssl
https
    .createServer(options, (req, res) => {
        console.log(`Your server is running on port ${port}`);
        let filenameUrl = path.join(req.url)
        let filename = path.parse(filenameUrl)

        filen = filename.name === "" ? "index" : filename.name;
        ext = filename.ext === "" ? ".html" : filename.ext;
        dir = filename.dir === "/" ? "" : filename.dir + "/";
        page = filename.name === "" ? "index.html" : filename.name;

        f = (dir + filen + ext).replace("/", "");
        let mimeTypes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "text/javascript",
            ".png": "image/png",
            ".jpg": "image/jpg",
            ".ico": "image/ico"
        }
        if (f) {
            fs.readFile(f, ((err, data) => {
                if (page) {
                    if (mimeTypes.hasOwnProperty(ext)) {
                        res.writeHead(200, {
                            'Content-Type': ext
                        })
                        if (f === 'public/js/scripts.js') {
                            //get the script to read correctly
                            var writeScript = fs.readFileSync(f);
                            res.write(writeScript);
                            res.write(sendUsers)
                            res.write('\nfor(let i = 0; i < users.length; i++){'
                                + '\n for(const [key, value] of Object.entries(users[i])){' +
                                '\ndocument.querySelector("#list-users").innerHTML +="<li>"+ `${parseInt(key)}: ${value}` +"</li>";' +
                                ' \n//console.log(`${key}: ${value}`); \n } '
                                + '}')
                        } else if (f !== 'public/js/scripts.js') {

                            if (f === 'public/css/styles.css') {
                                //i want the styles to load 
                                var writeStyles = fs.readFileSync('public/css/styles.css')
                                res.write(writeStyles)

                            } else {
                                var writeStyles = fs.readFileSync('public/css/styles.css')
                                res.write('<style>' + writeStyles + '</style>');
                                //i want the files to be written if not on page
                                var writeF = fs.readFileSync(f, 'utf8')
                                res.write(writeF)

                            }
                        }
                        res.end();
                    }
                }
            }))
        }
    })
    .listen(port);