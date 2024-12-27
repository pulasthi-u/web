var prevScroll = 0;
var scrollBreakpoint = window.innerHeight / 2;

function nextSection(e) {
    var scrollTop = window.scrollY;
    var sign = scrollTop - prevScroll;
    prevScroll = scrollTop;

    // If sign > 0, we are scrolling down.

    if ((scrollTop < scrollBreakpoint) & (sign < 0)) {
        document.getElementById('home').style.animationName = "moveDown";
    } else if ((scrollTop > scrollBreakpoint) & (scrollTop < 2 * scrollBreakpoint) & (sign > 0)) {
        document.getElementById('home').style.animationName = "moveUp";
    } else if ((scrollTop > scrollBreakpoint) & (scrollTop < 2 * scrollBreakpoint) & (sign < 0)) {
        document.getElementById('about').style.animationName = "moveDown";
    } else if ((scrollTop > 2 * scrollBreakpoint) & (sign > 0)) {
        document.getElementById('about').style.animationName = "moveUp";
    }
};

document.addEventListener("scroll", nextSection);