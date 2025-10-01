// Get a elements
const searchInput = document.querySelector(".search-bar");
const productCards = document.querySelectorAll(".product-card");

// Search Functionality
searchInput.addEventListener("input", () => {
  let query = searchInput.value.toLowerCase();
  productCards.forEach((card) => {
    let productName = card.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// make a silder

const hero = document.getElementById("hero-banner");

const backgrounds = [
  "url('https://img.freepik.com/free-photo/stylish-happy-girl-shopping-portrait-modern-woman-with-shop-bag-laughing-smiling-satisfied_1258-119361.jpg?t=st=1743747770~exp=1743751370~hmac=dd4fb62232945750a7ba99d44529815d4efe745bd7fd6d065f8559df11d95ab9&w=1380')",
  "url('https://img.freepik.com/free-photo/travel-concept-close-up-portrait-young-beautiful-attractive-ginger-red-hair-girl-with-trendy-hat_1258-124917.jpg?ga=GA1.1.1933236290.1742978977&semt=ais_hybrid&w=740')",
  "url('https://img.freepik.com/premium-photo/flat-lay-set-feminine-clothe-marine-style-mother-daughter_73558-78.jpg?ga=GA1.1.1933236290.1742978977&semt=ais_hybrid&w=740')",
];

let index = 0;

const changeBackground = () => {
  hero.style.backgroundImage = backgrounds[index];
  index = (index + 1) % backgrounds.length;
};

changeBackground(); // Set initial
setInterval(changeBackground, 3000); // Change every 5 sec
