let UsernameInput = document.getElementById("Username");
let PasswordInput = document.getElementById("Password");
const submitBtn = document.getElementById("submitBtn");

const validatename = () => {
  let name = UsernameInput.value.trim();
  let nameerror = document.getElementById("name-error");
  console.log(name);

  if (name.length < 4) {
    nameerror.innerHTML = "Enter the valid name";
    UsernameInput.style.border = "3px solid red";
    return false;
  } else {
    nameerror.innerHTML = "";
    UsernameInput.style.border = "3px solid green";
    nameerror.style.color - "green";
    return true;
  }
};
const validatpass = () => {
  let password = PasswordInput.value.trim();
  let passworderror = document.getElementById("password-error");
  console.log(password);
  //   let passregex = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;
  if (password.length < 6) {
    passworderror.innerHTML = "Enter the 6 characters Minimum";
    PasswordInput.style.border = "3px solid red";
    return false;
  } else {
    passworderror.innerHTML = "";
    PasswordInput.style.border = "3px solid green";
    return true;
  }
};

const validateForm = () => {
  const isnamevalid = validatename();
  const ispassvalid = validatpass();
  submitBtn.disabled = !(isnamevalid && ispassvalid);
};

UsernameInput.addEventListener("input", validateForm, validatename);
PasswordInput.addEventListener("input", validateForm, validatpass);

document.getElementById("Information").addEventListener("submit", (e) => {
  e.preventDefault();
  // alert("Done");
  // change a html page
  window.location.href = "Homepage.html";
});
