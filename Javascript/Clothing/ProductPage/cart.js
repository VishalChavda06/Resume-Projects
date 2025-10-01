// let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
// const cartContainer = document.getElementById("cart-items");
// const totalPriceElement = document.getElementById("total-price");
// const checkoutBtn = document.getElementById("checkout-btn");

// const updateCart = () => {
//   cartContainer.innerHTML = "";
//   let finalTotal = 0;
//   let hasItems = false;

//   cartItems.forEach((item, index) => {
//     // Fix: Ensure quantity exists and is a number
//     if (!item.quantity || isNaN(item.quantity)) {
//       // by defalut 1
//       item.quantity = 1;
//     }
//     if (!item.price || isNaN(item.price)) {
//       item.price = 0;
//     }
//     // prince * quantity
//     let itemTotal = item.price * item.quantity;
//     finalTotal += itemTotal;

//     if (item.quantity > 0) hasItems = true;

//     let row = document.createElement("tr");
//     row.innerHTML = `
//               <td><img src="${item.img}" alt="${
//       item.name
//     }" class="cart-image"></td>
//               <td>${item.name || "Unnamed Product"}</td>
//               <td>$${item.price.toFixed(2)}</td>
//               <td>
//                   <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
//                   <span>${item.quantity}</span>
//                   <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
//               </td>
//               <td>$${itemTotal.toFixed(2)}</td>
//               <td><button class="remove-btn" data-index="${index}">Remove</button></td>
//           `;
//     cartContainer.appendChild(row);
//   });

//   totalPriceElement.innerHTML = finalTotal.toFixed(2);
//   localStorage.setItem("cart", JSON.stringify(cartItems));

//   // Disable checkout button if cart is empty
//   checkoutBtn.disabled = !hasItems;

//   // Quantity Buttons
//   document.querySelectorAll(".qty-btn").forEach((button) => {
//     button.addEventListener("click", function () {
//       let index = this.getAttribute("data-index");
//       let action = this.getAttribute("data-action");

//       if (action === "increase") {
//         cartItems[index].quantity++;
//       } else if (action === "decrease" && cartItems[index].quantity > 0) {
//         cartItems[index].quantity--;
//       }
//       updateCart();
//     });
//   });

//   // Remove Buttons
//   document.querySelectorAll(".remove-btn").forEach((button) => {
//     button.addEventListener("click", function () {
//       let index = this.getAttribute("data-index");
//       cartItems.splice(index, 1);
//       updateCart();
//     });
//   });

//   // Checkout Button
//   checkoutBtn.addEventListener("click", function () {
//     if (hasItems) {
//       // alert("Proceeding to Checkout!");
//       window.location.href = "/Clothing/cheakout/cheakout.html";
//       localStorage.removeItem("cart"); // Clear cart on checkout
//       updateCart(); // Refresh cart
//     }
//   });
// };
// document.querySelectorAll(".add-to-cart").forEach((button) => {
//   button.addEventListener("click", function () {
//     let product = {
//       name: this.getAttribute("data-name") || "Unnamed Product",
//       price: parseFloat(this.getAttribute("data-price")) || 0,
//       image: this.getAttribute("data-image") || "",
//       quantity: 0, // Default quantity is now properly set
//     };

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let existingItem = cart.find((item) => item.name === product.name);

//     if (!existingItem) {
//       cart.push(product);
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Product added to cart! Go to cart to increase quantity.");
//   });
// });

// updateCart();

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

const updateCart = () => {
  cartContainer.innerHTML = "";
  let finalTotal = 0;
  let hasItems = false;

  cartItems.forEach((item, index) => {
    if (!item.quantity || isNaN(item.quantity)) item.quantity = 1;
    if (!item.price || isNaN(item.price)) item.price = 0;

    let itemTotal = item.price * item.quantity;
    finalTotal += itemTotal;
    if (item.quantity > 0) hasItems = true;

    let row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.img}" alt="${item.name}" class="cart-image"></td>
      <td>${item.name || "Unnamed Product"}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
          <button id="decrease-${index}" class="qty-btn"> - </button> 
          <span id="quantity-${index}"> ${item.quantity}</span>
          <button id="increase-${index}" class="qty-btn"> + </button>
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button id="remove-${index}" class="remove-btn">Remove</button></td>
    `;
    cartContainer.appendChild(row);
  });

  totalPriceElement.innerHTML = finalTotal.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  checkoutBtn.disabled = !hasItems;

  // Quantity Buttons
  cartItems.forEach((_, index) => {
    document
      .getElementById(`increase-${index}`)
      .addEventListener("click", () => {
        cartItems[index].quantity++;
        updateCart();
      });

    document
      .getElementById(`decrease-${index}`)
      .addEventListener("click", () => {
        if (cartItems[index].quantity > 0) {
          cartItems[index].quantity--;
          updateCart();
        }
      });

    document.getElementById(`remove-${index}`).addEventListener("click", () => {
      cartItems.splice(index, 1);
      updateCart();
    });
  });

  checkoutBtn.addEventListener("click", () => {
    if (hasItems) {
      window.location.href = "/Clothing/cheakout/cheakout.html";
      localStorage.removeItem("cart");
      updateCart();
    }
  });
};

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    let product = {
      name: button.getAttribute("data-name") || "Unnamed Product",
      price: parseFloat(button.getAttribute("data-price")) || 0,
      image: button.getAttribute("data-image") || "",
      quantity: 0,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find((item) => item.name === product.name);

    if (!existingItem) {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart! Go to cart to increase quantity.");
  });
});

updateCart();
