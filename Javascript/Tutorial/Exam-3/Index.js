let Emoplyes = [];

// All deleted function
function AllDeltedEntry() {
  Emoplyes = [] = "";
  EmoplyeMain();
}

// deleted function
const SingleEntry = (index) => {
  Emoplyes.splice(index, 1);
  EmoplyeMain();
};

// make a function map useing
const EmoplyeMain = () => {
  EmoplyesList = document.getElementById("EmoplyesList").innerHTML = "";
  Emoplyes.map((ele, i) => {
    // add a table data
    let td1 = document.createElement("td");
    td1.innerHTML = ele.name;
    let td2 = document.createElement("td");
    td2.innerHTML = ele.email;
    let td3 = document.createElement("td");
    td3.innerHTML = ele.number;
    let td4 = document.createElement("td");
    td4.innerHTML = ele.jobroll;
    let td5 = document.createElement("td");
    td5.innerHTML = ele.salary;
    let td6 = document.createElement("td");
    td6.innerHTML = ele.expersions;
    let td7 = document.createElement("td");
    td7.innerHTML = ele.expersionsLevels;
    let img = document.createElement("img");
    img.src = ele.img;
    let td8 = document.createElement("td");
    td8.append(img);
    // add deleted button
    let btn = document.createElement("button");
    btn.innerHTML = "deleted";
    let td9 = document.createElement("td");
    td9.append(btn);
    // deleted anyway data buttons
    btn.addEventListener("click", () => SingleEntry(i));
    // add the row in table
    let tr = document.createElement("tr");
    tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9);
    // final output
    document.getElementById("EmoplyesList").append(tr);
  });
};
// input values
// document
//   .getElementById("EmpolyeDataEntry")
//   .addEventListener("submit",
const sell = (e) => {
  e.preventDefault();
  let name = document.getElementById("Name").value;
  let email = document.getElementById("email").value;
  let number = document.getElementById("number").value;
  let jobroll = document.getElementById("Job-Roll").value;
  let salary = document.getElementById("salary").value;
  let expersions = document.getElementById("expersions").value;
  // make a conditions juniar-Medium-Senior
  let expersionsLevels = "";
  if (expersions < 3) {
    expersionsLevels = " Junior";
  } else if (expersions >= 3 && expersions < 5) {
    expersionsLevels = "Medium";
  } else {
    expersionsLevels = "Senior";
  }

  let img = document.getElementById("image").value;

  // console.log(expersions);
  // if (expersions > 1 && expersions < 3) {
  //   console.log("juniar");
  // }
  // create a object
  let Emoplye = {
    name: name,
    email: email,
    number: number,
    jobroll: jobroll,
    salary: salary,
    expersions: expersions,
    expersionsLevels: expersionsLevels,
    img: img,
  };

  Emoplyes.push(Emoplye);

  // call function
  EmoplyeMain();
};

document.getElementById("EmpolyeDataEntry").addEventListener("submit", sell);
