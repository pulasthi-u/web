// Snap Scrolling Effect

let scrolling = true;
let currentSection = 0;
let scrollTimer = null;

let sections = [
    document.querySelector('#home'),
    document.querySelector('#about'),
    document.querySelector('#blog'),
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

// Blog Article Loading

const NS = "http://www.w3.org/2000/svg";

const response = await fetch('blog.json');
const articles = await response.json();

let currentArticle = 0;

const blogItems = document.querySelector('#blog-items');
const blogItemCount = document.querySelector('#blog-item-count');
const pageImg = document.querySelector('#blog .page-img');

function constructBlogItemImg(articleIndex) {
    const img = document.createElement("img");
    img.src = articles[articleIndex].img;

    return img;
}

function constructBlogItem(articleIndex) {
    const article = articles[articleIndex];

    const blogItem = document.createElement("div");
    blogItem.className = "blog-item";

    const title = document.createElement("h2");
    title.innerText = article.title;

    blogItem.append(title);

    const metaData = document.createElement("div");
    metaData.className = "blog-item-metadata";

    const dateType = document.createElement("div");
    dateType.className = "date-type";

    const date = document.createElement("span");
    date.className = "date";
    date.innerText = article.date;
    dateType.append(date);

    const centerDot = document.createElement("span");
    centerDot.innerHTML = "&#183;";
    dateType.append(centerDot);

    const type = document.createElement("span");
    type.className = "type";
    type.innerText = article.type;
    dateType.append(type);

    metaData.append(dateType);

    if (article.techs) {
        const techs = document.createElement("div");
        techs.className = "techs";

        article.techs.forEach((tech) => {
            const icon = document.createElement("img");
            icon.src = `images/${tech}`;

            techs.append(icon);
        });

        metaData.append(techs);
    }

    blogItem.append(metaData);

    const desc = document.createElement("div");
    desc.className = "p-container";

    const p = document.createElement("p");
    p.innerText = article.desc;
    desc.append(p);

    blogItem.append(desc);

    const button = document.createElement("button");
    button.innerText = "Read More";
    button.addEventListener('click', () => {
        window.location.href = article.link;
    });

    const arrow = document.createElementNS(NS, "svg");
    arrow.setAttribute("class", "arrow right");
    arrow.setAttribute("scale", "0.8");

    const use = document.createElementNS(NS, "use");
    use.setAttribute("href", "#arrow");
    arrow.append(use);

    button.append(arrow);

    blogItem.append(button);

    return blogItem;
}

function moveToProject(articleIndex) {
    if (articleIndex < 0) return;
    if (articleIndex > articles.length - 1) return;

    const oldBlogItem = document.querySelector('.blog-item');
    const oldBlogItemImg = document.querySelector('#blog .page-img img');

    const newBlogItem = constructBlogItem(articleIndex);
    const newBlogItemImg = constructBlogItemImg(articleIndex);

    blogItemCount.innerText = `Item ${articleIndex + 1} of ${articles.length}`;

    const removeOldBlogItem = () => oldBlogItem?.remove();
    const removeOldBlogItemImg = () => oldBlogItemImg?.remove();

    if (articleIndex > currentArticle) {
        blogItems.append(newBlogItem);

        blogItems.scrollTo({
            left: oldBlogItem.clientWidth,
            behavior: 'smooth'
        });

        blogItems.addEventListener('scrollend', removeOldBlogItem, { once: true });

        pageImg.append(newBlogItemImg);

        pageImg.scrollTo({
            left: oldBlogItemImg.clientWidth,
            behavior: 'smooth'
        });

        pageImg.addEventListener('scrollend', removeOldBlogItemImg, { once: true });
    } else {
        blogItems.prepend(newBlogItem);
        blogItems.scrollLeft = oldBlogItem.clientWidth;

        blogItems.addEventListener('scrollend', () => {
            blogItems.scrollTo({
                left: 0,
                behavior: 'smooth'
            });

            blogItems.addEventListener('scrollend', removeOldBlogItem, { once: true });
        }, { once: true });

        pageImg.prepend(newBlogItemImg);
        pageImg.scrollLeft = oldBlogItemImg.clientWidth;

        pageImg.addEventListener('scrollend', () => {
            pageImg.scrollTo({
                left: 0,
                behavior: 'smooth'
            });

            pageImg.addEventListener('scrollend', removeOldBlogItemImg, { once: true });
        }, { once: true });
    }

    currentArticle = articleIndex;
}

blogItems.append(constructBlogItem(0));
blogItemCount.innerText = `Item 1 of ${articles.length}`;
pageImg.append(constructBlogItemImg(0));

document.querySelector(".blog-item-scroll.prev div").addEventListener('click', () => {
    moveToProject(currentArticle - 1);
})

document.querySelector(".blog-item-scroll.next").addEventListener('click', () => {
    moveToProject(currentArticle + 1);
})