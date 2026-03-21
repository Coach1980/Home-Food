const menu={
pelmeni:[
{n:"Пельмені",p:200}
],

kotlety:[
{n:"Котлети",p:150}
],

salaty:[
{n:"Олів'є",p:120}
],

chebureky:[
{n:"Чебуреки",p:50}
]

};


const cart=[];
let sum=0;


function render(){

const ul=document.getElementById("cart");

ul.innerHTML="";

cart.forEach(i=>{

let li=document.createElement("li");

li.textContent=i.name;

ul.appendChild(li);

});

document.getElementById("sum").textContent=sum;

document.getElementById("count").textContent=cart.length;

let badge=document.getElementById("cartBadge");

badge.textContent=cart.length;

}



document.querySelectorAll(".menu-card").forEach(card=>{

let key=card.dataset.menu;

card.onclick=()=>{

let item=menu[key][0];

cart.push(item);

sum+=item.p;

render();

};

});



function clearCart(){

cart.length=0;
sum=0;

render();

}



function openOrder(){

document.getElementById("orderPopup").style.display="flex";

}


function closeOrder(){

document.getElementById("orderPopup").style.display="none";

}



const cartBox=document.querySelector(".cart");

cartBox.addEventListener("click",()=>{

cartBox.classList.toggle("open");

});



const phoneInput=document.getElementById("phone");

const confirmBtn=document.getElementById("confirmBtn");


phoneInput.oninput=()=>{

if(/^0\d{9}$/.test(phoneInput.value)){

confirmBtn.disabled=false;

}else{

confirmBtn.disabled=true;

}

};



const TOKEN="8635234132:AAGBzmT3hYi1MrguAz_anmQUclN_z32gmwQ";
const CHAT_ID="702168527";


confirmBtn.onclick=()=>{

let text="Замовлення%0A";

cart.forEach(i=>{
text+=i.name+"%0A";
});

text+="Телефон:"+phoneInput.value;

fetch(
"https://api.telegram.org/bot"+TOKEN+
"/sendMessage?chat_id="+CHAT_ID+
"&text="+text
);

};