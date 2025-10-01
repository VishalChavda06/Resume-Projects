let num = 10;
let sum = 0;

for (i = 1; i <= num; i++) {
  if (i % 2 === 0) {
    sum += i;
  }
}

console.log(sum);

// 2+4+6+8+10=30
// only for even number to sum
