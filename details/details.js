let add = document.getElementById('plus');
let remove = document.getElementById('minus');
let price = document.getElementById('originalPice');
let total = document.getElementById('totalPrice');


let int = document.getElementById('amount');
let number = 1;
let priceTotal = parseInt(price.textContent);
total.textContent = price.textContent
console.log(price.textContent)


add.addEventListener('click', () =>{
    number += 1;
    priceTotal += parseInt(price.textContent);
    int.textContent = number;
    total.textContent = priceTotal;
})

remove.addEventListener('click', () =>{
    if(number > 1 ){
        number -=1;
        priceTotal -= parseInt(price.textContent);
        int.textContent = number;
        total.textContent = priceTotal;
    }
   
})