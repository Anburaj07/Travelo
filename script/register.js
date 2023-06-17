
let email = document.getElementById("email");
let password = document.getElementById("password");
let conpassword = document.querySelector('#conpassword');
let user_name = document.getElementById("user_name");
let register = document.getElementById("register");

// console.log("222");
register.addEventListener("click", registerData);

function registerData() {

    if (email.value.length == 0) {
        alert("please Enter Email");
    } else if (password.value.length == 0) {
        alert("please Enter Password");
    } else if (user_name.value.length == 0) {
        alert("please Enter User Name");
    } else if (conpassword.value.length == 0) {
        alert("please Enter Confirm Password");
    }
    else if (conpassword.value !== password.value) {
        alert("Password Doesn't Match");
    }
    else {
        loadData(email.value, password.value, user_name.value);
    }
}
const API = "https://vouge-pocket-hogf.onrender.com/users";

async function loadData(email, password, username) {
    let obj = {
        email: email,
        password: password,
        name: username,
    };

    try {
        let check = await fetch(API);
        let data = await check.json();

        data.forEach(element => {
            if (element.email == email) {
                alert(`Email already registered`);
                window.location.reload();
                return;
            }
        });

        let res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        if (res.ok) {
            let data = await res.json();
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            window.location = "login.html";
        } else {
            alert("Something went wrong, please try after sometime.");
        }

    } catch (error) {
        console.log(error);
    }



}