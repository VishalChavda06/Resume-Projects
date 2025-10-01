const getvalue = (id) => {
  return document.getElementById(id).value;
};
// make a array ==>
let Products = JSON.parse(localStorage.getItem("Products")) || [];

// Make a LikeButtons array ==>
let Like = JSON.parse(localStorage.getItem("Like")) || [];
const handleproducts = (e) => {
  e.preventDefault();
  // console.log("submited");
  let Product = {
    title: getvalue("title"),
    price: getvalue("price"),
    img: getvalue("img"),
    category: getvalue("category"),
    id: Date.now(),
  };
  Products.push(Product);
  // localStorage to store Product
  localStorage.setItem("Products", JSON.stringify(Products));
  // console.log(Products);
  Uimaker(Products);
};
const Uimaker = (Products) => {
  document.getElementById("ProductsList").innerHTML = "";
  Products.map((Product, i) => {
    let title = document.createElement("p");
    title.innerHTML = `${Product.title}`;
    let price = document.createElement("p");
    price.innerHTML = `₹${Product.price}.00/-`;
    let img = document.createElement("img");
    img.src = Product.img;
    // deleted btn
    let btn = document.createElement("button");
    btn.innerHTML = `Deleted Product `;
    btn.addEventListener("click", () => {
      Products.splice(i, 1);
      Uimaker(Products);
      localStorage.setItem("Products", JSON.stringify(Products));
    });
    // LikeButtons ==>
    let LikeButtons = document.createElement("icon");
    LikeButtons.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    LikeButtons.style.paddingLeft = "25px ";
    LikeButtons.addEventListener("click", () => {
      if (IsExists(Product.id)) {
        alert("alery Exists this Product");
      } else {
        Like.push(Product);
        localStorage.setItem("Like", JSON.stringify(Like));
        alert("Your Product is Added");
      }
    });
    let category = document.createElement("p");
    category.innerHTML = Product.category;
    // Make a Div
    let div = document.createElement("div");
    div.append(img, title, price, category, btn, LikeButtons);
    let show = document.createElement("p");
    show.append(div);
    document.getElementById("ProductsList").append(show);
  });
};
Uimaker(Products);

// add and already add Product
const IsExists = (id) => {
  for (let i = 0; i < Like.length; i++) {
    if (Like[i].id == id) {
      return true;
    }
    return false;
  }
};

// Sorting Products
const Sorting = (OrderBy) => {
  if (OrderBy === "lth") {
    let temp = Products.sort((a, b) => a.price - b.price);
    // alert("low to high")
    Uimaker(temp);
  } else if (OrderBy === "htl") {
    let temp = Products.sort((a, b) => b.price - a.price);
    // alert("high to low")
    Uimaker(temp);
  }
};
// filter categorys
const FilterCategory = (category) => {
  if (category == "All") {
    Uimaker(Products);
    return;
  }
  let temp = Products.filter((ele) => ele.category == category);
  console.log(temp);
  Uimaker(temp);
};
// sreaching Products

const serach = (value) => {
  let temp = Products.filter((ele) =>
    ele.title.toLowerCase().includes(value.toLowerCase())
  );
  // console.log(temp);
  Uimaker(temp);
};

document.getElementById("search").addEventListener("input", () => {
  
  let value = getvalue("search");
  serach(value);
});
document
  .getElementById("Kids")
  .addEventListener("click", () => FilterCategory("Kids"));
document
  .getElementById("men")
  .addEventListener("click", () => FilterCategory("Men"));
document
  .getElementById("Women")
  .addEventListener("click", () => FilterCategory("Women"));
document
  .getElementById("All")
  .addEventListener("click", () => FilterCategory("All"));
document.getElementById("lth").addEventListener("click", () => Sorting("lth"));
document.getElementById("htl").addEventListener("click", () => Sorting("htl"));
document.getElementById("Products").addEventListener("submit", handleproducts);
