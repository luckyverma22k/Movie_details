const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const movieBox=document.querySelector("#movie-box")                  //movie box element ko sleect karenge html se kyunki iska used karna h
//ab m design karunga getmovies function ko
const getMovies=async (api)=>{              //async function ka mtlb ye third party se data lake dega 

   const response=await fetch(api)               //maine ek response const liya jaha pe thoda wair karke api ko fetch karke 
                                             //jo bhi aaya wo value usme store ho gaya
    const data=await response.json()                //ab jo bi response mere pass h usse json me convert karenge
    showMovies(data.results)                      //jo bhi data me result aaya usee iss functiom me pass karega 
                           //console.log(data)                           //dekhna chahta hu data kya aaya h 
}

const showMovies=(data)=>{
       movieBox.innerHTML="";  //pahle khali karo movie box ko kuch dikhane se pahle 
           data.forEach(               //data sare movies ka one by one aaega
            (item)=>{
                const box=document.createElement("div")   // ek element create karunga jiska used data rep ke liye karunga
                box.classList.add("box")
                box.innerHTML=`
                <img src="${IMGPATH+item.poster_path}" alt="" />    
                 <div class="overlay">
                 <div class="title">
                 <h2>${item.original_title}</h2>
                  <span>${item.vote_average}<span>
                  </div>
                  <h3>Overview:</h3>
                  <p>
                  ${item.overview}
                  </p>
                  </div>
                `;
                movieBox.appendChild(box)     // box andar jo bhi data h usko dal do moviebox

            }
           )
}
//show movies function me movies ek ek karke aaya maine console.log se dekha ki key value kya h fir add kar di 
//html me javascript ko fir ussi position oe wo chiz show hone laga 

//next ab search karne pe kaise show hoga usko design karte hn 

document.querySelector("#search").addEventListener(
    "keyup",
    function(event){
        if(event.target.value!=""){   //agar searchbox null nhi h mtlb kuch likha h than
            
            getMovies(SEARCHAPI+event.target.value)  //search api ke quesry me jo bhi value likhi gai h wo concatenate ho jae 
        }else{
            getMovies(APIURL)     //warna agar searchbox khali h tab popular wali dikha do
        }
    }
)

getMovies(APIURL)                       //turant iss function ko call karo ye popular movies nikal ke rakh dega 
                                             