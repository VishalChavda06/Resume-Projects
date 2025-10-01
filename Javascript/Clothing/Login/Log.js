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
  const emailerror = document.getElementById("email-error");
  const passregex = document.getElementById("password-error");
  const SuccessFully = document.getElementById("success");
  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  let userData = IsExist(user.email);

  console.log(userData);
  if (userData.found) {
    if (userData.user.password == user.password) {
      // alert("Login SuccessFully...");
      SuccessFully.style.display = "inline-block";
      setTimeout(() => {
        window.location.href = "/Clothing/HomePage/Home.html";
      }, 1500);
    } else {
      // alert("Invalid password");
      passregex.innerHTML = "Invalid Password";
      passregex.style.color = "red";
    }
  } else {
    // alert("Invalid email");
    emailerror.innerHTML = "Invalid email";
    emailerror.style.color = "red";
  }
};


document.getElementById("authForm").addEventListener("submit", handleSubmit);
