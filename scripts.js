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
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            scrolling = true;
        }
    }

    scrollTimer = setTimeout(() => {
        scrolling = false;
    }, 100);
}