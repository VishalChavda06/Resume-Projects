let coruse = "red and white";

let n = coruse.length;
let count = 0;
for (let i = 0; i < n; i++) {
  if (
    coruse[i] == "a" ||
    coruse[i] == "e" ||
    coruse[i] == "i" ||
    coruse[i] == "o" ||
    coruse[i] == "u"
  ) {
    count++;
  }
}

console.log(count);

// e-a-i-e = 4
