let arr = [10, 20, 30, 40, 50, 60];

let n = arr.length;

let max = arr[0];

for (let i = 0; i < n; i++) {
  if (max < arr[i]){
  max = arr[i];
  }
}
console.log(max);


// 60