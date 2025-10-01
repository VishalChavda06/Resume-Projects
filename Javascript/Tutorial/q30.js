let a = "red";
let n = a.length;
let result = false;

for (let i = 0; i < n; i++) {
  if (a[i] == "a" || a[i] == "e" || a[i] == "o" || a[i] == "u" || a[i] == "i") {
    result = true;
    break;
  }
}

if (result == true) {
  console.log("true");
} else {
  console.log("false");
}
