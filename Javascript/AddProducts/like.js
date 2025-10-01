let Like = JSON.parse(localStorage.getItem("Like")) || [];

// console.log(Products);

const Uimaker = (Like) => {
  document.getElementById("like").innerHTML = " ";
  Like.map((ele, i) => {
    let title = document.createElement("p");
    title.innerHTML = `${ele.title}`;
    let price = document.createElement("p");
    price.innerHTML = `₹${ele.price}.00/-`;
    let img = document.createElement("img");
    img.src = ele.img;
    // deleted btn
    let btn = document.createElement("button");
    btn.innerHTML = `Deleted Product `;
    btn.addEventListener("click", () => {
      Like.splice(i, 1);
      localStorage.setItem("Like", JSON.stringify(Like));
      Uimaker(Like)
    });
    let div = document.createElement("div");
    div.append(img, title, price, btn);
    document.getElementById("like").append(div);
  });
};

Uimaker(Like);
