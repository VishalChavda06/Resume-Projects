const nameinput = document.getElementById("name");
const emailinput = document.getElementById("email");
const passwordinput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");

const validatename = () => {
  const name = nameinput.value.trim();
  const nameerror = document.getElementById("name-error");

  if (name.length < 3) {
    nameerror.innerHTML = "Name must be at least 3 characters";
    nameinput.style.border = "2px solid red";
    return false;
  } else {
    nameerror.innerHTML = "";
    nameinput.style.border = "2px solid green";
    return true;
  }
};

const validateemail = () => {
  const email = emailinput.value.trim();
  const emailerror = document.getElementById("email-error");

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    emailerror.innerHTML = "Invalid email format";
    emailinput.style.border = "2px solid red";
    return false;
  } else {
    emailerror.innerHTML = "";
    emailinput.style.border = "2px solid green";
    return true;
  }
};

const validatepass = () => {
  // const passregex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const password = passwordinput.value.trim();
  const passworderror = document.getElementById("password-error");

  if (password.length < 6) {
    passworderror.innerHTML = "Enter valid password";
    passwordinput.style.border = "2px solid red";
    return false;
  } else {
    passworderror.innerHTML = "";
    passwordinput.style.border = "2px solid green";
    return true;
  }
};

const validateForm = () => {
  const isnamevalid = validatename();
  const isemailvalid = validateemail();
  const ispassvalid = validatepass();
  submitBtn.disabled = !(isnamevalid && isemailvalid && ispassvalid);
};

nameinput.addEventListener("input", validateForm, validatename);
emailinput.addEventListener("input", validateForm, validateemail);
passwordinput.addEventListener("input", validateForm, validatepass);

document.getElementById("userdata").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted successfully!");
});
