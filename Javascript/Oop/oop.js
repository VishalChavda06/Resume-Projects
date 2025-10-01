class student {
  constructor(name, number, GRID, year) {
    this.name = name;
    this.number = number;
    this.GRID = GRID;
    this.year = year;
  }
  // this.name = "vishal";
  // this.number = "9825405883"
  // age() {
  //   const date = new Date();
  //   return date.getFullYear();
  //   this.year;
  // }
}

// this.name = name;
// this.number = number;

let std = new student("vishal", 9825405883, 9066, 19);
let std1 = new student("nil", 9825472224, 9856, 25);
console.log(std, std1);
const printDetails = () => {
  console.log(
    `name:${this.name} number : ${this.number} GRID: ${this.GRID} year : ${this.year} `
  );
};

printDetails();
