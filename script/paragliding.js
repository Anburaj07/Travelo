// let c=document.getElementById("class");
// c.addEventListener("click",()=>{
//     console.log("BBBBB");
// })

let apiUrl=`https://vouge-pocket-hogf.onrender.com/activities`;

async function fetchData(apiUrl){
    try{
         let res=await fetch(apiUrl);
         let data=await res.json();
         data=data.filter((e)=>{
            return e.category==="paragliding"
         });
         addlocation(data);
         displayparaData(data.slice(0,3));//bydefault only one set of indexes 0,1,2 will be
         buttonappendpara(data);
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
    let location=document.getElementById("para-filterDestinations");
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
                  buttonappendpara(newData);
                  displayparaData(newData);
            }
            if(newData.length>=3){
                buttonappendpara(newData);
                displayparaData(newData.slice(0,3));
                // this displayparaData again calling for to show by default 
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
let parabuttons=document.getElementById("para-buttons");

function buttonappendpara(arrpara){
// console.log(arrpara);
parabuttons.innerHTML="";
let buttonsCount=Math.ceil(arrpara.length/3);
  for(let i=0;i<buttonsCount;i++){
    let parabtn=document.createElement("button");
    parabtn.className=`parabutton`;
    parabtn.setAttribute("id",i);
    parabtn.textContent=i+1;
   parabtn.addEventListener("click",()=>{
    // console.log(parabtn.getAttribute("id"));
    paginationbtnData(arrpara,parabtn.getAttribute("id"))
   })
    parabuttons.append(parabtn);
  }
}
function paginationbtnData(arr,id){
console.log(arr);
    let customparaAr=undefined;
   
        // customparaAr=arr;
        console.log(customparaAr);
   
        customparaAr=arr.slice(id*3,(id*3)+3);
        console.log(customparaAr);
       
        displayparaData(customparaAr);
    
   
}


let paraData=document.getElementById("para-data");

function displayparaData(data){
   paraData.innerHTML="";

   data.forEach((e)=>{
    let paraactivity=document.createElement("div");
    paraactivity.className=`para-activity`;
    paraactivity.innerHTML=`
    <div class="para-child-image"> 
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
 
    <h2 class="para-Description">${e.title}</h2>
    <p>${e.description}</p>
    </div>
 </div>`
// console.log(e.description);
  
paraData.append(paraactivity);
   });
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
