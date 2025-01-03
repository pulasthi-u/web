var prevScroll = 0;
var scrollBreakpoint = window.innerHeight / 2;

var workitems = document.getElementById('work-items');

var workscrollbar = document.getElementById('work-scrollbar');
var workscrollitems = workscrollbar.getElementsByClassName('scroll-item');

function nextSection(e) {
    var scrollbar = document.getElementById('main-scrollbar');
    var scrollitems = scrollbar.getElementsByClassName('scroll-item');

    var scrollTop = window.scrollY;
    var sign = scrollTop - prevScroll;
    prevScroll = scrollTop;

    // If sign > 0, we are scrolling down.

    if ((scrollTop < scrollBreakpoint) & (sign < 0)) {
        document.getElementById('home').style.animationName = "moveDown";
        scrollitems[0].className = "scroll-item selected";
        scrollitems[1].className = "scroll-item";
    } else if ((scrollTop > scrollBreakpoint) & (scrollTop < 2 * scrollBreakpoint) & (sign > 0)) {
        document.getElementById('home').style.animationName = "moveUp";
        scrollitems[0].className = "scroll-item";
        scrollitems[1].className = "scroll-item selected";
    } else if ((scrollTop > scrollBreakpoint) & (scrollTop < 2 * scrollBreakpoint) & (sign < 0)) {
        document.getElementById('about').style.animationName = "moveDown";
        scrollitems[1].className = "scroll-item selected";
        scrollitems[2].className = "scroll-item";
    } else if ((scrollTop > 2 * scrollBreakpoint) & (sign > 0)) {
        document.getElementById('about').style.animationName = "moveUp";
        scrollitems[1].className = "scroll-item";
        scrollitems[2].className = "scroll-item selected";
    }
};

function showWorkItem(i) {
    workitems.style.transform = 'translateX(-' + (i * 60) + 'vw)';

    for (var j = 0; j < workscrollitems.length; j++) {
        if (j == i) {
            workscrollitems[j].className = "flex-row vcenter hcenter left-margin-1_5 scroll-item selected";
        } else {
            workscrollitems[j].className = "flex-row vcenter hcenter left-margin-1_5 scroll-item";
        }
    }
}

document.addEventListener("scroll", nextSection);