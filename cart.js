// Аккордеон
var acc = document.getElementsByClassName("accordion");
for(let i=0;i<acc.length;i++){
  acc[i].addEventListener("click", function(){
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if(panel.style.display==="block"){
      panel.style.display="none";
    }else{
      panel.style.display="block";
    }
  });
}

// Кошик
let cart = [];
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

function updateCart(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    total+=item.price * item.weight;
    let div = document.createElement("div");
    div.textContent = `${item.name} — ${item.weight} кг — ${item.price*item.weight} грн`;
    cartItems.appendChild(div);
  });
  totalEl.textContent = total;
}

// Додаємо позиції
document.querySelectorAll(".add-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    let name = btn.dataset.name;
    let price = parseFloat(btn.dataset.price);
    let weightInput = btn.previousElementSibling;
    let weight = parseFloat(weightInput.value);
    if(weight<=0){ alert("Введіть правильну вагу!"); return; }
    cart.push({name, price, weight});
    updateCart();
  });
});

// Замовлення через Viber/Telegram
document.getElementById("order-btn").addEventListener("click", ()=>{
  if(cart.length===0){
    alert("Кошик порожній!");
    return;
  }
  let msg="Замовлення:%0A";
  cart.forEach(item=>{
    msg+=`${item.name} — ${item.weight} кг — ${item.price*item.weight} грн%0A`;
  });
  let total = cart.reduce((sum,item)=>sum+item.price*item.weight,0);
  msg+=`Сума: ${total} грн`;
  // Відкрити Viber
  window.open(`viber://chat?number=%2B380634095249&text=${msg}`);
  // Або Telegram (розкоментувати)
  // window.open(`https://t.me/+380634095249?text=${msg}`);
});