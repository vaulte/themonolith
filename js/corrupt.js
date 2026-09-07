/* =========================================================
   INCIDENT-O-26 TEMPORAL INSTABILITY
========================================================= */

(function () {

    const timestamps = [
        "11:37 AM EST",
        "11:37 AM EST",
        "11:37 AM EST",
        "11:██ AM EST",
        "11:37 AM",
        "18/06/2019",
        "18/06/????",
        "TIME INDEX LOST"
    ];

    const elements = document.querySelectorAll(".timeline-time");

    setInterval(function () {

        /*
         * Very occasionally alter one timestamp.
         * This is deliberately subtle rather than a constant
         * glitch effect.
         */

        if (Math.random() > 0.82 && elements.length) {

            const element =
                elements[Math.floor(Math.random() * elements.length)];

            const original = element.textContent;

            element.textContent =
                timestamps[Math.floor(Math.random() * timestamps.length)];

            setTimeout(function () {

                element.textContent = original;

            }, 180 + Math.random() * 500);

        }

    }, 2200);

})();


/* =========================================================
   RANDOM DOCUMENT INSTABILITY
========================================================= */

(function () {

    const phrases = [
        "RECORD VERIFIED",
        "RECORD NOT VERIFIED",
        "EVENT CONFIRMED",
        "EVENT NOT CONFIRMED",
        "SUBJECT PRESENT",
        "SUBJECT ABSENT",
        "PERSONNEL COUNT: 07",
        "PERSONNEL COUNT: 05",
        "PERSONNEL COUNT: 04",
        "PERSONNEL COUNT: ERROR"
    ];

    const statusElements =
        document.querySelectorAll(".corrupt-text");

    setInterval(function () {

        if (Math.random() > 0.9 && statusElements.length) {

            const element =
                statusElements[
                    Math.floor(Math.random() * statusElements.length)
                ];

            const original = element.textContent;

            element.textContent =
                phrases[Math.floor(Math.random() * phrases.length)];

            setTimeout(function () {

                element.textContent = original;

            }, 100 + Math.random() * 300);

        }

    }, 1800);

})();


/* =========================================================
   OCCASIONAL STATIC EVENT
========================================================= */

(function () {

    setInterval(function () {

        if (Math.random() > 0.87) {

            document.body.style.transform =
                "translateX(" +
                (Math.random() * 2 - 1) +
                "px)";

            setTimeout(function () {

                document.body.style.transform = "";

            }, 70 + Math.random() * 150);

        }

    }, 1400);

})();
