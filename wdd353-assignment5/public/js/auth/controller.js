



let sess;

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
