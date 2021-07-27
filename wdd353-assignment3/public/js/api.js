
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
    // return result
}
returnTrue();

//nine
let str = "";
let strName = "";

// //one
// function myname() {
//     //eight
//     return "Here is my IP address"
// }
//eight
async function myname() {
    //return a message //
    let message = ("Here is my IP address " + strName)
    return message
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
    const valueA = await callHttpbin()
    strName += valueA;
    //ten pass it in the myname(valueA) or to store it string globally like above
    const valueB = await myname();
    //, from :  on output  //nine
    let message = (valueB + ', ' + valueA)
    console.log(message)
    //six
}
//seven
executeAsyncTask()

//// Output Here is my IP address 149.24.160.1, 149.24.160.1
//Here is my IP address 100.40.69.123, 100.40.69.123

