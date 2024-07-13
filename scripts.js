function nextSection(e) {
    var scrollTop = window.scrollY;
    console.log(scrollTop);
    if (scrollTop < 400) {
        document.getElementById('main').style.animationName = "moveDown";

    } else if ((scrollTop > 400) & (scrollTop < 800)) {
        document.getElementById('main').style.animationName = "moveUp";
        document.getElementById('section2').style.animationName = "moveDown";
    } else if (scrollTop > 800) {
        document.getElementById('section2').style.animationName = "moveUp";
    }
};

document.addEventListener("scroll", nextSection);