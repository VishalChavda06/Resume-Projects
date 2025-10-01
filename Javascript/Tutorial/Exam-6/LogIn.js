let Users = JSON.parse(localStorage.getItem("Users")) || [];

const IsExist = (email) => {
  let isuser = Users.find((ele) => ele.email === email);
  if (isuser) {
    return { found: true, user: isuser };
  } else {
    return { found: false, user: isuser };
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  let userData = IsExist(user.email);

  console.log(userData);
  if (userData.found) {
    if (userData.user.password == user.password) {
      alert("Login SuccessFully...");
      document.getElementById("UserData").reset();
    } else {
      alert("Invalid password");
    }
  } else {
    alert("Invalid email");
  }
};

document.getElementById("UserData").addEventListener("submit", handleSubmit);
