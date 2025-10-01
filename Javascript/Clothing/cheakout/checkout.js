let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const orderItemsList = document.getElementById("order-items");
const finalPriceElement = document.getElementById("final-price");
const placeOrderBtn = document.getElementById("place-order-btn");
const cardDetails = document.querySelector(".card-details");

let finalTotal = 0;

// Display Cart Items in Order Summary
cartItems.forEach((item) => {
  // total = price*qty
  let itemTotal = item.price * item.quantity;
  finalTotal += itemTotal;

  let listItem = document.createElement("li");
  listItem.innerHTML = `${item.name} x${item.quantity} - $${itemTotal.toFixed(
    2
  )}`;
  orderItemsList.appendChild(listItem);
});

finalPriceElement.innerHTML = finalTotal.toFixed(2);

// Handle Payment
document.querySelectorAll("input[name='payment']").forEach((radio) => {
  radio.addEventListener("change", () => {
    if (this.value === "card") {
      cardDetails.style.display = "block";
    } else {
      cardDetails.style.display = "none";
    }
  });
});

// Place Order
placeOrderBtn.addEventListener("click", () => {
  let name = document.getElementById("name").value.trim();
  let address = document.getElementById("address").value.trim();
  let city = document.getElementById("city").value.trim();
  let zipcode = document.getElementById("zipcode").value.trim();
  let number = document.getElementById("number").value.trim();
  let paymentMethod = document.querySelector(
    "input[name='payment']:checked"
  ).value;

  if (!name || !address || !city || !zipcode || !number) {
    // alert("Please fill in all address details.");
    let border = document.getElementById("name");
    border.style.border = "2px solid red";
    setTimeout(() => {
      border.style.border = "2px solid #ddd";
    }, 1000);
    return;
  }

  if (paymentMethod === "card") {
    let cardNumber = document.getElementById("card-number").value.trim();
    let expiryDate = document.getElementById("expiry-date").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    let CardError = document.getElementById("card-number");
    let expiry = document.getElementById("expiry-date");
    let CVV = document.getElementById("cvv");
    if (!cardNumber || !expiryDate || !cvv) {
      // alert("Please enter valid card details.");
      CardError.style.border = "2px solid red";
      expiry.style.border = "2px solid red";
      CVV.style.border = "2px solid red";
      setTimeout(() => {
        CardError.style.border = "2px solid #ddd";
        expiry.style.border = "2px solid #ddd";
        CVV.style.border = "2px solid #ddd";
      }, 1000);
      return;
    }
  }
  let footer = document.getElementById("footer");
  let blur = document.getElementById("blur")
  // alert("Order placed successfully!");
  footer.style.display = "block";
  blur.style.filter = "blur(1px)"


  // Clear cart after order
  localStorage.removeItem("cart");
  setTimeout(() => {
    window.location.href = "/Clothing/HomePage/Home.html";
  }, 2010);
});


// loading

const counter = document.querySelector(".counter")
const bar = document.querySelector(".load-bar-font")

let idx = 0

const update = () => {
  counter.innerHTML = idx + "%"
  bar.style.width = idx + "%"
  idx++;
  if (idx < 101) {
    setTimeout(update, 90)
  }
}

update()
