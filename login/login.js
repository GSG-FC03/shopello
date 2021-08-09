
let loginBtn = document.getElementsByClassName("login-btn")[0];
let users = JSON.parse(localStorage.getItem('users'));

loginBtn.addEventListener('click', logIn);
let arrayOfUser = [];
if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify(arrayOfUser))
}


let stupid = false;
function logIn(){
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("incorrctMsg");

    let existUser = false;
    for(let i=0;i<users.length;i++){
        if(email == users[i].Email && password == users[i].Password){
            existUser = true;
            users[i] = mergeProduct(users[i]);
            localStorage.setItem('users', JSON.stringify(users));
            break;
        }
    }
    
    if(!existUser){
        if(email == "" || password =="")
        message.textContent = "Please fill empty fields";
        else
        message.textContent = "Incorrect email or password";
        message.setAttribute('style','display: block; color: red;');   
    } 
    
    else{
        window.location.href='../home/home.html';  
    }
}

function mergeProduct(user){
    let unknown = JSON.parse(localStorage.getItem("unknown"));
    unknown.Email = user.Email;
    unknown.Name = user.Name;
    unknown.Password = user.Password;
    unknown.Currency = user.Currency;

    let products = [];
    for(let i=0;i<unknown.Product.length;i++){
        products.push(unknown.Product[i])
    }
    for(let i=0;i<user.Product.length;i++){
        products.push(user.Product[i])
    }

    unknown.Product = products;
    user.Product = products;

    return user;
}
