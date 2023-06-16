
let apiUrl=`https://vouge-pocket-hogf.onrender.com/activities`;

fetchData(apiUrl);

async function fetchData(apiUrl){
    try{
         let res=await fetch(apiUrl);
         let data=await res.json();
         displayTreckData(data);
         data=data.filter((e)=>{
            return e.category==="trecking"
         });
         addlocation(data);
         displayTreckData(data.slice(0,3));//bydefault only one set of indexes 0,1,2 will be
         buttonappendTreck(data);
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
    let location=document.getElementById("treck-filterDestinations");
    location.innerHTML="";
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
                  buttonappendTreck(newData);
                  displayTreckData(newData);
            }
            if(newData.length>=3){
                buttonappendTreck(newData);
                displayTreckData(newData.slice(0,3));
                // this displaytreckData again calling for to show by default 
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
let treckbuttons=document.getElementById("treck-buttons");

function buttonappendTreck(arrtreck){
// console.log(arrtreck);
treckbuttons.innerHTML="";
let buttonsCount=Math.ceil(arrtreck.length/3);
  for(let i=0;i<buttonsCount;i++){
    let treckbtn=document.createElement("button");
    treckbtn.className=`treckbutton`;
    treckbtn.setAttribute("id",i);
    treckbtn.textContent=i+1;
   treckbtn.addEventListener("click",()=>{
    // console.log(treckbtn.getAttribute("id"));
    paginationbtnData(arrtreck,treckbtn.getAttribute("id"))
   })
    treckbuttons.append(treckbtn);
  }
}
function paginationbtnData(arr,id){
console.log(arr);
    let customTreckAr=undefined;
   
        // customTreckAr=arr;
        console.log(customTreckAr);
   
        customTreckAr=arr.slice(id*3,(id*3)+3);
        console.log(customTreckAr);
       
        displayTreckData(customTreckAr);    
   
}

let treckData=document.getElementById("treck-data");

function displayTreckData(data){
   treckData.innerHTML="";

   data.forEach((e)=>{
    let treckactivity=document.createElement("div");
    treckactivity.className=`treck-activity`;
    treckactivity.innerHTML=`
    <div class="treck-child-image"> 
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
 
    <h3>${e.title}</h3>
   <p>${e.description}</p>
    </div>
 </div>`

  
treckData.append(treckactivity);
   })
}

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
