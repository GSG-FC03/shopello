let add = document.getElementById('plus');
let remove = document.getElementById('minus');
let price = document.getElementById('originalPice');
let total = document.getElementById('totalPrice');


let int = document.getElementById('amount');
let number = 1;
let priceTotal = parseInt(price.innerHTML);


add.addEventListener('click', () =>{
    number += 1;
    priceTotal += parseInt(price.innerHTML);
    int.innerHTML = number;
    total.innerHTML = priceTotal;
})

remove.addEventListener('click', () =>{
    if(number > 0 ){
        number -=1;
        priceTotal -= parseInt(price.innerHTML);
        int.innerHTML = number;
        total.innerHTML = priceTotal;
    }
    else {
        alert('cannot add zero Items');
    }
})