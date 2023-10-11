const API_KEY = "a1ae7619544b4bd994e9e8cdf29cc775";
const url = "https://newsapi.org/v2/everything?q=";
const menu = document.getElementById("menu");
const cardContainer = document.querySelector(".card-container");
const navLinks = document.querySelector(".nav-links");
const newsCardTemplate = document.getElementById("template-news-card");
const close = document.getElementById("close");
const searchBar = document.getElementById("search-bar");

window.addEventListener("load", fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();

  bindData(data.articles);
}

function bindData(articles) {
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function reload() {
  window.location.reload();
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;

  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-us", {
    timezone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} ･ ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);

  curSelectNav?.classList.remove("active");
  curSelectNav = navItem;
  curSelectNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  fetchNews(query);
  if (!query) return;

  curSelectNav?.classList.remove("active");
});

menu.addEventListener("click", () => {
  navLinks.style.transform = "translateX(0)";
  searchBar.style.transform = "translateX(0)";
});
close.addEventListener("click", () => {
  navLinks.style.transform = "translateX(100%)";
  searchBar.style.transform = "translateX(100%)";
});
