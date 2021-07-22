/*!
* Start Bootstrap - Simple Sidebar v6.0.2 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 
console.log("running")

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
    /* Ramirez_Aimee_Assignment #2  */
    const eventHighlight = (item, type) => {
        //reusable component and type for styles to colorize
        item.addEventListener("mouseover", function (event) {
            // highlight the mouseover target
            event.target.style.color = type
        });
        item.addEventListener("mouseout", function (event) {
            // highlight the mouseover target
            event.target.style.color = ""
        });
    }
    const highlightNav = () => {
        //select all nav items
        let getNavItems = document.querySelectorAll('nav  a')
        let getSidebarItems = document.querySelectorAll('#sidebar-wrapper  a')
        if (getNavItems !== null && getSidebarItems !== null) {
            for (let i = 0; i < getNavItems.length; i++) {
                //since two different loops i can be used
                eventHighlight(getNavItems[i], "#d63384")
            }
            for (let i = 0; i < getSidebarItems.length; i++) {
                eventHighlight(getSidebarItems[i], "#20c997")
            }
        }
    }
    highlightNav()
    const include = (file) => {
        let script = document.createElement("script");
        script.src = file;
        script.type = "text/javascript";
        script.defer = true;
        //let script = "<script type='text/javascript' src='" + file +"'></script>";
        let htmlEnd = document.querySelector("body");
        htmlEnd.id = "sendScript";
        //	htmlEnd.innerHTML += script;
        getScript(script);
    }
    const getScript = (script) => {
        let htmlScript = document.getElementById("sendScript");
        htmlScript.insertAdjacentElement("beforeend", script);
        //htmlScript.insertAdjacentHTML("beforeend", script);
    };
    //get files to read more than one
    include("js/form.js");
});
