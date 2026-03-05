
const phone="380634095249";

const menu={
"Пельмені / Вареники":[
["Пельмені (курка та свинина)",400],
["Пельмені (свинина та телятина)",450],
["Пельмені (яловичина)",430],
["Ліниві вареники",150],
["Вареники з капустою",150],
["Вареники з картоплею",150],
["Вареники з картоплею та грибами",200],
["Вареники з вишнею",300],
["Вареники з м’ясом",450],
["Вареники з сиром",250]
],

"Зрази / Риба":[
["Зраза з капустою",30],
["Зраза з м’ясом",35],
["Смажений мінтай",350]
],

"Котлети":[
["Котлети зі свинини",400],
["Котлети зі свинини та яловичини",450],
["Котлета рибна (хек)",350],
["Котлета по київськи",50],
["Котлети з курятини",350],
["Котлети зі свинини та курятини",450]
],

"Салати":[
["Олів'є",350],
["Вінегрет",250],
["Крабовий",350],
["Шуба",350],
["Мемоза",350],
["Цезарь",350]
],

"Голубці та Перець":[
["Голубці зі свининою",400],
["Голубці з телятиною",450],
["Перець фарширований свининою",400]
],

"Тарталетки / Торт":[
["Тарталетки з жульєном",695],
["Тарталетки з червоною ікрою",1020],
["Тарталетки з сьомгою",1080],
["Печінковий торт",400]
],

"Чебуреки / Бендерики":[
["Чебуреки з м’ясом",50],
["Чебуреки з сиром",50],
["Бендерики",350]
],

"Кекси":[
["Кекс зі згущеного молока",400],
["Кекси з родзинками",400],
["Творожні кекси",450]
],

"Сирники / Запіканка":[
["Сирники з родзинками",310],
["Сирники звичайні",300],
["Запіканка творожна",450]
],

"Млинці":[
["Млинці з солодким сиром",250],
["Млинці з жульєном",300],
["Млинці з сьомгою та крем-сиром",350],
["Млинці з куркою",300],
["Млинці зі свининою",300],
["Млинці з курячою печінкою",300]
],

"Десерти":[
["Наполеон",300],
["Чізкейк класичний",680],
["Медовик",500],
["Пиріг «Ангельські сльози»",850],
["Паска творожна (500г)",180],
["Паска творожна (120г)",110],
["Паска дріжджова з родзинками",150],
["Десерт Червоний Бархат",130]
]
};

const menuDiv=document.getElementById("menu");
const cart=[];

function renderMenu(){

for(const cat in menu){

let div=document.createElement("div");
div.className="category";

let title=document.createElement("h3");
title.innerText=cat;

let items=document.createElement("div");
items.className="items";

title.onclick=()=>{
items.style.display=items.style.display==="block"?"none":"block";
};

menu[cat].forEach(food=>{

let item=document.createElement("div");
item.className="item";

let name=document.createElement("span");
name.innerText=food[0]+" ("+food[1]+" грн)";

let input=document.createElement("input");
input.type="number";
input.step="0.1";
input.placeholder="кг/шт";
input.style.width="60px";

let btn=document.createElement("button");
btn.innerText="+";

btn.onclick=()=>{

let w=parseFloat(input.value);
if(!w)return;

cart.push({name:food[0],price:food[1],weight:w});
updateCart();
};

item.appendChild(name);
item.appendChild(input);
item.appendChild(btn);

items.appendChild(item);

});

div.appendChild(title);
div.appendChild(items);

menuDiv.appendChild(div);

}

}

function updateCart(){

let div=document.getElementById("cartItems");
div.innerHTML="";

let total=0;

cart.forEach(i=>{

let p=i.price*i.weight;
total+=p;

let d=document.createElement("div");
d.innerText=i.name+" - "+i.weight+" = "+Math.round(p)+" грн";

div.appendChild(d);

});

document.getElementById("total").innerText=Math.round(total);

}

function buildText(){

let name=document.getElementById("clientName").value||"";

let text="Доброго дня!%0AЗамовлення:%0A";

cart.forEach(i=>{
text+=i.name+" - "+i.weight+"%0A";
});

text+="Разом: "+document.getElementById("total").innerText+" грн%0A";
text+="Ім'я: "+name;

return text;

}

function orderViber(){
let text=buildText();
window.open("viber://chat?number=%2B"+phone+"&text="+text);
}

function orderTelegram(){
let text=buildText();
window.open("https://t.me/share/url?url=&text="+text);
}

renderMenu();
