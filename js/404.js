
/* =========================================================
   404 CORRUPTION SCRIPT
========================================================= */


/*
   Occasionally replace the requested path with
   something that shouldn't be there.
*/

const paths = [

    "/records/████████████████.html",

    "/records/incident-o-26.html",

    "/personnel/004.html",

    "/facilities/████████.html",

    "/archive/deleted.html",

    "/████████████████████",

    "/records/undefined.html",

    "/records/null.html"

];


const pathElement =
    document.querySelector(".path");


setInterval(function () {


    if (Math.random() > 0.82) {


        const original =
            pathElement.textContent;


        pathElement.textContent =
            paths[
                Math.floor(
                    Math.random() *
                    paths.length
                )
            ];


        setTimeout(function () {

            pathElement.textContent =
                original;

        }, 350 + Math.random() * 700);

    }


}, 2300);



/*
   Occasionally corrupt the system status.
*/

const systemStatus =
    document.querySelector(".system-status span");


const systemMessages = [

    "SYSTEM OPERATIONAL",

    "SYSTEM OPERATIONAL",

    "SYSTEM OPERATIONAL",

    "SYSTEM DEGRADED",

    "SYSTEM STATUS UNKNOWN",

    "SYSTEM OPERATIONAL",

    "SYSTEM DOES NOT EXIST"

];


setInterval(function () {


    if (Math.random() > 0.9) {


        const original =
            systemStatus.textContent;


        systemStatus.textContent =
            systemMessages[
                Math.floor(
                    Math.random() *
                    systemMessages.length
                )
            ];


        setTimeout(function () {

            systemStatus.textContent =
                original;

        }, 250);

    }


}, 1900);



/*
   The return button occasionally becomes
   slightly less reassuring.
*/

const returnButton =
    document.querySelector(".return-button");


const returnMessages = [

    "← Return to previous page",

    "← Return to previous page",

    "← Return to previous page",

    "← Return to previous page",

    "← Return to previous record",

    "← Return to previous reality"

];


setInterval(function () {


    if (Math.random() > 0.88) {


        const original =
            returnButton.textContent;


        returnButton.textContent =
            returnMessages[
                Math.floor(
                    Math.random() *
                    returnMessages.length
                )
            ];


        setTimeout(function () {

            returnButton.textContent =
                original;

        }, 700);

    }


}, 3000);



/*
   Tiny random screen displacement.
*/

setInterval(function () {


    if (Math.random() > 0.94) {


        document.body.style.transform =
            "translateX(" +
            ((Math.random() * 4) - 2) +
            "px)";


        setTimeout(function () {

            document.body.style.transform =
                "";

        }, 80 + Math.random() * 150);

    }


}, 1300);
