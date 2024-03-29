"use strict"

const htmlElement = document.documentElement;
const loc = document.location;
const pathanme = loc.pathname;


window.addEventListener("load", pageLoad)
document.addEventListener('click', windowClick)
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
    if ((chromeAgent) && (safariAgent)) {
        safariAgent = false;
    }
    if (safariAgent) {
        htmlElement.classList.add("safari")
    }

}


let oldScroll = 0;
const tippyTexts = document.querySelectorAll(".tippy-text")
const menuLinks = document.querySelectorAll(".nav-header__link")


if (tippyTexts.length) {
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
                        const counterElements = targetElement.querySelectorAll('[data-counter]');
                        if (counterElements.length) {
                            counterInit(counterElements)
                        }
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
    }

    oldScroll = window.scrollY;
}

function counterInit(counterItems) {
    let counters = counterItems;
    if (counters) {
        counters.forEach(counter => {
            counterAnimate(counter)
            counter.classList.add("counted")
        })
    }
}

function counterAnimate(item) {
    if(!item.classList.contains("counted")){
        const animDuration = item.getAttribute("data-anim-duration") || 2000;
        const number = item.dataset.number;
    
        const iterationTime = animDuration / number;
    
        let i = 1;
        let int = setInterval(() => {
            if (i < number) {
                item.textContent = ++i;
            } else{
                clearInterval(int)
            }
        }, iterationTime)
    }
}