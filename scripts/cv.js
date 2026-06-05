const semesterListItems = document.querySelectorAll('.courses > li');

semesterListItems.forEach(semesterListItem => {
    const semesterCourses = semesterListItem.querySelector('ul');
    const arrow = semesterListItem.querySelector('.arrowhead');

    semesterListItem.addEventListener('click', () => {
        if (semesterCourses.style.maxHeight === "") {
            semesterCourses.style.maxHeight = semesterCourses.scrollHeight + "px";
            allSemesters.style.maxHeight = allSemesters.scrollHeight + semesterCourses.scrollHeight + "px";
            arrow.style.rotate = "180deg";
        } else {
            semesterCourses.style.maxHeight = "";
            allSemesters.style.maxHeight = allSemesters.scrollHeight + "px";
            arrow.style.rotate = "0deg";
        }
    })
});

const allSemesters = document.querySelector('.courses');
const arrow = document.querySelector('.school .details .list a .arrowhead');

document.querySelector('.school .details .list a').addEventListener('click', () => {
    if (allSemesters.style.maxHeight === "") {
        allSemesters.style.maxHeight = allSemesters.scrollHeight + "px";
        arrow.style.rotate = "180deg";
    } else {
        allSemesters.style.maxHeight = "";
        arrow.style.rotate = "0deg";
    }
})