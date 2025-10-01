const container = document.querySelector(".ShowData");
// Fetch API
fetch("https://fakestoreapi.com/products/")
  .then(response => response.json())
  .then(users => {
    container.innerHTML = "";
    // Loop UI
    users.forEach(user => {
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `
        <div class="content">
            <img src="${user.image}" alt="">
            <h2 class="title">${user.title}</h2>
            <span class="price">$${user.price}</span>
            <p class="desc">${user.description}</p>
            <h4 class="category">${user.category}</h4>
            <span class="reating">${user.rating.rate}</span>
        </div>
      `;
      container.appendChild(userDiv);
    });
  })
  .catch(error => {
    container.innerHTML = "Failed to load data.";
    // console.error("Error fetching data:", error);
  });
