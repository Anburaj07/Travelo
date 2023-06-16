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
            return e.category==="camping"
         });
         addlocation(data);
         displaycampData(data.slice(0,3));//bydefault only one set of indexes 0,1,2 will be
         buttonappendcamp(data);
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
    let location=document.getElementById("camp-filterDestinations");
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
                  buttonappendcamp(newData);
                  displaycampData(newData);
            }
            if(newData.length>=3){
                buttonappendcamp(newData);
                displaycampData(newData.slice(0,3));
                // this displaycampData again calling for to show by default 
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
let campbuttons=document.getElementById("camp-buttons");

function buttonappendcamp(arrcamp){
// console.log(arrcamp);
campbuttons.innerHTML="";
let buttonsCount=Math.ceil(arrcamp.length/3);
  for(let i=0;i<buttonsCount;i++){
    let campbtn=document.createElement("button");
    campbtn.className=`campbutton`;
    campbtn.setAttribute("id",i);
    campbtn.textContent=i+1;
   campbtn.addEventListener("click",()=>{
    // console.log(campbtn.getAttribute("id"));
    paginationbtnData(arrcamp,campbtn.getAttribute("id"))
   })
    campbuttons.append(campbtn);
  }
}
function paginationbtnData(arr,id){
console.log(arr);
    let customcampAr=undefined;
   
        // customcampAr=arr;
        console.log(customcampAr);
   
        customcampAr=arr.slice(id*3,(id*3)+3);
        console.log(customcampAr);
       
        displaycampData(customcampAr);
    
   
}
// //////////////////////////////////////////////////////////
let campData=document.getElementById("camp-data");

function displaycampData(data){
   campData.innerHTML="";

   data.forEach((e)=>{
    let campactivity=document.createElement("div");
    campactivity.className=`camp-activity`;
    campactivity.innerHTML=`
    <div class="camp-child-image"> 
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
 
    <h2 class="camp-Description">${e.title}</h2>
    <p>${e.description}</p>
    </div>
 </div>`
// console.log(e.description);
  
campData.append(campactivity);
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

