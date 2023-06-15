
let apiUrl=`https://vouge-pocket-hogf.onrender.com/activities`;
let paginationscuba=document.getElementById("scubapage-button");

async function fetchData(apiUrl){
    try{
         let res=await fetch(apiUrl);
         let data=await res.json();
         data=data.filter((e)=>{
            return e.category==="scubadiving"
         });
         addlocation(data);
         displayscubaData(data.slice(0,3));//bydefault only one set of indexes 0,1,2 will be append;
         buttonappendscuba(data);
    }catch(err){
        console.log(err);
    }
};

// ---> add destination on page  <<-------------------------
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
    let location=document.getElementById("scuba-filterDestinations");
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
                  buttonappendscuba(newData);
                  displayscubaData(newData);
            }
            if(newData.length>=3){
                buttonappendscuba(newData);
                displayscubaData(newData.slice(0,3));
                // this displayscubaData again calling for to show by default 
                // page of new array from 0 to <3 index
            }
           
           
        })
        location.append(li);
    }

}
// /////////////////////////////////////////////////////////////
window.addEventListener("load",()=>{
    fetchData(apiUrl);
    
})

// ------------------------------>>>>>>>>>>paginating buttons<<<<<<<<<<----------------
let scubabuttons=document.getElementById("scuba-buttons");

function buttonappendscuba(arrscuba){
// console.log(arrscuba);
scubabuttons.innerHTML="";
let buttonsCount=Math.ceil(arrscuba.length/3);
  for(let i=0;i<buttonsCount;i++){
    let scubabtn=document.createElement("button");
    scubabtn.className=`scubabutton`;
    scubabtn.setAttribute("id",i);
    scubabtn.textContent=i+1;
   scubabtn.addEventListener("click",()=>{
    // console.log(scubabtn.getAttribute("id"));
    paginationbtnData(arrscuba,scubabtn.getAttribute("id"))
   })
    scubabuttons.append(scubabtn);
  }
}
function paginationbtnData(arr,id){
console.log(arr);
    let customscubaAr=undefined;
   
        // customscubaAr=arr;
        console.log(customscubaAr);
   
        customscubaAr=arr.slice(id*3,(id*3)+3);
        console.log(customscubaAr);
       
        displayscubaData(customscubaAr);
    
   
}
// ////////////////////////////////////////////
let scubaData=document.getElementById("scuba-data");

function displayscubaData(data){
   scubaData.innerHTML="";

   data.forEach((e)=>{
    let scubaactivity=document.createElement("div");
    scubaactivity.className=`scuba-activity`;
    scubaactivity.innerHTML=`
    <div class="scuba-child-image"> 
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
 
    <h2 class="scuba-Description">${e.title}</h2>
    <p>${e.description}</p>
    </div>
 </div>`
// console.log(e.description);
  
scubaData.append(scubaactivity);
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
