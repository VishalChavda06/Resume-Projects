let HomePageShow = JSON.parse(localStorage.getItem("HomePageShow")) || [];

const Uimaker = (HomePageShow) => {
  document.getElementById("UIShow").innerHTML = "";
  HomePageShow.map((ele, i) => {
    let title = document.createElement("h4");
    title.innerHTML = ele.title;
    let content = document.createElement("p");
    content.innerHTML = ele.content;
    let category = document.createElement("p");
    category.innerHTML = ele.category;
    let img = document.createElement("img");
    img.src = ele.img;
    // deleted btn
    let btn = document.createElement("button");
    btn.innerHTML = `Deleted news `;
    btn.addEventListener("click", () => {
      HomePageShow.splice(i, 1);
      Uimaker(HomePageShow);
      localStorage.setItem("HomePageShow", JSON.stringify(HomePageShow));
    });
    let div = document.createElement("div");
    div.append(img, title, content, category, btn);
    let show = document.createElement("p");
    show.append(div);
    document.getElementById("UIShow").append(show);
  });
};

// Seraching

const serach = (value) => {
  let temp = HomePageShow.filter((ele) =>
    ele.title.toLowerCase().includes(value.toLowerCase())
  );
  // console.log(temp);
  Uimaker(temp);
};

document.getElementById("search").addEventListener("input", () => {
  let value = document.getElementById("search").value;
  serach(value);
  console.log(value)
});

// filter

const handleFilter = (category) => {
  if (category == "All") {
    Uimaker(HomePageShow);
    return;
  }
  let temp = HomePageShow.filter((ele) => ele.category == category);
  Uimaker(temp);
};

const getcartegory = (id) => {
  return document
    .getElementById(id)
    .addEventListener("click", () => handleFilter(id));
};
getcartegory("world-news");
getcartegory("national-news");
getcartegory("politics");
getcartegory("business");
getcartegory("technology");
getcartegory("science");
getcartegory("health");
getcartegory("sports");
getcartegory("entertainment");
getcartegory("lifestyle");
getcartegory("education");
getcartegory("environment");
getcartegory("crime");
getcartegory("opinion");
getcartegory("arts-culture");
getcartegory("weather");
getcartegory("religion");
getcartegory("All");

Uimaker(HomePageShow);
