
const container = document.querySelector(".container");
let login_btn = document.querySelector("#login_btn");
email = document.querySelector("#email");
psswrd = document.querySelector("#password");
const API = "https://vouge-pocket-hogf.onrender.com/users";
login_btn.addEventListener("click", loginData);

function loginData() {
    
    let e = email.value;
    let p = psswrd.value;
    
    if(e=="admin" && p=="admin"){
        window.location.href="admin_dashboard.html"
    }

    if (e.length == 0) {
        alert("Please Enter UserName");
    } else if (p.length == 0) {
        alert("Please Enter Password");
    } else {
        loadData(e, p);
    }
}

async function loadData(e, p) {
    try {
        let res = await fetch(API);
        let data = await res.json();

        let flag = false;
        data.forEach(element => {
            if (element.email == e && element.password == p) {
                flag = true;
                localStorage.setItem('user', JSON.stringify({
                    name: element.name,
                    email: element.email,
                    password: element.password,
                    userid: element.id
                }));
                window.location.href = "index.html";
                return;
            }
        });
        if (flag === false) {
            alert("No Account Found! Login In Again !!");
        }
    } catch (error) {
        console.log(error);
    }
}