let cartList = document.getElementById("cartList");
let remove_All = document.getElementById("removeAll");
let unKnown_user = JSON.parse(localStorage.getItem("unknown"));
let products = unKnown_user.Product;
let count = document.getElementById("count");
let price = document.getElementsByClassName('price')[0];
let cartTop = document.getElementsByClassName('cart-top')[0];
let cartBottom = document.getElementById("cart-bottom");
let emptyCart = document.getElementsByClassName('empty-cart')[0];


count.textContent = `(${products.length} Items)`;

let Currency,
  rate = 1,
  symbol = '';
if (unKnown_user.Currency == '') Currency = 'USD'
else {
  Currency = unKnown_user.Currency
  symbol = Currency
  let from = "USD",
    to = Currency;

  (async function getData() {
    try {
      const response = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=${to}&from=${from}&q=1.0`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "6155594c89msh387173eac4635c0p108063jsnee1a9a20e441",
          "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
        }
      })
      const data = await response.json()
      rate = data;
    } catch (e) {
      console.log("error", e.message)
    }
  })()
}
price.textContent = totalPrice();

createList();

remove_All.setAttribute('onClick','removeAll()');

function createList(){
  if(products.length == 0){
    emptyCart.setAttribute('style','display: block;')
    cartList.setAttribute('style','display: none;')
    cartBottom.setAttribute('style','display: none;')
    cartTop.setAttribute('style','display: none;')
  }
  cartList.innerHTML = '';
  
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == "") continue;
    let productBlock = document.createElement("div");
    productBlock.className = "product-block";
  
    let productImg = document.createElement("div");
    let img = document.createElement("img");
    img.src = products[i].image;
    img.className = "product-img";
    productImg.appendChild(img);
    productBlock.appendChild(productImg);
  
    let productData = document.createElement("div");
    productData.className = "product-data";
  
    let dataRow_1 = document.createElement("div");
    dataRow_1.className = "row-data";
    dataRow_1.setAttribute("style", "margin-top: 0.8125rem;");
  
    let productName = document.createElement("h2");
    productName.className = "normal-text";
    productName.textContent = products[i].title.split(" ").slice(0, 2).join(" ");
  
    let productPrice = document.createElement("h2");
    productPrice.className = "normal-text";
    productPrice.setAttribute("style", "font-weight: 700;");
    productPrice.textContent = symbol + " " + (parseFloat(products[i].price) * parseInt(products[i].quantity) * rate).toFixed(2);;
  
    dataRow_1.appendChild(productName);
    dataRow_1.appendChild(productPrice);
  
    let dataRow_2 = document.createElement("div");
    dataRow_2.className = "row-data";
  
    let countSection = document.createElement("div");
    countSection.className = "count-section";
  
    let minusBox = document.createElement("button");
    minusBox.setAttribute("id", "minusBox");
    let minus = document.createElement("img");
    minus.setAttribute("id", "minus");
    minus.src = "../assets/img/minus.svg";
    minusBox.appendChild(minus);
    minusBox.className = "svg-box";
    let count = document.createElement("h2");
    count.className = "count";
    count.textContent = products[i].quantity;
    let plusBox = document.createElement("button");
    plusBox.setAttribute("id", "plusBox");
    plusBox.className = "svg-box";
    let plus = document.createElement("img");
    plus.setAttribute("id", "plus");
    plus.src = "../assets/img/plus.svg";
    plusBox.appendChild(plus);
  
    countSection.appendChild(minusBox);
    countSection.appendChild(count);
    countSection.appendChild(plusBox);
  
    let removeSection = document.createElement("div");
    let removeText = document.createElement("button");
    removeText.className = "remove-button";
    removeText.textContent = "Remove";
    removeText.setAttribute('onClick',`remove(${products[i].id})`)
    removeSection.appendChild(removeText);
  
    dataRow_2.appendChild(countSection);
    dataRow_2.appendChild(removeSection);
  
    productData.appendChild(dataRow_1);
    productData.appendChild(dataRow_2);
    productBlock.appendChild(productData);
  
    cartList.appendChild(productBlock);
  }
  price.textContent = totalPrice();
}

function remove(id){
  for(let i=0;i<products.length;i++){
    if(products[i].id == id){
      products.splice(i, 1);
    }
  }
  location.reload();
  createList();
}
function removeAll(){
  products = [];
  
  location.reload();
  createList();
}

function totalPrice(){
  let total = 0;
  for(let i=0;i<products.length;i++){
    total += (parseFloat(products[i].price) * parseInt(products[i].quantity));
  }
  return symbol+ " " +(total * rate).toFixed(2) ;
}



window.onclick = function (event) {
  if (event.target.getAttribute("id") == "plus") {
    let temp = increment(event.target.parentElement.parentElement.getElementsByClassName("count")[0].textContent);
    event.target.parentElement.parentElement.getElementsByClassName("count")[0].textContent = temp;
    products[getIndexOfProduct(event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("row-data")[0].getElementsByClassName("normal-text")[0].textContent)].quantity = temp;

  } else if (event.target.getAttribute("id") == "plusBox") {
    let temp = increment(event.target.parentElement.getElementsByClassName("count")[0].textContent);
    event.target.parentElement.getElementsByClassName("count")[0].textContent = temp;
    products[getIndexOfProduct(event.target.parentElement.parentElement.parentElement.getElementsByClassName("row-data")[0].getElementsByClassName("normal-text")[0].textContent)].quantity = temp;
      
  } else if (event.target.getAttribute("id") == "minus") {
    let temp = decrement(event.target.parentElement.parentElement.getElementsByClassName("count")[0].textContent);
    event.target.parentElement.parentElement.getElementsByClassName("count")[0].textContent = temp;
    products[getIndexOfProduct(event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("row-data")[0].getElementsByClassName("normal-text")[0].textContent)].quantity = temp;

  } else if (event.target.getAttribute("id") == "minusBox") {
    let temp = decrement(event.target.parentElement.getElementsByClassName("count")[0].textContent);
    event.target.parentElement.getElementsByClassName("count")[0].textContent = temp;
    products[getIndexOfProduct(event.target.parentElement.parentElement.parentElement.getElementsByClassName("row-data")[0].getElementsByClassName("normal-text")[0].textContent)].quantity = temp;
  }

  unKnown_user.Product = products;
  localStorage.setItem('unknown',JSON.stringify(unKnown_user));
  createList();
};

function increment(num) {
  return parseInt(num) + 1;
}
function decrement(num) {
  num--;
  if (num < 1) return 1;
  return parseInt(num);
}


function getIndexOfProduct(name){
  for (let i = 0; i < products.length; i++) {
    if(name == products[i].title.split(" ").slice(0, 2).join(" "))
      return i;
    
  }
}

let buy = document.getElementById('buy');

buy.addEventListener('click', ()=>{
  console.log('dsdsdds')
  let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));
  if(unknown.Name === ''){
      window.location.href = '../createAccount/createAccount.html'
  }
  else
  buyMsg.style.display = 'block'
})
