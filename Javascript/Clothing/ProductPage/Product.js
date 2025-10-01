// Define products with unique id and  keys
let products = [
  {
    id: 1,
    name: "Men's T-Shirt",
    price: 500,
    category: "Men",
    img: "https://i.pinimg.com/736x/c9/5b/8b/c95b8b10325ae0feefaa570fc5ac382c.jpg",
  },
  {
    id: 2,
    name: "Men's Shirt",
    price: 789,
    category: "Men",
    img: "https://i.pinimg.com/736x/69/28/58/6928580f902f47636c98947dd63a3ec5.jpg",
  },
  {
    id: 3,
    name: "Men's Jacket",
    price: 1500,
    category: "Men",
    img: "https://i.pinimg.com/736x/5f/e4/bc/5fe4bcb195b6bc7e7b8e02a5cb1bf75f.jpg",
  },
  {
    id: 4,
    name: "Men's Sneakers",
    price: 3200,
    category: "Men",
    img: "https://i.pinimg.com/736x/cf/47/a1/cf47a1c49f83341bb6ff4fc2087ae16f.jpg",
  },
  {
    id: 5,
    name: "Women's Dress",
    price: 2500,
    category: "Women",
    img: "https://i.pinimg.com/736x/b1/15/db/b115db234b39e19fe738fd55d1b8fabc.jpg",
  },
  {
    id: 6,
    name: "Women's Jacket",
    price: 3200,
    category: "Women",
    img: "https://i.pinimg.com/736x/7e/fd/c4/7efdc4ff014d8fb86131d8eadb5d678c.jpg",
  },
  {
    id: 7,
    name: "Women's Handbag",
    price: 1800,
    category: "Women",
    img: "https://i.pinimg.com/736x/b0/6f/c7/b06fc75af00784e2175ecb30fd8dfca4.jpg",
  },
  {
    id: 8,
    name: "Women's Boots",
    price: 4500,
    category: "Women",
    img: "https://i.pinimg.com/736x/db/eb/34/dbeb344f3f10617c18c489a28e146f47.jpg",
  },
  {
    id: 9,
    name: "Kids' Jacket",
    price: 1800,
    category: "Kids",
    img: "https://i.pinimg.com/736x/68/41/2f/68412f611f709e99824decb6e08e2953.jpg",
  },
  {
    id: 10,
    name: "Kids' Sneakers",
    price: 1600,
    category: "Kids",
    img: "https://i.pinimg.com/736x/1b/7b/85/1b7b85d1af36e87b0fdb73552a84e224.jpg",
  },
  {
    id: 11,
    name: "Kids' Hoodie",
    price: 1300,
    category: "Kids",
    img: "https://i.pinimg.com/736x/f6/c3/53/f6c3532b3914ef97a60401c33e5fff54.jpg",
  },
  {
    id: 12,
    name: "Kids' Pants",
    price: 900,
    category: "Kids",
    img: "https://i.pinimg.com/736x/8a/17/d5/8a17d51325f4e039ff7136ed975c7ca8.jpg",
  },
  {
    id: 13,
    name: "Sunglasses",
    price: 1200,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/79/e7/32/79e7327aa2b36c8df907ae1956640eac.jpg",
  },
  {
    id: 14,
    name: "Men's Watch",
    price: 5500,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/7b/e1/fb/7be1fbd875a8e1f1ab99860e60ae6b34.jpg",
  },
  {
    id: 15,
    name: "Women's Earrings",
    price: 1100,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/5b/28/d1/5b28d13d780620ca16fe61f9b1981e32.jpg",
  },
  {
    id: 16,
    name: "Women's Scarf",
    price: 900,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/fc/11/30/fc11301a882742e9ab58e712a8f56e82.jpg",
  },
  {
    id: 17,
    name: "Men's Cap",
    price: 700,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/c9/5e/0b/c95e0b7d40db1ededde55ee6df48fd55.jpg",
  },
  {
    id: 18,
    name: "Women's Hat",
    price: 850,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/85/59/5e/85595ecc3a2c1a3ec760fec34b6b4336.jpg",
  },
  {
    id: 19,
    name: "Men's Jeans",
    price: 2000,
    category: "Men",
    img: "https://i.pinimg.com/736x/12/79/cb/1279cbddd09cd725811f58cd8585f9ad.jpg",
  },
  {
    id: 20,
    name: "Men's Wallet",
    price: 1500,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/c2/53/03/c2530376d7d6dfc33b89d807ed04ae50.jpg",
  },
  {
    id: 21,
    name: "Women's Sunglasses",
    price: 1300,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/96/08/44/9608445cb5751c5e0030b731b519ef17.jpg",
  },
  {
    id: 22,
    name: "Women's Sandals",
    price: 2500,
    category: "Women",
    img: "https://i.pinimg.com/736x/9b/61/b8/9b61b83bf0def4107710ff16d36d52b7.jpg",
  },
  {
    id: 23,
    name: "Men's Belt",
    price: 1200,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/7f/4d/59/7f4d59d2e299265ebafa28ebe1c1b10e.jpg",
  },
  {
    id: 24,
    name: "Men's Hoodie",
    price: 1800,
    category: "Men",
    img: "https://i.pinimg.com/736x/8d/f8/a1/8df8a1dafca3214715f035cfe952c8f1.jpg",
  },
  {
    id: 25,
    name: "Women's Purse",
    price: 2200,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/d3/a3/85/d3a3854ca3367486c35a9f6edfff8c0d.jpg ",
  },
  {
    id: 26,
    name: "Kids' Hat",
    price: 600,
    category: "Kids",
    img: "https://i.pinimg.com/736x/a0/df/1b/a0df1b6345f289ee6e70d2a0d8f5fc0d.jpg",
  },
  {
    id: 27,
    name: "Men's Formal Shoes",
    price: 3500,
    category: "Men",
    img: "https://i.pinimg.com/736x/05/91/b4/0591b47c283bf34cd919db5548ef0750.jpg",
  },
  {
    id: 28,
    name: "Women's Necklace",
    price: 1800,
    category: "Accessories",
    img: "https://i.pinimg.com/736x/54/ee/6e/54ee6e38b84c35d64bdfdd66f6f2c625.jpg",
  },
  {
    id: 29,
    name: "Kids' Sandals",
    price: 1400,
    category: "Kids",
    img: "https://i.pinimg.com/736x/8a/90/b3/8a90b3073860d4fc54e657747eb822ea.jpg",
  },
  {
    id: 30,
    name: "Kids' Gloves",
    price: 800,
    category: "Kids",
    img: "https://i.pinimg.com/736x/b4/fe/c1/b4fec1616bb090443503f3e28c12b12b.jpg",
  },
];

