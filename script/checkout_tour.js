

    

    let packageContainer = document.getElementById("checkout-package");
    let selectedCardData = JSON.parse(localStorage.getItem("selectedCardData"));
    let Api = "https://vouge-pocket-hogf.onrender.com/packages";
    let package_id = selectedCardData.id;

   

    

    function fetchData(url) {
      fetch(url)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
          displayCard(data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    fetchData(`${Api}?id=${package_id}`);

    function createCard(item) {
      let card = document.createElement("div");
      card.className = "checkout-package-card";
      card.id = item.id;

      let cardImg = document.createElement("div");
      cardImg.className = "checkout-package-img-card";

      let img = document.createElement("img");
      img.className = "checkout-package-img";
      img.src = item.image[0];
      img.setAttribute("alt", "Pic");

      cardImg.append(img);

      let cardBody = document.createElement("div");
      cardBody.className = "checkout-package-card-body";

      let cardDesBody = document.createElement("div");
      cardDesBody.className = "checkout-package-duration-price";
      cardDesBody.style = "display:flex; justify-content:space-between; align-item:center";

      let p1 = document.createElement("p");
      p1.className = "checkout-package-duration";
      p1.textContent = item.duration;

      let p2 = document.createElement("p");
      p2.className = "checkout-package-price";
      p2.textContent = "₹" + item.price;

      cardDesBody.append(p1, p2);

      let h3 = document.createElement("h3");
      h3.className = "checkout-package-title";
      h3.textContent = item.title;

      let p3 = document.createElement("p");
      p3.className = "checkout-package-name";
      p3.textContent = item.destination;

      let inputMemberDiv = document.createElement("div");
      inputMemberDiv.className = "inputmember";

      let memberTotal = document.createElement("p");
      memberTotal.textContent = "Total Member : ";

      let increaseButton = document.createElement("button");
      increaseButton.className = "incre";
      increaseButton.textContent = "+";

      let memberInput = document.createElement("input");
      memberInput.type = "number";
      memberInput.value = "1";
      memberInput.className = "member";
      memberInput.min = "1";

      decreaseButton = document.createElement("button");
      decreaseButton.className = "decre";
      decreaseButton.textContent = "-";

      increaseButton.addEventListener("click", function () {
        let currentCount = parseInt(memberInput.value);
        memberInput.value = currentCount + 1;
        updatePrice();
      });

      decreaseButton.addEventListener("click", function () {
        let currentCount = parseInt(memberInput.value);
        if (currentCount > 1) {
          memberInput.value = currentCount - 1;
          updatePrice();
        }
      });

      inputMemberDiv.append(memberTotal, increaseButton, memberInput, decreaseButton);

      cardBody.append(cardDesBody, h3, p3, inputMemberDiv);

      card.append(cardImg, cardBody);

      return card;
    }

    function displayCard(data) {
      packageContainer.innerHTML = "";
      let cardList = document.createElement("div");
      cardList.className = "checkout-package-card-list";

      data.forEach((item) => {
        let packageCard = createCard(item);
        cardList.append(packageCard);
      });
      packageContainer.append(cardList);

      updatePrice();
    }

    function updatePrice() {
        let memberInput = document.querySelector(".member");
        let totalPriceElement = document.getElementById("total-price");
        let packagePriceElement = document.querySelector(".checkout-package-price");
        let memberCount = parseInt(memberInput.value);
        let packagePrice = parseInt(selectedCardData.price);
        let totalPrice = memberCount * packagePrice;
        totalPriceElement.textContent = "₹" + totalPrice;
        packagePriceElement.textContent = "₹" + totalPrice;
    }
   

// *********************************************************



function toggleCardDetails() {
      var paymentOption = document.getElementById("paymentOption");
      var cardDetails = document.getElementById("cardDetails");

      if (paymentOption.value === "debitCard") {
        cardDetails.style.display = "block";
      } else {
        cardDetails.style.display = "none";
      }
    }

    function processPayment() {
      var paymentOption = document.getElementById("paymentOption").value;
      if (paymentOption === "cash") {
        alert("Payment successful!");
        saveBookingDetails();
        postingData();
        // window.location.href = "index.html";
      } else if (paymentOption === "debitCard") {
        var cardNumber = document.getElementById("cardNumber").value;
        var cvv = document.getElementById("cvv").value;
        var username = document.getElementById("username").value;
    
        if (cardNumber && cvv && username) {
          alert("Payment successful!");
          saveBookingDetails();
          postingData();
          // window.location.href = "index.html";
        } else {
          alert("Please fill in all the card details.");
        }
      }
    }
    
    const SalesAPI = "https://vouge-pocket-hogf.onrender.com/sales";
    let userdata = JSON.parse(localStorage.getItem('user')) || [];
    
    let selectedPackage;
    let memberCount;
    let totalPrice;
    
    function saveBookingDetails() {
      selectedPackage = JSON.parse(localStorage.getItem("selectedCardData"));
      if (selectedPackage && selectedPackage.title) {
        var memberInput = document.querySelector(".member");
        memberCount = parseInt(memberInput.value);
        var totalPriceElement = document.getElementById("total-price");
        totalPrice = parseInt(totalPriceElement.textContent.replace("₹", ""));
    
        var bookingDetails = {
          packageName: selectedPackage.title,
          totalMembers: memberCount,
          totalPrice: totalPrice,
          duration: selectedPackage.duration,
          destination: selectedPackage.destination
        };
    
        var bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(bookingDetails);
        localStorage.setItem("bookings", JSON.stringify(bookings));
      } else {
        console.error("Selected package data is undefined or missing 'title' property.");
      }
    }
    
    async function postingData() {
      if (selectedPackage && selectedPackage.title) {
        try {
          let res = await fetch(SalesAPI, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              package_name: selectedPackage.title,
              name: userdata.name,
              email: userdata.email,
              totalMembers: memberCount,
              timestamp: "Placeholder Package",
              bill: totalPrice
            }),
          });
          if (res.ok) {
            window.location.href = "index.html";
          } else {
            console.error("Failed to post data to SalesAPI. Response status:", res.status);
          }
        } catch (error) {
          console.error("An error occurred while posting data to SalesAPI:", error);
        }
      } else {
        console.error("Selected package data is undefined or missing 'title' property.");
      }
    }
    