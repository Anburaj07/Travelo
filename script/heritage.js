// let c=document.getElementById("class");
// c.addEventListener("click",()=>{
//     console.log("BBBBB");
// })

let apiUrl=`https://trypot-nation-dkah.onrender.com/activities`;

async function fetchData(apiUrl){
    try{
         let res=await fetch(apiUrl);
         let data=await res.json();
         data=data.filter((e)=>{
            return e.category==="heritage"
         });
         addlocation(data);
         displayheritageData(data.slice(0,3));//bydefault only one set of indexes 0,1,2 will be
         buttonappendheritage(data);
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
    let location=document.getElementById("heritage-filterDestinations");
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
                  buttonappendheritage(newData);
                  displayheritageData(newData);
            }
            if(newData.length>=3){
                buttonappendheritage(newData);
                displayheritageData(newData.slice(0,3));
                // this displayheritageData again calling for to show by default 
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
let heritagebuttons=document.getElementById("heritage-buttons");

function buttonappendheritage(arrheritage){
// console.log(arrheritage);
heritagebuttons.innerHTML="";
let buttonsCount=Math.ceil(arrheritage.length/3);
  for(let i=0;i<buttonsCount;i++){
    let heritagebtn=document.createElement("button");
    heritagebtn.className=`heritagebutton`;
    heritagebtn.setAttribute("id",i);
    heritagebtn.textContent=i+1;
   heritagebtn.addEventListener("click",()=>{
    // console.log(heritagebtn.getAttribute("id"));
    paginationbtnData(arrheritage,heritagebtn.getAttribute("id"))
   })
    heritagebuttons.append(heritagebtn);
  }
}
function paginationbtnData(arr,id){
console.log(arr);
    let customheritageAr=undefined;
   
        // customheritageAr=arr;
        console.log(customheritageAr);
   
        customheritageAr=arr.slice(id*3,(id*3)+3);
        console.log(customheritageAr);
       
        displayheritageData(customheritageAr);
    
   
}

// //////////////////////////////////////////////////
let heritageData=document.getElementById("heritage-data");

function displayheritageData(data){
   heritageData.innerHTML="";

   data.forEach((e)=>{
    let heritageactivity=document.createElement("div");
    heritageactivity.className=`heritage-activity`;
    heritageactivity.innerHTML=`
    <div class="heritage-child-image"> 
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
 
    <h2 class="heritage-Description">${e.title}</h2>
    <p>${e.description}</p>
    </div>
 </div>`
// console.log(e.description);
  
heritageData.append(heritageactivity);
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
