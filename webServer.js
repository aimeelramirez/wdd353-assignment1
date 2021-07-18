
const https = require('https');
const fs = require('fs')
const options = require('./config')
const path = require('path');
// const url = require('url')


//set port
const port = 8080

//ssl
https
    .createServer(options, (req, res) => {

        console.log(`Your server is running on port ${port}`);
        // let parsed = url.parseQueryString(req.url)
        // let filename = path.parse(req.url)  
        // console.log(__dirname)
        let filenameUrl = path.join(req.url)
        let filename = path.parse(filenameUrl)

        // console.log(filename)
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
                    // console.log(mimeTypes.hasOwnProperty(ext))
                    if (mimeTypes.hasOwnProperty(ext)) {
                        // console.log(page)
                        res.writeHead(200, { 'Content-Type': ext })
                        //get the script to read correctly
                        if (f === 'public/js/scripts.js') {
                            var writeScript = fs.readFileSync(f);
                            res.write(writeScript);
                        } else if (f !== 'public/js/scripts.js') {

                            //i want the styles to load 
                            var writeStyles = fs.readFileSync('public/css/styles.css')
                            res.write('<style>' + writeStyles + '</style>')
                            //i want the files to be written if not on page
                            var writeF = fs.readFileSync(f, 'utf8')
                            res.write(writeF);
                            //write localhost
                            res.write('<base href="https://localhost:8080/">')

                        }
                        // console.log(data)
                        res.end();


                    }
                }
            }))
        }

    })
    .listen(port);