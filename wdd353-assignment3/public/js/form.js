"use strict";

window.onload = () => {
    let boolMode = false;

    /* All Insructions are in "**" */
    /** 
  "Change the first paragraph to match your theme. 
    Replace the <p> tag's content without adding a 
    CLASS or ID to the tag itself.
    No Lorem Ipsum, use real content!""
  //i didn't add a class or id but i did add a button on adding a script for fontawesome on success */

    //** Change the first paragraph to match your theme. Replace the <p> tag's content without adding a CLASS or ID to the tag itself. No Lorem Ipsum, use real content!
    let banner = document.querySelector("p");
    banner.innerHTML = "Get in touch:";

    /* QUERIES */
    let background = document.querySelector("html");
    let backgroundBody = document.querySelector("body");

    let arrayImages = ["", ""];


    // let getDarkMode = (background.style.backgroundImage =
    //   `url("` + arrayImages[1] + `")`);

    /* START ids on input and textarea */
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    phone.placeholder = "+1(123)123-1234";
    let message = document.getElementById("message");
    message.placeholder = "required for messages longer than 10 characters.";
    /* END ids on input and textarea */
    // ---- For testing purposes ---- //
    // name.value = "aimee";
    // email.value = "test@gmail.com";
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

    let form = document.querySelector("form");
    //let paragraphs = form.querySelectorAll("p");
    let form1 = document.querySelector("form");
    let submitButton = document.querySelector("button");
    let inputValidate = form1.querySelectorAll("input");
    let formValidate = form1.querySelectorAll("textarea");
    //get the button disabled before submit
    submitButton.setAttribute("class", "disabled");
    //submitButton.disabled = true;

    submitButton.setAttribute("disabled", true);

    /* START submitForm */
    const submitForm = (e) => {
        // to stop it from loading
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:8080/404',
            data: {
                firstName: 'aimee',
                lastName: 'ramirez'
            }
        })
            .then(function (res) {
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
        /* START form elements on key to store */
        let storeEl = form.elements;
        //console.log(storeEl);
        let store = [];
        //push the items into the store[]
        for (let key in storeEl) {
            store.push({
                id: key,
                item: storeEl[key].value,
            });
            // console.log("check: ", store);
        }
        /* END form elements on key to store */

        // ** Create validation errors for every single input.
        let boolPhone = false;
        let boolEmail = false;
        let boolName = false;
        let boolMessage = false;

        let validatePhone = (el) => {
            //so this is saying  /^+ numbers 0-9 on {match number length exactly} [-. ] match char. exactly$/
            let regx = /^\+([0-9]{1})\(([0-9]{3})\)([0-9]{3})[-. ]([0-9]{4})$/;
            if (!el.item.match(regx)) {
                banner.innerHTML = `<p class='error' style='content:"\\f071";'> Try +1(123)123-1234 to submit the form.</p>`;
            } else {
                boolPhone = true;
                return el;
            }
        };
        //mapping the values getting items in being read.
        // making a reusable format on string empty
        let validateString = (el) => {
            //console.log(el.id + ":" + el.item);
            //check if empty
            if (el.item == "") {
                // console.log(`Sorry input can not be empty`);
                if (name.value == el.item) {
                    banner.innerHTML = `<p class='error' style='content:"\\f071";'> Sorry, please enter the right name format</p>`;
                    name.focus();
                } else if (email.value == el.item) {
                    banner.innerHTML = `<p class='error' style='content:"\\f071";'> Sorry, please enter the right email format</p>`;
                    email.focus();
                } else if (phone.value == el.item) {
                    banner.innerHTML = `<p class='error' style='content:"\\f071";'> Sorry, please enter the right phone format</p>`;
                    phone.focus();
                } else if (message.value == el.item) {
                    banner.innerHTML = `<p class='error' style='content:"\\f071";'> Sorry, please enter the right message format</p>`;
                    message.focus();
                }
                return el;
            }
        };
        let validateEmail = (el) => {
            var emailID = el.item;
            let atpos = emailID.indexOf("@");
            let dotpos = emailID.lastIndexOf(".");

            if (atpos < 1 || dotpos - atpos < 2) {
                banner.innerHTML = `<p class='error' style='content:"\\f071";'> Sorry, please enter the right email format</p>`;
                boolEmail = false;
            } else {
                boolEmail = true;
            }
        };
        let validateStringNaN = (el) => {
            let checkNaN = isNaN(el.item);
            // console.log(checkNaN + ":" + el.item);
            if (checkNaN != true) {
                banner.innerHTML = `<p class='error' style='content:"\\f071";'> Sorry, please enter the right name with letters not numbers format</p>`;
            } else {
                boolName = true;

                return el;
            }
        };
        let validateMessage = (el) => {
            if (el.item.length >= 10) {
                boolMessage = true;
                return el;
            } else {
                banner.innerHTML = `<p class='error' style='content:"\\f071";'> Sorry, please enter the right message format</p>`;
            }
        };
        //get store to check
        store.map((el) => {
            if (el.item != null && el.id != 4) {
                // console.log(el.id + ":" + el.item);
                //validate all inputs if empty

                validateString(el);
                //recheck all inputs for each
                if (el.id == 0) {
                    //check if name is numbers
                    validateStringNaN(el);
                } else if (el.id == 1) {
                    //check email
                    validateEmail(el);
                } else if (el.id == 2) {
                    //check phone
                    validatePhone(el);
                } else if (el.id == 3) {
                    //check message
                    validateMessage(el);
                }
                if (
                    boolMessage == true &&
                    boolPhone == true &&
                    boolEmail == true &&
                    boolName == true
                ) {
                    // on all forms validated = success banner
                    banner.setAttribute("class", "error:after");
                    //banner.setAttribute("style", );
                    banner.style.cssText = `color: #006400; content:''; border: 2px solid #006400; display: inline-block; animation: bounce-right 1s;`;
                    banner.innerHTML = `<i class="fas fa-check-square"></i> Success`;

                    /* START thank you screen not banner */
                    let newScreen = () => {
                        setTimeout(() => {
                            /* START Change the background Image */
                            let arrayImages = [
                                {
                                    imageSrc: "images/lighthouse.jpg",
                                    alt: "lighthouse over the bay during daytime.",
                                },
                                {
                                    imageSrc: "images/trail.jpg",
                                    alt:
                                        "a trail by a lake during autumn season in hilly pastures.",
                                },
                                {
                                    imageSrc: "images/trees.jpg",
                                    alt: "bunch of tall bald trees in an open field.",
                                },
                                {
                                    imageSrc: "images/waterfall.jpg",
                                    alt: "waterfalls by green pastures.",
                                },
                                {
                                    imageSrc: "images/winter.jpg",
                                    alt: "snow covered mountains in the winter.",
                                },
                            ];
                            //get images to background with transition
                            let x = 0;
                            //looks cleaner with form to be replaced than on body if to get a new screen
                            let body = document.querySelector("form");
                            body.style.cssText = "text-align:center";
                            let message = `<p><h1> Thank You!<hr/>We will contact you shortly within 2-3 business days!</h1><hr/><i class="fas fa-arrow-circle-left"> Go Back</i><br/> <div>Thanks again!</div></p>`;
                            body.innerHTML = message;
                            //get back button
                            let getBack = document.querySelector("i");
                            getBack.style.cssText =
                                "color:black; cursor:pointer; font-size:1.5rem;";
                            /* EVENTS last screen*/
                            getBack.addEventListener("click", () => {
                                console.log("click");
                                location.reload();
                            });
                            /* EVENTS last screen*/

                            //get first image to set to get
                            let getImgTransition = document.querySelector("div");
                            getImgTransition.innerHTML = ` <img id="images"><br/> Cheers!`;

                            let getImage = () => {
                                //get a new screen
                                let getImg = document.getElementById("images");
                                getImg.src = arrayImages[x].imageSrc;
                                getImg.alt = arrayImages[x].alt;
                                x++;
                                //fixing to make it readable
                                if (x >= arrayImages.length) {
                                    x = 0;
                                }
                            };
                            //start the loop
                            let startImageLoop = () => {
                                setInterval(() => {
                                    getImage();
                                }, 2000);
                            };
                            startImageLoop();
                        }, 3000);
                    };
                    newScreen();
                    /* END thank you screen not banner */
                }
            }
        });
    };

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
                submitButton.removeAttribute("class", "disabled");
                submitButton.removeAttribute("disabled", true);

                //boolButton = true;
                //submitButton.disabled = false;
                /* EVENTS on submit button */
                addEventListener("submit", submitForm);
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

    createButtonSwitch.addEventListener("click", getSwitch);

    /* EVENTS first screen*/

};
