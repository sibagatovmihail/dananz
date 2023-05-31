"use strict"

const htmlElement = document.documentElement;
let loc = document.location;
const pathanme = loc.pathname;


window.addEventListener("load", pageLoad)
window.addEventListener('click', windowClick)
window.addEventListener("scroll", detectScrollDerection)

function checkBrowser() {

    // Get the user-agent string
    let userAgentString =
        navigator.userAgent;

    // Detect Chrome
    let chromeAgent =
        userAgentString.indexOf("Chrome") > -1;

    // Detect Safari
    let safariAgent =
        userAgentString.indexOf("Safari") > -1;

    // Discard Safari since it also matches Chrome
    if ((chromeAgent) && (safariAgent)){
        safariAgent = false;
    }
    if(safariAgent){
        console.log("ssdgsdg")
        htmlElement.classList.add("safari")
    }
        
}


let oldScroll = 0;
const tippyTexts = document.querySelectorAll(".tippy-text")
const menuLinks = document.querySelectorAll(".nav-header__link")


if (tippyTexts) {
    tippyTexts.forEach(tippyText => {
        let symbolsQuantity = tippyText.getAttribute("data-character-quantity");

        let displayText = null;
        let moreText = null;

        if (!symbolsQuantity) {
            symbolsQuantity = 160;
        }
        const trimmedText = tippyText.innerText.trim()
        if (trimmedText.length > symbolsQuantity) {
            displayText = trimmedText.slice(0, symbolsQuantity)
            moreText = trimmedText.slice(symbolsQuantity)

            tippyText.innerText = displayText;
            tippyText.insertAdjacentHTML("beforeend", "<div class='dots'>...</div>")
        }

        tippyText.addEventListener("click", (e) => {
            const targetElement = e.target;

            if (targetElement.closest(".dots")) {
                tippyText.classList.toggle("showed");
                if (tippyText.classList.contains("showed")) {
                    tippyText.innerText = displayText + moreText;
                    tippyText.insertAdjacentHTML("beforeend", "<div class='dots showed'>Hide</div>")

                    console.log(displayText.length + moreText.length)
                    console.log(tippyText.innerText.length)
                } else {
                    tippyText.innerText = displayText;
                    tippyText.insertAdjacentHTML("beforeend", "<div class='dots'>...</div>");
                }
            }
        })
    })
}

function pageLoad(e) {
    setTimeout(() => {
        htmlElement.classList.add("loaded");
    }, 200);

    checkBrowser();
    crossPagesLink();
    showActivePunkt();

    setTimeout(() => {
        let callback = (entries, observer) => {
            entries.forEach((entry) => {
                const targetElement = entry.target;
                if (entry.isIntersecting) {
                    {
                        targetElement.classList.add("observed")
                        console.log(targetElement)
                    }
                } else {
                    if (targetElement.classList.contains("repeat-animation")) {
                        targetElement.classList.remove("observed")
                    }
                }
            })
        }
        let options = {
            root: null,
            rootMargin: "0px 0px 0px 0px",
            threshold: 0.3
        }
        let observer = new IntersectionObserver(callback, options)

        let animElements = document.querySelectorAll(".animation")
        animElements.forEach(animElement => {
            observer.observe(animElement)
        })
    }, 200);
}

function windowClick(e) {
    const targetElement = e.target;

    if (targetElement.closest(".header__icon")) {
        htmlElement.classList.toggle("menu-open")
    }
}

function crossPagesLink() {
    if (loc.hash) {
        const hash = loc.hash;
        const element = document.querySelector(hash)
        if (element) {
            window.scrollTo(0, 0)
            scrollToTheBlock(element)
        }
    }
}

function scrollToTheBlock(elem) {
    elem.scrollIntoView({
        block: 'center',
        inline: 'nearest',
        behavior: 'smooth'
    })
}

function showActivePunkt() {
    menuLinks.forEach(menuLink => {
        const navLinkPathname = new URL(menuLink.href).pathname;

        if (pathanme === navLinkPathname) {
            menuLink.classList.add("active")
        }
    })
}

function detectScrollDerection() {
    if (oldScroll < window.scrollY && scrollY > 200) {
        htmlElement.classList.add("down")
    } else {
        htmlElement.classList.remove("down")
        // htmlElement.classList.add("up")
    }

    oldScroll = window.scrollY;
}
