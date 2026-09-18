
(function () {
    const documentBlock = document.getElementById("site001-recovery");
    if (!documentBlock) return;

    let corruptionStarted = false;

    function startCorruption() {
        if (corruptionStarted) return;
        corruptionStarted = true;

        documentBlock.classList.add("is-corrupted");

        window.setTimeout(function () {
            documentBlock.classList.add("is-recovered");
            documentBlock.classList.remove("is-corrupted");
        }, 2600);
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                startCorruption();
                observer.disconnect();
            }
        });
    }, { threshold: [0.35] });

    observer.observe(documentBlock);
})();
