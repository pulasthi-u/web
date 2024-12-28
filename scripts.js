var prevScroll = 0;
var scrollBreakpoint = window.innerHeight / 2;

var workContent = document.getElementById('work_content');
var items = workContent.getElementsByClassName('work_content_item');

var workscrollbar = document.getElementById('work_scroll');
var workscrollitems = workscrollbar.getElementsByClassName('scrollitem');

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

function showWorkItem(i) {
    // items has the elements ordered in the same order that they appear in the HTML. However, the elements are
    // rendered on top of each other, and the first one to appear in the HTML is actually at the very bottom.
    for (var j = 0; j < i + 1; j++) {
        items[j].style.display = "flex";
    }
    for (var j = i + 1; j < items.length; j++) {
        items[j].style.display = "none";
    }
    for (var j = 0; j < workscrollitems.length; j++) {
        if (j == i) {
            workscrollitems[j].className = "flex-row vcenter scrollitem selected";
        } else {
            workscrollitems[j].className = "flex-row vcenter scrollitem";
        }
    }
}

showWorkItem(0);
document.addEventListener("scroll", nextSection);