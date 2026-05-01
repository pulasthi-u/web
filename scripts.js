document.addEventListener("wheel", scrollHandler);

let scrolling = true;
let currentSection = 0;

let sections = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('projects'),
    document.getElementById('contact')
];

let scrollTimer = null;

function scrollHandler(e) {
    clearTimeout(scrollTimer);

    if (!scrolling) {
        if (Math.abs(e.deltaY) >= 100) {
            document.getElementById(`scroll-item-${currentSection}`).style.backgroundColor = "transparent";
            
            currentSection += e.deltaY > 0 ? 1 : -1;
            currentSection = currentSection < 0 ? 0 : (currentSection > 3 ? 3 : currentSection);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            
            document.getElementById(`scroll-item-${currentSection}`).style.backgroundColor = "black";
            scrolling = true;
        }
    }

    scrollTimer = setTimeout(() => {
        scrolling = false;
    }, 100);
}

function scrollToSection(sectionIndex) {
    if (sectionIndex == -1) sectionIndex = 3;

    document.getElementById(`scroll-item-${currentSection}`).style.backgroundColor = "transparent";

    currentSection = sectionIndex;
    sections[currentSection].scrollIntoView({ behavior: 'smooth' });

    document.getElementById(`scroll-item-${currentSection}`).style.backgroundColor = "black";
}