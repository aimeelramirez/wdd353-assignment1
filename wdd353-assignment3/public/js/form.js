"use strict";

window.onload = () => {
    console.log("form")
    let boolMode = false;

    /* All Insructions are in "**" */
    /** 
  "Change the first paragraph to match your theme. 
    Replace the <p> tag's content without adding a 
    CLASS or ID to the tag itself.
    No Lorem Ipsum, use real content!""
  //i didn't add a class or id but i did add a button on adding a script for fontawesome on success */

    //** Change the first paragraph to match your theme. Replace the <p> tag's content without adding a CLASS or ID to the tag itself. No Lorem Ipsum, use real content!
    let banner = document.querySelector("#notify");
    // banner.innerHTML = "Get in touch:";

    /* QUERIES */
    let background = document.querySelector("html");
    let backgroundBody = document.querySelector("body");

    let arrayImages = ["", ""];


    // let getDarkMode = (background.style.backgroundImage =
    //   `url("` + arrayImages[1] + `")`);

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
    // ---- For testing purposes ---- //
    // Extra to replace icon on class error on getting success checkmark//
    const include = (file) => {
        let script = document.createElement("script");
        script.src = file;
        //script.crossorigin = "anonymous";
        script.defer = true;
        getScript(script);
    };
    const getScript = (script) => {
        let htmlScript = document.querySelector("body");
        htmlScript.insertAdjacentElement("beforeend", script);
    };
    include("https://kit.fontawesome.com/68ebcc4019.js");
    // Extra to replace icon on class error on getting success checkmark//

    /* START creating dark mode or light mode */
    let createButtonSwitch = document.createElement("a");
    background.insertAdjacentElement("beforeend", createButtonSwitch);
    //center buttons and text
    background.style.cssText = "text-align:center";
    //on html to match body
    backgroundBody.style.backgroundImage = `url("` + arrayImages[0] + `")`;
    backgroundBody.style.transition = "2s";
    //on html to match body
    background.style.backgroundImage = `url("` + arrayImages[0] + `")`;
    background.style.transition = "2s";

    createButtonSwitch.innerHTML += `<i class="fas fa-moon"> </i><p>Switch to Dark Mode</p>`;
    createButtonSwitch.style.cssText =
        "cursor:pointer; font-size:1.5rem; color:black;";

    /* END Change the background Image  dark : light*/

    // let form = document.querySelector("form");
    //let paragraphs = form.querySelectorAll("p");
    let form1 = document.querySelector("form");
    let submitButton = document.querySelector("button[type='submit']");

    let inputValidate = document.querySelectorAll("input");

    let formValidate = form1.querySelectorAll("textarea");
    let formRadio = form1.querySelectorAll("input[type='radio']");    //get the button disabled before submit
    //submitButton.setAttribute("class", "disabled");
    //submitButton.disabled = true;
    let store = [];
    //submitButton.setAttribute("disabled", true);
    // let getAllIds = document.querySelector('form')
    // for (let i in getAllIds.elements) {
    //     let checknum = parseInt(i)
    //     if (checknum >= 0) {
    //         console.log(i + ")" + getAllIds[i].id)
    //         let id = getAllIds[i].id
    //         let value = getAllIds[i].value

    //     }

    //     store.push(data)
    // }
    // console.log(store)
    const successBanner = (event, store) => {
        event.preventDefault()
        console.log(store)
        localStorage.setItem('data', JSON.stringify(store))
        fetch('https://localhost:8080/data', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: JSON.stringify({ "data": store })

        }).then(response => {
            console.log(response.status)
            return response.status
        }).catch((error) => {
            console.error('Error:', error);
        });


        /* START thank you screen not banner */
        // let newScreen = () => {
        //     setTimeout(() => {
        //         /* START Change the background Image */
        //         let arrayImages = [
        //             {
        //                 imageSrc: "images/lighthouse.jpg",
        //                 alt: "lighthouse over the bay during daytime.",
        //             },
        //             {
        //                 imageSrc: "images/trail.jpg",
        //                 alt:
        //                     "a trail by a lake during autumn season in hilly pastures.",
        //             },
        //             {
        //                 imageSrc: "images/trees.jpg",
        //                 alt: "bunch of tall bald trees in an open field.",
        //             },
        //             {
        //                 imageSrc: "images/waterfall.jpg",
        //                 alt: "waterfalls by green pastures.",
        //             },
        //             {
        //                 imageSrc: "images/winter.jpg",
        //                 alt: "snow covered mountains in the winter.",
        //             },
        //         ];

        //         //get images to background with transition
        //         let x = 0;
        //         //looks cleaner with form to be replaced than on body if to get a new screen
        //         let body = document.querySelector("#images");
        //         body.style.cssText = "text-align:center";
        //         let message = `<p><h2> Thank You!<hr/>We will contact you shortly within 2-3 business days!</h2><hr/><i class="fas fa-arrow-circle-left"> Go Back</i><br/> <div>Thanks again!</div></p>`;
        //         body.innerHTML = message;
        //         //get back button
        //         let getBack = document.querySelector("i");
        //         getBack.style.cssText =
        //             "color:black; cursor:pointer; font-size:1.5rem;";
        //         /* EVENTS last screen*/
        //         getBack.addEventListener("click", () => {
        //             console.log("click");
        //             location.reload();
        //         });
        //         /* EVENTS last screen*/

        //         //get first image to set to get
        //         let getImgTransition = document.querySelector("div");
        //         getImgTransition.innerHTML = ` <img id="images"><br/> Cheers!`;

        //         let getImage = () => {
        //             //get a new screen
        //             let getImg = document.getElementById("images");
        //             getImg.src = arrayImages[x].imageSrc;
        //             getImg.alt = arrayImages[x].alt;
        //             x++;
        //             //fixing to make it readable
        //             if (x >= arrayImages.length) {
        //                 x = 0;
        //             }
        //         };
        //         //start the loop
        //         let startImageLoop = () => {
        //             setInterval(() => {
        //                 getImage();
        //             }, 2000);
        //         };
        //         startImageLoop();
        //     }, 3000);
        // };
        // newScreen();
        // /* END thank you screen not banner */
    }

    /* START submitForm */
    const submitForm = (event) => {
        // to stop it from loading
        event.preventDefault();

        /* START form elements on key to store */
        // let storeEl = form.elements;
        //console.log(storeEl);

        //push the items into the store[]
        // for (let key in storeEl) {
        //     store.push({
        //         id: key,
        //         item: storeEl[key].value,
        //     });
        //     // console.log("check: ", store);
        // }

        /* END form elements on key to store */



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
            let checkNaN = isNaN(el);
            if (!checkNaN) {
                addElement(notify, el)
            } else {

                if (el.value === zip.value) {
                    console.log(boolZip + ":" + el.value);

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

            // and give it some content
            // const newContent = document.createTextNode(notify);

            // // add the text node to the newly created div
            // newDiv.appendChild(newContent);

            // add the newly created element and its content into the DOM
            const currentDiv = document.getElementById(type.id);
            currentDiv.insertAdjacentElement('beforebegin', newDiv);
        }
        //mapping the values getting items in being read.

        let validateString = () => {
            if (document.getElementById('notify') !== null) {
                document.getElementById('notify').remove()

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

                name: {
                    firstname: firstname.value,
                    lastname: lastname.value
                },
                email: email.value,
                address: {
                    city: city.value,
                    zip: zip.value
                },
                age: age.value,
                subscribeNews: subscribeNews.value,
                phone: phone.value,
                message: message.value

            }

            store.push(data)

            console.log(store)
            successBanner(event, store)
        }



    }


    // console.log(store)
    // on all forms validated = success banner


    let getSwitch = () => {
        //get light image on light mode
        let lightImage = () => {
            boolMode = false;
            backgroundBody.style.backgroundImage = `url("` + arrayImages[0] + `")`;
            backgroundBody.style.transition = "2s";
            background.style.backgroundImage = `url("` + arrayImages[0] + `")`;
            background.style.transition = "2s";

            createButtonSwitch.innerHTML = `<i class="fas fa-moon"></i><p>Switch to Dark Mode</p>`;
            createButtonSwitch.style.backgroundImage =
                `url("` + arrayImages[0] + `")`;
            createButtonSwitch.style.cssText =
                "cursor:pointer; font-size:1.5rem; color:black;";
        };

        //get dark image on dark mode
        let darkImage = () => {
            boolMode = true;
            backgroundBody.style.backgroundImage = `url("` + arrayImages[1] + `")`;
            backgroundBody.style.transition = "2s";
            background.style.backgroundImage = `url("` + arrayImages[1] + `")`;
            background.style.transition = "2s";

            createButtonSwitch.innerHTML = `<i class="fas fa-sun"></i><p>Switch to Light Mode</p>`;
            createButtonSwitch.style.cssText =
                "color:white; cursor:pointer; font-size:1.5rem;";
            createButtonSwitch.style.transition = "2s";
        };
        if (boolMode == false) {
            //console.log(boolMode);
            darkImage();
            //alert("click on browser on dark mode not on mobile");
        } else {
            // console.log(boolMode);
            lightImage();
            //alert("click on browser on light mode not on mobile");
        }
    };
    submitButton.addEventListener("click", (e) => {
        e.preventDefault()
        submitForm(e)
    }, false);
    /* END submitForm */
    setInterval(() => {

        for (let i = 0; i < inputValidate.length; i++) {
            // if (inputValidate[i].value != "" ) {
            // let args = [...inputValidate];
            // console.log(args[i].value);
            //hardcoded...
            if (
                inputValidate[0].value != "" &&
                inputValidate[1].value != "" &&
                inputValidate[2].value != "" &&
                formValidate[0].value != ""
            ) {
                //submitButton.removeAttribute("class", "disabled");
                // submitButton.removeAttribute("disabled", true);

                //boolButton = true;
                //submitButton.disabled = false;
                /* EVENTS on submit button */

            } else {
                submitButton.setAttribute("class", "disabled");

                /* EVENTS on submit button */
                // addEventListener("submit", submitForm);
                // e.preventDefault();
            }
        }
        //}
    }, 1000);
    /* EVENTS first screen*/
    //addEventListener("submit", submitForm);

    createButtonSwitch.addEventListener("click", (e) => {
        e.preventDefault()
        getSwitch()
    });

    /* EVENTS first screen*/

};
