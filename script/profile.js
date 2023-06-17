
let topSection = document.getElementById("first");
let main_section=document.getElementById("container");

const UserAPI = "https://vouge-pocket-hogf.onrender.com/users";
const SalesAPI = "https://vouge-pocket-hogf.onrender.com/sales";

let userData = JSON.parse(localStorage.getItem('user')) || [];

let Img = document.querySelector(".img");

let userId = userData.userid;
userEmail = userData.email;
// console.log(userEmail);
// console.log(userId);

fetchData(`${UserAPI}/${userId}`);

function fetchData(url) {
 fetch(url)
  .then(function(res) {
      return res.json();
  })
  .then(function(data) {
    console.log(data);
      createCard(data);
     
  })
  .catch(function(err) {
      console.log(err);
  });
}


function createCard(item) {
main_section.innerHTML="";
let cardList = document.createElement("div");
cardList.className="desc-card-list";

let card = document.createElement("div");
card.className = "desc-card";

let img = document.createElement("img");
img.className="img";
img.src="https://th.bing.com/th/id/OIP.1f4L8uI7SgYFrlQ1taL1YgHaHa?w=216&h=216&c=7&r=0&o=5&dpr=1.5&pid=1.7" 

let h2 = document.createElement("h2");
h2.className = "desc-card-name";
h2.textContent = item.name;

let p1 = document.createElement("p");
p1.className="details-card-email";
p1.innerHTML = "Email :"+ item.email;

let p2 = document.createElement("p");
p2.className="details-card-country";
p2.innerHTML ="Country : India";


let logoutBtn = document.createElement("button");
logoutBtn.className="desc-card-button";
logoutBtn.textContent = "Logout";

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = "index.html";
})
card.append(h2,p1,p2,logoutBtn);
cardList.append(card);
main_section.append(img,cardList);


return main_section;
}

let OrederContainer = document.getElementById("orderhistory");

function createOrderCard(item) {

let card = document.createElement("div");
card.className = "profile-package-card";

let h2 = document.createElement("h2");
h2.className = "profile-package-card-title";
h2.textContent = item.package_name;

let p1 = document.createElement("p");
p1.className="profile-package-card-name";
p1.innerHTML = "Ordered By :   "+ item.name;

let p2 = document.createElement("p");
p2.className="profilr-package-card-member";
p2.innerHTML ="Total Members :   "+ item.totalMembers;

let p3 = document.createElement("p");
p3.className="profilr-package-card-bill";
p3.innerHTML ="Total Bill :   "+ item.bill;


let removeBtn = document.createElement("button");
removeBtn.className = "remove-btn";
removeBtn.textContent = "Remove";

removeBtn.addEventListener("click", () => {
    card.remove();
    removeOrder(item.id);
});

card.append(h2, p1, p2, p3, removeBtn);


return card;
}

function displayOrderCard(data){
OrederContainer.innerHTML="";
let cardList = document.createElement("div");
cardList.className="profile-package-card-list";

data.forEach(item=>{
  let OrederCard = createOrderCard(item);
  cardList.append(OrederCard);
})
OrederContainer.append(cardList);
}



fetchSaleData(`${SalesAPI}?email=${userEmail}`);

function fetchSaleData(url) {
 fetch(url)
  .then(function(res) {
      return res.json();
  })
  .then(function(data) {
      console.log(data);
      displayOrderCard(data);
      
     
  })
  .catch(function(err) {
      console.log(err);
  });
}


function removeOrder(orderId) {
    const deleteUrl = `${SalesAPI}/${orderId}`;
  
    fetch(deleteUrl, {
      method: "DELETE"
    })
      .then(function (res) {
        if (res.ok) {
          console.log("Order removed successfully from the API.");
        } else {
          throw new Error("Failed to remove order from the API.");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }