const jwt = require("jsonwebtoken")


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.")
}
//get all

exports.userBoard = (req, res) => {
    res.status(200).send({
        message: "Hello from Users endpoint! You are authenicated.",
    })
}



exports.signin = (req, res) => {
    console.log("sign in : ", JSON.stringify(req.body))

    var token = jwt.sign({ id: req.body.email }, 'aimee-secret-key', {
        expiresIn: 86400, // 24 hours
    })


    res.status(200).send({
        email: req.body.email,
        password: req.body.password,
        accessToken: token,
    })
}

exports.signup = (req, res) => {
    console.log("sign up: ", JSON.stringify(req.body))

    res.status(200).send({
        email: req.body.email,
        password: req.body.password,

    })
}