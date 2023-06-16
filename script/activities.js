//trekking
let treckimg=["https://images.pexels.com/photos/1980877/pexels-photo-1980877.jpeg?auto=compress&cs=tinysrgb&w=400",
           "https://i.pinimg.com/564x/4b/73/cf/4b73cf69cc6ad12d61a06febe7151273.jpg","https://i.pinimg.com/564x/4a/35/9f/4a359f67025a407fd23efd36df65b4f4.jpg"];
let treck=document.getElementById("treck");
treck.addEventListener('click',function(){
    window.location.href="trecking.html"
})
let leftbtn=document.querySelector(".left");
treck.src=treckimg[0];
let i=treckimg.length-1;
leftbtn.addEventListener("click",()=>{
    if(i>=0){
        treck.src=treckimg[i]
        console.log(i);
        i--
    }else if(i<0){
        i=treckimg.length-1;
    }
});
let rightbtn=document.querySelector(".right");
rightbtn.addEventListener("click",()=>{
    console.log(i);
    treck.src=treckimg[i];
    i++;
    if(i>treckimg.length-1){
        i=0;
    }
    
})

//scuba diving
let scubaimg=["https://images.pexels.com/photos/13577528/pexels-photo-13577528.jpeg?auto=compress&cs=tinysrgb&w=400","https://images.pexels.com/photos/14565669/pexels-photo-14565669.jpeg?auto=compress&cs=tinysrgb&w=400","https://images.pexels.com/photos/13478351/pexels-photo-13478351.jpeg?auto=compress&cs=tinysrgb&w=400"];
let scuba=document.getElementById("imgScuba");
scuba.addEventListener('click',function(){
    window.location.href="scubadiving.html"
})
scuba.src=scubaimg[0];
let leftscubabtn=document.getElementById("left-scuba")
let j=scubaimg.length-1;
leftscubabtn.addEventListener("click",()=>{
    if(j>=0){
        scuba.src=scubaimg[j]
        console.log(j);
        j--
    }else if(j<0){
        j=scubaimg.length-1;
    }
});
let rightscubabtn=document.getElementById("right-scuba");
rightscubabtn.addEventListener("click",()=>{
    console.log(j);
    scuba.src=scubaimg[j];
    j++;
    if(j>scubaimg.length-1){
        j=0;
    }
    
})



let paraimg=["https://c4.wallpaperflare.com/wallpaper/725/905/100/water-sand-sea-beach-wallpaper-preview.jpg","https://c1.wallpaperflare.com/preview/484/762/494/paragliding-parachute-sky-air.jpg","https://c4.wallpaperflare.com/wallpaper/356/599/823/close-up-photo-of-brown-and-red-animal-crane-crane-wallpaper-preview.jpg"];
let paraglide=document.getElementById("paraimg");
paraglide.addEventListener('click',function(){
    window.location.href="paragliding.html"
})
paraglide.src=paraimg[0];
let leftParabtn=document.getElementById("left-para");
let k=paraimg.length-1;
leftParabtn.addEventListener("click",()=>{
    if(k>=0){
        paraglide.src=paraimg[k];
        k--;
    }else if(k<0){
        k=paraimg.length-1;
    }
});
let rightParabtn=document.getElementById("right-para");
 rightParabtn.addEventListener("click",()=>{
         paraglide.src=paraimg[k];
         k++;
         if(k>paraimg.length-1){
            k=0;
         }
 });


let historyimg=["IMAGES/activities/hist1.jfif","IMAGES/activities/hist2.jfif","IMAGES/activities/hist3.jfif","IMAGES/activities/hist4.jfif"];
let historical=document.getElementById("imghistorical");
historical.addEventListener('click',function(){
    window.location.href="historical.html"
})
historical.src=historyimg[0];
let lefthistbtn=document.getElementById("left-historical");
let l=historyimg.length-1;
lefthistbtn.addEventListener("click",()=>{
       if(l>=0){
        historical.src=historyimg[l];
        l--;
       }else if(l<0){
        l=historyimg.length-1;
       }
});
let righthisbtn=document.getElementById("right-historical");
righthisbtn.addEventListener("click",()=>{
    historical.src=historyimg[l];
    l++;
    if(l>historyimg.length-1){
        l=0;
    }
})

let heritageimg=["https://assets.cntraveller.in/photos/60ba1c18a1a415b43b10be08/master/w_1600,c_limit/Villa-Akasa-4--866x575.jpg","https://assets.cntraveller.in/photos/60ba1c18253686a607d324e9/master/w_1600,c_limit/sea-hut-4--866x575.jpg","https://assets.cntraveller.in/photos/60ba1c18e1b212c19a817bda/master/w_1600,c_limit/Mudhouse-1.jpg"];
let heritage=document.getElementById("imgheritage");
heritage.addEventListener('click',function(){
    window.location.href="heritage.html"
})
heritage.src=heritageimg[0];
let m=heritageimg.length-1;
let leftheritagebtn=document.getElementById("left-heritage");
leftheritagebtn.addEventListener("click",()=>{
    if(m>=0){
        heritage.src=heritageimg[m];
        m--;
    }else if(m<0){
        m=heritageimg.length-1;
    }
});
let rightheritagebtn=document.getElementById("right-heritage");
rightheritagebtn.addEventListener("click",()=>{
    heritage.src=heritageimg[m];
    m++;
    if(m>heritageimg.length-1){
        m=0;
    }
})

let campimg=["https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=400","https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&w=400","https://blog.weekendthrill.com/wp-content/uploads/2018/10/101818_0716_Top15campin4.jpg"];
let imgcamp=document.getElementById("img-Camp");
imgcamp.addEventListener('click',function(){
    window.location.href="camping.html"
})
imgcamp.src=campimg[0];
let n=campimg.length-1;
let leftcampbtn=document.getElementById("left-campbtn");
leftcampbtn.addEventListener("click",()=>{
     if(n>=0){
        imgcamp.src=campimg[n];
        n--;
     }else if(n<0){
        n=campimg.length-1;
     }
});
let rightcampbtn=document.getElementById("right-campbtn");
rightcampbtn.addEventListener("click",()=>{
    imgcamp.src=campimg[n];
    n++;
    if(n>campimg.length-1){
        n=0;
    }
});