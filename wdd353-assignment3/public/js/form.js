"use strict";

window.onload = () => {
    console.log("form")
    /* QUERIES */

    /* START ids on input and textarea */
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let zip = document.getElementById("zip");
    let city = document.getElementById("city");
    let age = document.getElementById("age");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let subscribeNews = document.getElementById('subscribeNews')
    phone.placeholder = "+1(123)123-1234";
    let message = document.getElementById("message");
    message.placeholder = "required for messages longer than 10 characters.";
    /* END ids on input and textarea */
    // ---- For testing purposes ---- //
    firstname.value = "aimee";
    lastname.value = "dev";
    email.value = "test@gmail.com";
    phone.value = "+1(123)123-1234";
    message.value = "required for messages longer than 10 characters.";

    let submitButton = document.querySelector("button[type='submit']");
    //get the button disabled before submit

    let store = [];
    const successBanner = (event, store) => {
        event.preventDefault()
        console.log(store)
        localStorage.setItem('data', JSON.stringify(store))
        let dataArray = [
            firstname.value,
            lastname.value,
            email.value,
            city.value,
            zip.value,
            age.value,
            subscribeNews.value,
            phone.value,
            message.value
        ]
        fetch('https://34.205.81.206:8080/data', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: JSON.stringify(dataArray)

        }).then(response => {
            console.log(response.status)
            return response.status
        }).catch((error) => {
            console.error('Error:', error);
        });

    }

    /* START submitForm */
    const submitForm = (event) => {
        // to stop it from loading
        event.preventDefault();

        // ** Create validation errors for every single input.
        let boolPhone = false;
        let boolEmail = false;
        let boolLastname = false;
        let boolMessage = false;
        let boolFirstname = false;
        let boolZip = false;
        let boolCity = false;
        let boolAge = false;
        let notify = "Sorry, please enter the right format!!"

        let validatePhone = () => {
            //so this is saying  /^+ numbers 0-9 on {match number length exactly} [-. ] match char. exactly$/
            let regx = /^\+([0-9]{1})\(([0-9]{3})\)([0-9]{3})[-. ]([0-9]{4})$/;
            if (!phone.value.match(regx)) {
                addElement(notify, phone)
            } else {
                boolPhone = true;
                return phone.value;
            }
        };
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
        let validateStringNum = (el) => {
            let check = parseFloat(el.value)
            // console.log(check)
            let checkNaN = isNaN(check);
            if (checkNaN) {
                addElement(notify, el)
            } else {
                if (el.value === zip.value) {
                    // console.log(boolZip + ":" + el.value);
                    return boolZip = true;
                }

                return el;
            }
        };
        let validateMessage = () => {
            if (message.value.length >= 10) {
                boolMessage = true;
                return message.value;
            } else {
                addElement(notify, message)

            }
        };


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
            // console.log(`Sorry input can not be empty`);
            if (firstname.value == "") {
                addElement(notify, firstname)

            } else {
                boolFirstname = true
                // boolFirstname = true
            }
            if (lastname.value == "") {
                addElement(notify, lastname)
            }
            else {
                boolLastname = true
            }
            if (zip.value == "") {
                addElement(notify, zip)


            } else {
                validateStringNum(zip)
            }
            if (city.value == "") {
                addElement(notify, city)

            } else {
                boolCity = true
            }
            if (email.value == "") {
                addElement(notify, email)

            } else {
                validateEmail()
            }
            if (age.value == "") {
                addElement(notify, age)

            } else {
                validateStringNaN(age)
            }
            if (phone.value == "") {
                addElement(notify, phone)

            } else {
                validatePhone()
            }
            if (message.value == "") {
                addElement(notify, message)

            } else {
                validateMessage()
            }
            // banner.innerHTML = `<p class='error' style='content:"\\f071";'> Sorry, please enter the right format</p>`;

        };
        if (boolFirstname == false) {
            validateString()

        }
        if (boolFirstname == true
            && boolLastname == true &&
            boolMessage === true &&
            boolPhone === true &&
            boolZip == true &&
            boolEmail === true &&
            boolCity == true
        ) {
            console.log(boolFirstname)

            let data = {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                city: city.value,
                zip: zip.value,
                age: age.value,
                subscribeNews: subscribeNews.value,
                phone: phone.value,
                message: message.value

            }

            store.push(data)
            console.log(store)
            successBanner(event)
        }
    }
    submitButton.addEventListener("click", (e) => {
        e.preventDefault()
        submitForm(e)
    }, false);
    fetch('https://34.205.81.206:8080/js/data.txt')
        .then(response => response.json())
        .then(data => {
            let dataRead = []
            for (const [key, value] of Object.entries(data)) {
                // console.log(key);
                // let getNewDiv = document.createElement('li')
                // let splitList = key.split().join()
                dataRead.push(key)
                console.log(dataRead.length)
                document.getElementById('notify').innerHTML += `<li>` + dataRead + '</li>'
            }



        })


};