// make a localStorage array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//  handlefilter
const handlefilter = (category) => {
  if (category == "All") {
    UImaker(products);
    return;
  }
  let temp = products.filter((ele) => ele.category == category);
  UImaker(temp);
};

// Make a UImaker
const UImaker = (products) => {
  let temp = "";
  for (let product of products) {
    temp += `
    <div class="product-card" data-aos="fade-up"
    data-aos-duration="1000">
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>`;
  }
  document.getElementById("product-container").innerHTML = temp;
};

// Add to Cart button
const addToCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = products.find((p) => p.id === id);
  0;

  const error = document.getElementById("allreday");
  if (!cart.some((item) => item.id === id)) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    // alert("Product already in cart!");
    error.style.display = "inline-block";
    setTimeout(() => {
      error.style.display = "none";
    }, 1000);
  }

  document.getElementById("cart-count").innerHTML = cart.length;
};

// lth-htl sorting

const sorting = (Orderby) => {
  if (Orderby === "lth") {
    let temp = products.sort((a, b) => a.price - b.price);
    UImaker(temp);
  } else if (Orderby === "htl") {
    let temp = products.sort((a, b) => b.price - a.price);
    UImaker(temp);
  }
};

// lth-htl btn
document.getElementById("lth").addEventListener("click", () => sorting("lth"));
document.getElementById("htl").addEventListener("click", () => sorting("htl"));

// live-search
const search = (value) => {
  let temp = products.filter((ele) =>
    ele.name.toLowerCase().includes(value.toLowerCase())
  );
  UImaker(temp);
};

document.getElementById("search-bar").addEventListener("input", () => {
  let value = document.getElementById("search-bar").value;
  search(value);
});
//  filter-buttons
document
  .getElementById("Men")
  .addEventListener("click", () => handlefilter("Men"));
document
  .getElementById("Women")
  .addEventListener("click", () => handlefilter("Women"));
document
  .getElementById("kids")
  .addEventListener("click", () => handlefilter("Kids"));
document
  .getElementById("Accessories")
  .addEventListener("click", () => handlefilter("Accessories"));
document
  .getElementById("All")
  .addEventListener("click", () => handlefilter("All"));

UImaker(products);
