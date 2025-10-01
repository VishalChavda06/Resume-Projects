// import navbar from "../components/navbar.js";
import usertypes from "../api/User.js";
import { getvalue } from "../utils/helper.js"

// document.getElementById("navbar").innerHTML = navbar()

const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
        name: getvalue("name"),
        email: getvalue("email"),
        password: getvalue("password")
    }
    console.log(user);
    usertypes.create(user);
    window.location.href = "/Final-Project-js/Pages/Login.html";
   
    
}


document.getElementById("userinformations").addEventListener("submit", handleSubmit)