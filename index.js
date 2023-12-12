const tempField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".searchField");

const form=document.querySelector("form");

let target="New Delhi";

form.addEventListener("submit",search)

const fetchData=async(target)=>{
    try {
        const url=`
        https://api.weatherapi.com/v1/current.json?key=6ff1c70b366745e7b8a82708232604&q=${target}`;
        
        const response=await fetch(url);
        const data=await response.json();

        const {location:{name,localtime},
            current:{temp_c,condition:{
                text,icon
            }

            }}=data;

        updateDom(name,localtime,temp_c,text,icon);
    } catch (error) {
        alert("Location Not Found");
    }
}

function updateDom(name,time,temp,text,icon){
     const exactTime=time.split(" ")[1];
     const exactDate=time.split(" ")[0];
     const exactDay=new Date(exactDate).getDay();

     tempField.innerText=temp;
     cityField.innerText=name;
     dateField.innerText=`${exactTime}-${getFullDayName(exactDay)}-${exactDate}`;
     emojiField.src=icon;
     weatherField.innerText=text;
     
}
fetchData(target);

function getFullDayName(num){
    switch (num) {
        case 0:
            return "Sunday"
            break;
    
        case 1:
            return "Monday"
            break;
        case 2:
            return "Tuesday"
            break;
        case 3:
            return "Wednesday"
            break;
        case 4:
            return "Thursday"
            break;
        case 5:
             return "Friday"
             break;
        case 6:
            return "Saturday"
            break;
        
        default:
            return "Don't Know"
            break;
    }
}

function search(e){
    e.preventDefault();
    target=searchField.value;
    fetchData(target);
}
