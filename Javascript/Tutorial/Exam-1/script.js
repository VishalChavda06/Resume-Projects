function calculateBill() {
  let use = document.getElementById("valueofA").value;
  let amount = 0;

  if (use >= 0 && use <= 50) {
    amount = use * 5 + 100;
  } else if (use > 50 && use <= 100) {
    amount = (use - 50) * 10 + 5 * 50 + 100;
  } else if (use > 100 && use <= 150) {
    amount = (use - 100) * 15 + 5 * 50 + 50 * 10 + 100;
  } else {
    amount = (use - 150) * 20 + 1600;
    // return;
  }

  document.getElementById("result").innerText = `Total amount: ₹${amount}`;
}
