
const fs = require('fs')
//ten
var http = require('http');


console.log('api')
fs.readFile('public/js/myfile.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data + "\n")
});
var name = "\nParagraph 1\n";
console.log(name);

// Let's make it sync
async function returnTrue() {
    var name = "Paragraph 2\n";
    let promise = new Promise((resolve, reject) => {
        fs.readFile('public/js/myfile.txt', 'utf-8', (err, data) => {
            if (err) throw err;
            resolve(data + "\n")
        });
    });
    let result = await promise;
    console.log(result)
    console.log(name);
}
returnTrue();

//nine
let str = "";

// //one
// function myname() {
//     //eight
//     return "Here is my IP address"
// }
//eight
let nameThis = async () => {
    console.log("Here is my IP address")
}
//two
async function callHttpbin() {
    //two on reject
    let promise = new Promise((resolve, reject) => {
        http.get(
            'http://httpbin.org/ip',
            function (response) {
                response.setEncoding('utf8');
                response.on('data', function (data) {
                    str += data;
                });
                response.on('end', function () {
                    var result = JSON.parse(str);
                    if (result) {
                        //three
                        myips = result.origin;
                        //  console.log(Promise.resolve(myips))
                        return resolve(myips)
                    } else {
                        //two
                        reject(new Error('not found'));
                    }

                })
            }
        )
    })

    let result = await promise
    //four
    return result;
}
// five
async function executeAsyncTask() {
    const valueB = nameThis();
    const valueA = await callHttpbin()
    let message = (valueB + ': ' + valueA)
    console.log(message)
    //six
}
//seven
executeAsyncTask()