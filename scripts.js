function nextSection(e) {
    var scrollTop = window.scrollY;
    console.log(scrollTop);
    if (scrollTop < 400) {
        document.getElementById('home').style.animationName = "moveDown";

    } else if ((scrollTop > 400) & (scrollTop < 800)) {
        document.getElementById('home').style.animationName = "moveUp";
        document.getElementById('about').style.animationName = "moveDown";
    } else if (scrollTop > 800) {
        document.getElementById('about').style.animationName = "moveUp";
    }
};

document.addEventListener("scroll", nextSection);