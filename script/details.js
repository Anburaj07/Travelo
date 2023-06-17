

let selectedCardData = JSON.parse(localStorage.getItem("selectedCardData"));
let imgSliderContainer = document.getElementById("img-slider");
let contentContainer = imgSliderContainer.querySelector(".w3-content");

let priceShow = document.getElementById("priceshow");
priceShow.textContent = selectedCardData.price;

selectedCardData.image.forEach(function (imageUrl, index) {
  let slide = document.createElement("div");
  slide.className = "mySlides";

  let image = document.createElement("img");
  image.src = imageUrl;

  slide.append(image);
  contentContainer.append(slide);

  if (index === 0) {
    slide.style.display = "block";
  }
});

let slideIndex = 0;
let slides = imgSliderContainer.getElementsByClassName("mySlides");
let totalSlides = slides.length;

setInterval(function () {
    slides[slideIndex].style.display = "none";

    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }

    if (slideIndex === totalSlides) {
        slideIndex = 0; 
    }

    slides[slideIndex].style.display = "block";
}, 3000);


// *********************************************************************

let main_section = document.getElementById("card-description");
let staticDescrElement = document.getElementById("staticdescr");


let Api = "https://vouge-pocket-hogf.onrender.com/packages";
let package_id = selectedCardData.id;

function fetchData(url) {
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data);
            displayData(data);
        })
        .catch(function(err) {
            console.log(err);
        });
}
fetchData(`${Api}?id=${package_id}`);


function createCard(item) {
  let card = document.createElement("div");
  card.className = "details-card";
  card.id = item.id;

  let h1 = document.createElement("h1");
  h1.className = "details-card-name";
  h1.textContent = item.title;

  let p1 = document.createElement("p");
  p1.className="details-card-duration";
  p1.innerHTML = `<span><i class="fa-solid fa-clock fa-spin"></i></span>  ${item.duration}`;

  let p2 = document.createElement("p");
  p2.className="details-card-location";
  p2.innerHTML = `<span><i class="fa-solid fa-location-dot fa-flip"></i></span> ${item.location}`;

  let p3 = document.createElement("p");
  p3.className="details-card-destination";
  p3.innerHTML = `<span><i class="fa-solid fa-map-location"></i></span>  ${item.destination}`;

  let h2 = document.createElement("h2");
  p2.className="details-card-tour";
  h2.textContent = "Tour Itinerary";

  let detailsDiv = document.createElement("div");
  detailsDiv.className="details-div";

  let CardDetails = document.createElement("details");
  CardDetails.className="details-card-details";

  let summary = document.createElement("summary");
  summary.onclick = changeArrow;
  summary.innerHTML = `Description <i class="fa-sharp fa-solid fa-angle-down"></i>`;

  let ul = document.createElement("ul");
  item.description.forEach((liText) => {
    let li = document.createElement("li");
    li.textContent = liText;
    ul.appendChild(li);
  });

  CardDetails.append(summary,ul);

  detailsDiv.append(CardDetails);

  card.append(h1,p1,p2,p3,h2,detailsDiv);
  
  return card;
}

function displayData(data){
    main_section.innerHTML="";
    
    let cardList = document.createElement("div");
    cardList.className="details-card-list";

    data.forEach(item=>{
        let detailCard = createCard(item);
        cardList.append(detailCard);
    })
    main_section.append(cardList,staticDescrElement);
}

function changeArrow() {
     let arrow = document.querySelector(".fa-sharp");
     arrow.classList.toggle("fa-angle-up");
 }


 let BookNowBtn = document.getElementById("booknow");
 
 BookNowBtn.addEventListener("click",()=>{

    let user = JSON.parse(localStorage.getItem('user')) || [];

            if(user.length === 0){
                alert('Please login first');
                window.location.href = "login.html";
              
            }else{

                window.location.href = "checkout_tour.html";
            }

       
 })