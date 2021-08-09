
let loginBtn = document.getElementsByClassName("login-btn")[0];
let users = JSON.parse(localStorage.getItem('users'));

loginBtn.addEventListener('click', logIn);


function logIn(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("incorrctMsg");

    let existUser = false;
    for(let i=0;i<users.length;i++){
        if(email == users[i].Email){
            if(password == users[i].Password)
            existUser = true;
        }
    }
    if(!existUser) message.setAttribute('style','display: block; color: red;');
}
// onclick="window.lgit ocation.href='../home/home.html';" 