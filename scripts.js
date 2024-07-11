function nextSection(e) {
    if (e.deltaY > 3) {
        console.log("scroled donw");
    }
    if (e.deltaY < -1) {
        console.log("Scroled up");
    }
};

document.addEventListener("wheel", nextSection);