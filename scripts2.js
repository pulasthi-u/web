document.addEventListener("wheel", scrollHandler);

let lastScrollY = 0;
let scrolling = true;
let currentSection = 0;

let sections = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('projects'),
    document.getElementById('contact')
];

console.log(sections);

let scrollTimer = null;

function scrollHandler(e) {
    clearTimeout(scrollTimer);

    if (!scrolling) {
        if (Math.abs(e.deltaY) >= 100) {
            currentSection += e.deltaY > 0 ? 1 : -1;
            currentSection = currentSection < 0 ? 0 : (currentSection > 3 ? 3 : currentSection);
            console.log("e.deltaY: " + e.deltaY, "scrolling to ", sections[currentSection].id);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            scrolling = true;
        }
    }

    scrollTimer = setTimeout(() => {
        scrolling = false;
    }, 100);
}

function scrollHandler2(e) {
    let deltascroll = window.scrollY - lastScrollY;
    console.log("scrolly", deltascroll, "deltaY", e.deltaY);
    lastScrollY = window.scrollY;

    if (Math.abs(deltascroll) <= 10) {
        scrolling = false;
    }

    if (!scrolling) {
        if (Math.abs(e.deltaY) > 50) {
            currentSection += e.deltaY > 0 ? 1 : -1;
            currentSection = currentSection < 0 ? 0 : (currentSection > 3 ? 3 : currentSection);
            console.log("e.deltaY: " + e.deltaY, "scrolling to ", sections[currentSection].id);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            scrolling = true;
        }
    }
}