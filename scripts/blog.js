const NS = "http://www.w3.org/2000/svg";

const article_list = document.querySelector('#article-list');

const response = await fetch('blog.json');
const articles = await response.json();

let currentProject = 0;

function constructArticleItem(articleIndex) {
    const article = articles[articleIndex];

    const card = document.createElement("div");
    card.className = "article";

    const img = document.createElement("img");
    img.src = article.img;
    card.append(img);

    const details = document.createElement("div");
    details.className = "details";

    const title = document.createElement("h2");
    title.innerText = article.title;
    details.append(title);

    const metaData = document.createElement("div");
    metaData.className = "metadata";

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

    details.append(metaData);

    if (article.tags) {
        const tags = document.createElement("div");
        tags.className = "article-tags";

        article.tags.forEach((tagText) => {
            const tag = document.createElement("div");
            tag.className = "tag";
            tag.innerText = tagText;
            tags.append(tag);
        });

        details.append(tags);
    }

    const p = document.createElement("p");
    p.innerText = article.desc;
    details.append(p);

    card.append(details);
    
    const arrow = document.createElementNS(NS, "svg");
    arrow.setAttribute("class", "arrowhead right");
    
    const use = document.createElementNS(NS, "use");
    use.setAttribute("href", "#arrowhead");
    arrow.append(use);

    card.append(arrow);

    card.addEventListener('click', () => {
        window.location.href = article.link;
    })

    return card;
}

for (let i = 0; i < 5; i++) {
    if (articles[i]) {
        article_list.append(constructArticleItem(i));
    }
};