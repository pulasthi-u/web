// Snap Scrolling Effect

let scrolling = true;
let currentSection = 0;
let scrollTimer = null;

let sections = [
    document.querySelector('#home'),
    document.querySelector('#about'),
    document.querySelector('#projects'),
    document.querySelector('#contact')
];

function scrollHandler(e) {
    clearTimeout(scrollTimer);

    if (!scrolling) {
        if (Math.abs(e.deltaY) >= 100) {
            document.querySelector(`#scroll-item-${currentSection}`).style.backgroundColor = "transparent";

            currentSection += e.deltaY > 0 ? 1 : -1;
            currentSection = currentSection < 0 ? 0 : (currentSection > 3 ? 3 : currentSection);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });

            document.querySelector(`#scroll-item-${currentSection}`).style.backgroundColor = "black";
            scrolling = true;
        }
    }

    scrollTimer = setTimeout(() => {
        scrolling = false;
    }, 100);
}

function scrollToSection(sectionIndex) {
    if (sectionIndex == -1) sectionIndex = 3;

    document.querySelector(`#scroll-item-${currentSection}`).className = "scroll-item";

    currentSection = sectionIndex;
    sections[currentSection].scrollIntoView({ behavior: 'smooth' });

    document.querySelector(`#scroll-item-${currentSection}`).className = "scroll-item selected";
}

document.addEventListener("wheel", scrollHandler);

[...document.querySelectorAll('#scroll .scroll-item')].map((scrollItem, i) => {
    scrollItem.addEventListener('click', () => { scrollToSection(i) });
});

[...document.querySelectorAll('nav ul li')].map((li, i) => {
    li.addEventListener('click', () => { scrollToSection(i) });
});

document.querySelector('#scroll .arrow.up').addEventListener('click', () => {
    scrollToSection((currentSection - 1) % 4)
});

document.querySelector('#scroll .arrow.down').addEventListener('click', () => {
    scrollToSection((currentSection + 1) % 4)
});

document.querySelector("#home button").addEventListener('click', () => {
    scrollToSection(1);
});

// Project Loading

const NS = "http://www.w3.org/2000/svg";

const response = await fetch('projects.json');
const projects = await response.json();

let currentProject = 0;

const workItems = document.querySelector('#work-items');
const workItemCount = document.querySelector('#work-item-count');

function constructWorkItem(projectIndex) {
    const project = projects[projectIndex];

    const workItem = document.createElement("div");
    workItem.className = "work-item";

    const title = document.createElement("h2");
    title.innerText = project.title;

    workItem.append(title);

    const metaData = document.createElement("div");
    metaData.className = "work-item-metadata";

    const dateType = document.createElement("div");
    dateType.className = "date-type";

    const date = document.createElement("span");
    date.className = "date";
    date.innerText = project.date;
    dateType.append(date);

    const centerDot = document.createElement("span");
    centerDot.innerHTML = "&#183;";
    dateType.append(centerDot);

    const type = document.createElement("span");
    type.className = "type";
    type.innerText = project.type;
    dateType.append(type);

    metaData.append(dateType);

    if (project.techs) {
        const techs = document.createElement("div");
        techs.className = "techs";

        project.techs.forEach((tech) => {
            const icon = document.createElement("img");
            icon.src = `images/${tech}`;

            techs.append(icon);
        });

        metaData.append(techs);
    }

    workItem.append(metaData);

    const desc = document.createElement("div");
    desc.className = "p-container";

    const p = document.createElement("p");
    p.innerText = project.desc;
    desc.append(p);

    workItem.append(desc);

    const button = document.createElement("button");
    button.innerText = "Read More";

    const arrow = document.createElementNS(NS, "svg");
    arrow.setAttribute("class", "arrow right");
    arrow.setAttribute("scale", "0.8");

    const use = document.createElementNS(NS, "use");
    use.setAttribute("href", "#arrow");
    arrow.append(use);

    button.append(arrow);

    workItem.append(button);

    return workItem;
}

function moveToProject(projectIndex) {
    if (projectIndex < 0) return;
    if (projectIndex > projects.length - 1) return;

    const oldWorkItem = document.querySelector('.work-item');
    const newWorkItem = constructWorkItem(projectIndex);

    workItemCount.innerText = `Item ${projectIndex + 1} of ${projects.length}`;

    if (projectIndex > currentProject) {
        workItems.append(newWorkItem);

        workItems.scrollTo({
            left: oldWorkItem.clientWidth,
            behavior: 'smooth'
        });

        workItems.addEventListener('scrollend', () => {
            if (oldWorkItem) {
                workItems.removeChild(oldWorkItem);
            }
        }, { once: true });
    } else {
        workItems.prepend(newWorkItem);
        workItems.scrollLeft = oldWorkItem.clientWidth;

        workItems.addEventListener('scrollend', () => {
            workItems.scrollTo({
                left: 0,
                behavior: 'smooth'
            });

            workItems.addEventListener('scrollend', () => {
                if (oldWorkItem) {
                    workItems.removeChild(oldWorkItem);
                }
            }, { once: true });

        }, { once: true });
    }

    currentProject = projectIndex;
}

workItems.append(constructWorkItem(0));
workItemCount.innerText = `Item 1 of ${projects.length}`;

document.querySelector(".work-item-scroll.prev div").addEventListener('click', () => {
    moveToProject(currentProject - 1);
})

document.querySelector(".work-item-scroll.next").addEventListener('click', () => {
    moveToProject(currentProject + 1);
})