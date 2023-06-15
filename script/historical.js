let apiUrl=`https://vouge-pocket-hogf.onrender.com/activities`;

async function fetchData(apiUrl){
    try{
         let res=await fetch(apiUrl);
         let data=await res.json();
         data=data.filter((e)=>{
            return e.category==="historical"
         });
         addlocation(data);
         displayhistoricalData(data.slice(0,3));//bydefault only one set of indexes 0,1,2 will be
         buttonappendhistorical(data);
    }catch(err){
        console.log(err);
    }
};

// ---> add destination on page  <<--------------

function addlocation(data){
    let tempObj={};
    for(let i=0;i<data.length;i++){
        let ele=data[i].destination;
        if(tempObj[ele]===undefined){
            tempObj[ele]=1;
        }else{
            tempObj[ele]++;
        }
        // console.log(ele);
    }
    // console.log(tempObj);
    let location=document.getElementById("historical-filterDestinations");
    for(let key in tempObj){
        console.log(key);
        let li=document.createElement("li");
        li.className="locationName";
        li.textContent=key;
        li.addEventListener("click",()=>{
            let newData=data.filter((e)=>{
                return e.destination===key;
            });
            // console.log(newData);
            if(newData.length<3){
                  console.log(newData);
                  buttonappendhistorical(newData);
                  displayhistoricalData(newData);
            }
            if(newData.length>=3){
                buttonappendhistorical(newData);
                displayhistoricalData(newData.slice(0,3));
                // this displayhistoricalData again calling for to show by default 
                // page of new array from 0 to <3 index
            }
           
           
        })
        location.append(li);
    }

}
window.addEventListener("load",()=>{
    fetchData(apiUrl);
    
})

// ------------------------------>>>>>>>>>>paginating buttons<<<<<<<<<<----------------
let historicalbuttons=document.getElementById("historical-buttons");

function buttonappendhistorical(arrhistorical){
// console.log(arrhistorical);
historicalbuttons.innerHTML="";
let buttonsCount=Math.ceil(arrhistorical.length/3);
  for(let i=0;i<buttonsCount;i++){
    let historicalbtn=document.createElement("button");
    historicalbtn.className=`historicalbutton`;
    historicalbtn.setAttribute("id",i);
    historicalbtn.textContent=i+1;
   historicalbtn.addEventListener("click",()=>{
    // console.log(historicalbtn.getAttribute("id"));
    paginationbtnData(arrhistorical,historicalbtn.getAttribute("id"))
   })
    historicalbuttons.append(historicalbtn);
  }
}
function paginationbtnData(arr,id){
console.log(arr);
    let customhistoricalAr=undefined;
   
        // customhistoricalAr=arr;
        console.log(customhistoricalAr);
   
        customhistoricalAr=arr.slice(id*3,(id*3)+3);
        console.log(customhistoricalAr);
       
        displayhistoricalData(customhistoricalAr);
    
   
}

// //////////////////////////////////////////////

let historicalData=document.getElementById("historical-data");

function displayhistoricalData(data){
   historicalData.innerHTML="";

   data.forEach((e)=>{
    let historicalactivity=document.createElement("div");
    historicalactivity.className=`historical-activity`;
    historicalactivity.innerHTML=`
    <div class="historical-child-image"> 
    <div><img src="${e.image[0]}" alt=""></div> 
    <div>         
    <table>
   <tr><td>Rating </td><td>${e.rating}</td></tr>
   <tr><td>Destination </td><td>${e.destination}</td></tr>
   <tr><td>Location </td><td>${e.location}</td></tr>
   <tr><td>Duration </td><td>${e.duration}</td></tr>
   <tr><td>Price </td><td>${e.price||"Feel free to visit anytime"}</td></tr>
   </table>
    </div>
     </div>
    <div class="child-description">
 
    <h2 class="historical-Description">${e.title}</h2>
    <p>${e.description}</p>
    </div>
 </div>`
// console.log(e.description);
  
historicalData.append(historicalactivity);
   })
}


// -------->>>>>>>>>>More and less toggling <<--------


let more=document.getElementById("moretext");
more.style.display="none";

let morebtn=document.getElementById("morelessbutton");

morebtn.addEventListener("click",()=>{
   
    console.log(more.style.display);
    if(more.style.display==="none"){
        more.style.display="block";
        morebtn.textContent="Read less";
    }else{
        more.style.display="none";
        morebtn.textContent="Read more";
    }
});
