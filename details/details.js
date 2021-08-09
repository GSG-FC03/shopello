let add = document.getElementById('plus');
let remove = document.getElementById('minus');
let price = document.getElementById('originalPice');
let total = document.getElementById('totalPrice');
let title = document.getElementById('productTitle')
let description = document.getElementById('productDesc')
let category = document.getElementById('productCategory')
let image = document.getElementById('productImage')
let int = document.getElementById('amount');
let buy = document.getElementById('buy');
let addCart = document.getElementById('add');
let currency = document.getElementById('priceTag');


let number = 1;
let priceTotal = parseInt(price.textContent);
total.textContent = price.textContent


// to add an item.
add.addEventListener('click', () =>{
    number += 1;
    priceTotal += parseInt(price.textContent);
    int.textContent = number;
    total.textContent = priceTotal;
})

// to remove an item.
remove.addEventListener('click', () =>{
    if(number > 1 ){
        number -=1;
        priceTotal -= parseInt(price.textContent);
        int.textContent = number;
        total.textContent = priceTotal;
    }
   
})


// to get the producat information and display iton the page.
let data = localStorage.getItem("data") === null ? [] : JSON.parse(localStorage.getItem("data"));
console.log(data)
displayDetails(data)
function displayDetails(data) {
    image.setAttribute('src', `${data.image}`)
    category.textContent = data.category
    title.textContent = data.title 
    description.textContent = data.description
    price.textContent = data.price 
}


addCart.addEventListener('click', ()=>{
    location.href = '../cart/cart.html'
})


buy.addEventListener('click', ()=>{
    let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));
    if(unknown.Name === ''){
        window.location.href = '../createAccount/createAccount.html'
    }
    else
    console.log('ho')
    window.location.href = '#'
})






