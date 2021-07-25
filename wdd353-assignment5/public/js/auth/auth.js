//Only Mike@aol.com with password abc123 can navigate to the profile page!


"use strict";

window.onload = () => {
    console.log("auth")
    /* QUERIES */

    /* START ids on input and textarea */
    let authEmail = document.getElementById("inputEmail4");
    let authPassword = document.getElementById("inputPassword4");


    authEmail.value = "test@gmail.com";
    authPassword.value = "abc123"

    let submitButton = document.querySelector("#signup");
    //get the button disabled before submit

    let store = [];
    const successBanner = (event, store) => {
        event.preventDefault()
        console.log(store)
        const formData = new FormData();

        // localStorage.setItem('data', JSON.stringify(store))
        // let dataArray = [
        //     authEmail.value,
        //     authPassword.value
        // ]
        fetch('https://localhost:8080/auth', {
            method: 'POST', // or 'PUT'
            // headers: {
            //     'Accept': '*/*',
            //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            // },
            headers: {
                'Accept': '*/*',

                'Content-Type': 'application/json',
            },
            body: JSON.stringify(store)

        }).then(response => {
            response.json().then(data => {
                alert(data)
                document.getElementById('list-users').innerHTML += `<li>` + JSON.stringify(data) + '</li>'
            })
        })
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
            var emailID = email.value
            let atpos = emailID.indexOf("@");
            let dotpos = emailID.lastIndexOf(".");

            if (atpos < 1 || dotpos - atpos < 2) {
                addElement(notify, email)
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
                boolEmail = true
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
    submitButton.addEventListener("click", (e) => {
        e.preventDefault()
        submitForm(e)
    }, false);


};
