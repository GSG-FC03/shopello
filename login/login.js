
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
        let repeated = false;
        for(let j=0;j<products.length;j++){
            if(user.Product[i].id == products[j].id){
                products[j].quantity = parseInt(products[j].quantity) + parseInt(user.Product[i].quantity);
                repeated = true;
            }
        }
        if(!repeated)
        products.push(user.Product[i])
    }

    unknown.Product = products;
    user.Product = products;
    localStorage.setItem('unknown', JSON.stringify(unknown));
    return user;
}

//user can show or hide password
function showPassword() {
    const togglePassword = document.getElementsByClassName('hidePsw')[0];
    togglePassword.onclick = function () {
      let password = document.getElementById('password');
      // toggle the type attribute
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      // toggle the eye slash icon
      const src= togglePassword.getAttribute('src')==='../assets/img/hideEye.svg'?'../assets/img/showEye.svg':'../assets/img/hideEye.svg';
      togglePassword.setAttribute('src',src);
  };
  }
  
  showPassword();
