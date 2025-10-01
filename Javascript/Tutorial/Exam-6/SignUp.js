let Users = JSON.parse(localStorage.getItem("Users")) || [];

const IsExist = (email) => {
  let isuser = Users.find((ele) => ele.email === email);
  if (isuser) {
    return true;
  } else {
    return false;
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  let user = {
    username: document.getElementById("Username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    number: document.getElementById("number").value,
  };
  console.log(user);
  if (IsExist(user.email)) {
    alert("User Alreday Exist..");
    return;
  } else {
    Users.push(user);
    localStorage.setItem("Users", JSON.stringify(Users));
    alert("User Create A SuccessFully..");
    window.location.href = "/Tutorial/Exam-6/LogIn.html";
  }
  //   console.log(user);
};

document.getElementById("UserData").addEventListener("submit", handleSubmit);
