let arr = [10, 20, 30, 40, 50, 60];

let n = arr.length;

let min = arr[0];

for (let i = 0; i < n; i++) {
  if (min > arr[i]){
  min = arr[i];
  }
}
console.log(min);

// 10
