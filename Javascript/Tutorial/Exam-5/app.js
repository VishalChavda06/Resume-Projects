const getvalue = (id) => {
  return document.getElementById(id).value;
};

let MainNews = JSON.parse(localStorage.getItem("MainNews")) || [];

let HomePageShow = JSON.parse(localStorage.getItem("HomePageShow")) || [];

const handlenews = (e) => {
  e.preventDefault();

  let news = {
    title: getvalue("name"),
    content: getvalue("content"),
    category: getvalue("category"),
    img: getvalue("img"),
    id: Date.now(),
  };

  MainNews.push(news);
  console.log(MainNews);
  localStorage.setItem("MainNews", JSON.stringify(MainNews));

  HomePageShow.push(news);
  localStorage.setItem("HomePageShow", JSON.stringify(HomePageShow));

  alert("SuccessFully News Created");
};

// const Uimaker = (MainNews) => {
//   MainNews.map((News, i) => {
//     let title = document.createElement("h4");
//     title.innerHTML = News.title;
//     let content = document.createElement("p");
//     content.innerHTML = News.content;
//     let category = document.createElement("p");
//     category.innerHTML = News.category;
//     let img = document.createElement("img");
//     img.src = News.img;
//     // Btn deleted
//     let Btn = document.createElement("button");
//     Btn.innerHTML = "Remove News";
//     Btn.addEventListener("clike", () => {
//       MainNews.splice(i, 1);
//     });
//   });
// };

document.getElementById("News").addEventListener("submit", handlenews);
