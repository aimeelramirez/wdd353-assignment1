//Only Mike@aol.com with password abc123 can navigate to the profile page!


"use strict";

window.onload = () => {
    console.log("auth")
    /* QUERIES */
    // window.location.href = window.location.href

    /* START ids on input and textarea */
    let authEmail = document.getElementById("inputEmail4");
    let authPassword = document.getElementById("inputPassword4");

    /* Inside your login method create a conditional for only
    Email:Mike@aol.com
    Password:abc123
     */
    authEmail.value = "Mike@aol.com";
    authPassword.value = "abc123"

    let loginButton = document.querySelector("#login");
    //get the button disabled before submit

    let store = [];
    const successBanner = (event, store) => {
        event.preventDefault()
        console.log(store)
        fetch('https://localhost:8080/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': '*/* ',

                'Content-Type': 'application/json',
            },
            body: JSON.stringify(store)

        }).then(response => {
            return response.json()
        }).then((data) => {
            console.log(data)
        })

        // document.querySelector('h2').innerHTML = "Successfully logged in!"
        document.getElementById('notify').innerHTML = `<h3> Checking email... </h3>`
        document.getElementById('notify').innerHTML += `<li>` + JSON.stringify(store.email) + '</li>'

    }

    /* START submitForm */
    const submitForm = (event) => {
        // to stop it from loading
        event.preventDefault();

        // ** Create validation errors for every single input.
        let boolPassword = false;
        let boolEmail = false;

        let notify = "Sorry, please enter the right format!!"

        // let validatePhone = () => {
        //     //so this is saying  /^+ numbers 0-9 on {match number length exactly} [-. ] match char. exactly$/
        //     let regx = /^\+([0-9]{1})\(([0-9]{3})\)([0-9]{3})[-. ]([0-9]{4})$/;
        //     if (!phone.value.match(regx)) {
        //         addElement(notify, phone)
        //     } else {
        //         boolPhone = true;
        //         return phone.value;
        //     }
        // };
        let validateEmail = () => {
            var emailID = authEmail.value
            let atpos = emailID.indexOf("@");
            let dotpos = emailID.lastIndexOf(".");

            if (atpos < 1 || dotpos - atpos < 2) {
                addElement(notify, authEmail)
                boolEmail = false;
            } else {
                boolEmail = true;
            }
        };
        let validateStringNaN = (el) => {
            let checkNaN = isNaN(el);
            // console.log(checkNaN + ":" + el.item);
            if (checkNaN != true) {

                addElement(notify, el)
            } else {

                if (el.value === age.value) {
                    boolAge = true;
                }

                return el;
            }
        };
        // let validateStringNum = (el) => {
        //     let check = parseFloat(el.value)
        //     // console.log(check)
        //     let checkNaN = isNaN(check);
        //     if (checkNaN) {
        //         addElement(notify, el)
        //     } else {
        //         if (el.value === zip.value) {
        //             // console.log(boolZip + ":" + el.value);
        //             return boolZip = true;
        //         }

        //         return el;
        //     }
        // };
        // let validateMessage = () => {
        //     if (message.value.length >= 10) {
        //         boolMessage = true;
        //         return message.value;
        //     } else {
        //         addElement(notify, message)

        //     }
        // };


        function addElement(notify, type) {
            // create a new div element
            const newDiv = document.createElement("div");
            newDiv.id = "notify"
            newDiv.className = "alert-warning"
            newDiv.innerHTML = notify
            type.focus();
            const currentDiv = document.getElementById(type.id);
            currentDiv.insertAdjacentElement('beforebegin', newDiv);
        }
        //mapping the values getting items in being read.

        let validateString = () => {
            if (document.getElementById('notify') !== null) {
                let getClass = document.querySelectorAll('.alert-warning');
                for (let i = 0; i < getClass.length; i++) {
                    getClass[i].remove()
                }

            }
            if (authEmail.value == "") {
                addElement(notify, authEmail)

            } else {
                validateEmail()
            }
            if (authPassword.value == "") {
                addElement(notify, authPassword)
            }
            else {
                boolPassword = true
            }


        };
        if (boolPassword == false) {
            validateString()

        }
        if (boolEmail == true
            && boolPassword == true
        ) {
            console.log(boolEmail)

            let data = {
                email: authEmail.value,
                password: authPassword.value

            }

            store.push(data)
            console.log(store)
            successBanner(event, data)
        }
    }
    loginButton.addEventListener("click", (e) => {
        e.preventDefault()
        submitForm(e)
    }, false);

    document.getElementById('logout').addEventListener("click", (e) => {
        e.preventDefault()
        fetch('https://localhost:8080/logout').then(response => {
            response.json()
        })
        document.querySelector('h2').innerHTML = 'Logged out! Please sign in on dashboard.'
        document.getElementById('notify').innerHTML = ""

    }, false);
};
