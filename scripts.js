var prevScroll = 0;
var scrollBreakpoint = window.innerHeight / 2;

function nextSection(e) {
    var scrollbar = document.getElementById('scrollbar');
    var scrollitems = scrollbar.getElementsByClassName('scrollitem');

    var scrollTop = window.scrollY;
    var sign = scrollTop - prevScroll;
    prevScroll = scrollTop;

    // If sign > 0, we are scrolling down.

    if ((scrollTop < scrollBreakpoint) & (sign < 0)) {
        document.getElementById('home').style.animationName = "moveDown";
        scrollitems[0].className = "scrollitem selected";
        scrollitems[1].className = "scrollitem";
    } else if ((scrollTop > scrollBreakpoint) & (scrollTop < 2 * scrollBreakpoint) & (sign > 0)) {
        document.getElementById('home').style.animationName = "moveUp";
        scrollitems[0].className = "scrollitem";
        scrollitems[1].className = "scrollitem selected";
    } else if ((scrollTop > scrollBreakpoint) & (scrollTop < 2 * scrollBreakpoint) & (sign < 0)) {
        document.getElementById('about').style.animationName = "moveDown";
        scrollitems[1].className = "scrollitem selected";
        scrollitems[2].className = "scrollitem";
    } else if ((scrollTop > 2 * scrollBreakpoint) & (sign > 0)) {
        document.getElementById('about').style.animationName = "moveUp";
        scrollitems[1].className = "scrollitem";
        scrollitems[2].className = "scrollitem selected";
    }
};

document.addEventListener("scroll", nextSection);