const jwt = require("jsonwebtoken")


let sess;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.")
}
//get all

exports.userBoard = (req, res) => {
    res.status(200).send({
        message: "Hello from Users endpoint! You are authenicated.",
    })
}



// exports.signin = (req, res) => {
//     console.log("sign in : ", JSON.stringify(req.body))

//     var token = jwt.sign({ id: req.body.email }, 'aimee-secret-key', {
//         expiresIn: 86400, // 24 hours
//     })


//     res.status(200).send({
//         email: req.body.email,
//         password: req.body.password,
//         accessToken: token,
//     })
// }

exports.login = (req, res) => {
    console.log("login: ", JSON.stringify(req.body))
    sess = req.session
    let errors = [];
    console.log(typeof req.body)
    for (let [key, value] of Object.entries(req.body)) {
        // console.log(`${key}: ${value}`);
        if (value === "") {
            errors.push(`${key} is required.`)
        }
        let regxEmail = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email);
        if (regxEmail) {
            errors.push("Email is not valid.")
        }
        let regxPassword = !/^[a-zA-Z]\w{3,14}$/.test(req.body.password)
        if (regxPassword) {
            errors.push("Password is not valid.")

        }


        return errors

    }


}

// exports.getLogin = (req, res, next) => {
//     res.render('index', {
//         title: 'HOME',
//         message: errors,
//         session: sess

//     })
// }
// exports.postLogin = (req, res, next) => {
//     // router.post("/login", (req, res, next) => {
//     //get auth
//     sess = req.session;
//     let errors = login(req, res)
//     if (errors.length <= 0) {
//         console.log("no errors")

//     }

//     return errors
//     // res.redirect('/profile')
//     // })
// }