(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function stepForm() {
        const steps = document.querySelectorAll(".form__step");
        const prevBtn = document.querySelector(".back");
        const nextBtn = document.querySelector(".next");
        const form = document.querySelector(".steps__form");
        const stepNumbers = document.querySelectorAll(".step__number");
        const progress = document.querySelector(".progress__success");
        const finishBlock = document.querySelector(".finish");
        form.addEventListener("submit", (e => e.preventDefault()));
        let formStep = 0;
        prevBtn.addEventListener("click", (() => {
            formStep--;
            stepNumbers[formStep + 1].classList.remove("active__number");
            updateFormSteps();
        }));
        nextBtn.addEventListener("click", (() => {
            if (formStep < steps.length - 1) {
                formStep++;
                updateFormSteps();
            }
        }));
        function updateFormSteps() {
            steps.forEach((step => {
                step.classList.contains("active") && step.classList.remove("active");
            }));
            steps[formStep].classList.add("active");
            stepNumbers[formStep].classList.add("active__number");
            if (0 === formStep) prevBtn.style.display = "none"; else prevBtn.style.display = "inherit";
            if (formStep === steps.length - 1) {
                nextBtn.innerText = "Finish";
                nextBtn.addEventListener("click", (() => {
                    form.style.display = "none";
                    finishBlock.style.display = "block";
                }));
            } else nextBtn.innerText = "Next";
            const actives = document.querySelectorAll(".active__number");
            const percent = (actives.length - 1) / (stepNumbers.length - 1) * 100 + "%";
            progress.style.width = percent;
        }
        updateFormSteps();
    }
    if (document.querySelector(".form__step")) {
        stepForm();
        function handleFileSelect(evt) {
            var file = evt.target.files;
            var f = file[0];
            if (!f.type.match("image.*")) alert("Image only please....");
            var reader = new FileReader;
            reader.onload = function(theFile) {
                return function(e) {
                    var bodyPrev = document.querySelector(".profile-uploader__body");
                    bodyPrev.innerHTML = [ '<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />' ].join("");
                };
            }(f);
            reader.readAsDataURL(f);
        }
        document.getElementById("file").addEventListener("change", handleFileSelect, false);
    }
    window["FLS"] = true;
    isWebp();
})();