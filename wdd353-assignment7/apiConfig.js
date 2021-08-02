const request = require('request')

module.exports = {
    /*
    ** This method returns a promise
    ** which gets resolved or rejected based
    ** on the result from the API
    */
    make_API_call: function (url, req) {

        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
                body = { body: req.body }
                if (err) reject(err)
                console.log('api body: ', body)
                if (body !== null) {

                    resolve(body)
                } else {
                    console.log('error')
                }
            });
        })
    }
}

