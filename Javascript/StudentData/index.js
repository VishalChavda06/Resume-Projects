let students = [];

// All deleted function
function handleAllDelted() {
  students = "";
  uimaker();
}

// deleted function
const handleDeleted = (index) => {
  students.splice(index, 1);
  uimaker();
};

// make a function map useing
const uimaker = () => {
  studentList = document.getElementById("studentList").innerHTML = "";
  students.map((ele, i) => {
    // add a table data
    let td1 = document.createElement("td");
    td1.innerHTML = ele.name;
    let td2 = document.createElement("td");
    td2.innerHTML = ele.email;
    let td3 = document.createElement("td");
    td3.innerHTML = ele.cousre;
    let td4 = document.createElement("td");
    td4.innerHTML = ele.fee;
    let td5 = document.createElement("td");
    td5.innerHTML = ele.number;
    // add deleted button
    let btn = document.createElement("button");
    btn.innerHTML = "deleted";
    let td6 = document.createElement("td");
    td6.append(btn);
    // deleted anyway data buttons
    btn.addEventListener("click", () => handleDeleted(i));
    // add the row in table
    let tr = document.createElement("tr");
    tr.append(td1, td2, td3, td4, td5, td6);
    // final output
    document.getElementById("studentList").append(tr);
  });
};
// input values
const sell = (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let cousre = document.getElementById("cousre").value;
  let fee = document.getElementById("fee").value;
  let number = document.getElementById("number").value;
  // console.log(name, email, cousre, fee);

  // create a object
  let student = {
    name: name,
    email: email,
    cousre: cousre,
    fee: fee,
    number: number,
  };

  students.push(student);
  // console.log(students);  array print

  // call function
  uimaker();
};

document.getElementById("StudentData").addEventListener("submit", sell);
