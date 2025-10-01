import usertypes from "../api/User.js";
import { getvalue } from "../utils/helper.js";


// make a handle login
const emmailinput = document.getElementById("email")
const passinput = document.getElementById("password")
const popup = document.getElementById("successPopup");

const handlelogin = async (user) => {

    let res = await usertypes.login(user);
    console.log(res)
    if (res.length == 0) {
        // alert('invalid email & password')
        emmailinput.style.border = "2px solid red"
        passinput.style.border = "2px solid red"
    }
    else {
        // alert('Your Account Active');
        localStorage.setItem("islogin", true)
        localStorage.setItem("user", JSON.stringify(res[0]));

        popup.classList.add("show");

        // Auto close after 2 seconds
        setTimeout(() => {
            window.location.href = "/Final-Project-js/Index.html";
            popup.classList.remove("show");
        }, 2100);

    }
}

const login = (e) => {
    e.preventDefault();
    let user = {
        email: getvalue("email"),
        password: getvalue("password"),
    }
    console.log(user);
    handlelogin(user)
}

document.getElementById("login").addEventListener("submit", login)