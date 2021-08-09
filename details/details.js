let add = document.getElementById('plus');
let remove = document.getElementById('minus');
let price = document.getElementById('originalPice');
let total = document.getElementById('totalPrice');
let title = document.getElementById('productTitle')
let description = document.getElementById('productDesc')
let category = document.getElementById('productCategory')
let image = document.getElementById('productCategory')
let int = document.getElementById('amount');


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
function displayDetails(data) {
    image.src = data.image
    category.textContent = data.category
    title.textContent = data.title 
    description.textContent = data.description
    price.textContent = data.price 
}

