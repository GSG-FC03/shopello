let arrayOfUser = [],
    getStarted = document.getElementsByClassName("signupbtn")[0],
    msgEmpty = document.getElementById("msgEmpty"),
    input = Array.from(document.getElementsByTagName("input")),
    mailmsg = document.getElementById("msgMail");

let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));
input.forEach(element => {
    element.addEventListener('change', removeAlert)
});

function removeAlert() {
    msgEmpty.style.display = "none"
    mailmsg.style.display = "none"
}

function checkEmail(user_Email, arrayUser) {
    let state = false
    if (arrayUser.length > 0) {
        for (let index = 0; index < arrayUser.length; index++) {
            if (arrayUser[index].Email == user_Email) {
                state = true
                break;
            }
        }
        return state
    }
}
// if the input is empty a message will appear and data will not store.
function checkEmptyInput(user_Name, user_Email, user_Password) {
    if (user_Name == '' || user_Email == '' || user_Password == '') {
        msgEmpty.style.display = "block";
        return true
    }
    return false
}
//the user's data save in local storage as array of obj. when click get started button
getStarted.addEventListener('click', signUp);

if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify(arrayOfUser))
}

function signUp() {

    let user_Name = document.getElementById("name").value,
        user_Email = document.getElementById("email").value,
        user_Password = document.getElementById("password").value,
        user_Currency = document.getElementById("currency").value;

    unknown.Name = user_Name
    unknown.Email = user_Email
    unknown.Password = user_Password
    unknown.Currency = user_Currency

    arrayOfUser = localStorage.getItem("users") === null ? [] : JSON.parse(localStorage.getItem("users"));
    arrayOfUser.push(unknown);

    //if the user re-enter same email amessage will appear and will not store.
    if (!checkEmptyInput(user_Name, user_Email, user_Password)) {
        if (checkEmail(user_Email, JSON.parse(localStorage.getItem("users")))) mailmsg.style.display = "block"
        else {
            localStorage.setItem("users", JSON.stringify(arrayOfUser));
            localStorage.setItem("unknown", JSON.stringify(unknown));
            //when click on get started will save data and directed the user to previous link
            if (document.referrer == 'http://127.0.0.1:5500/login/login.html' || document.referrer == 'http://127.0.0.1:5500/home/home.html')
                location.href = '../home/home.html'
            else
                document.referrer
        }
    }
}

//DOM and fetch api so user can choose the preferred currency 
function currency() {
    //getElementById("currency")
    let selectCurrency = document.getElementById("currency");
    //fetch api
    fetch("https://free.currconv.com/api/v7/currencies?apiKey=f9bda67910efea269175")
        .then((response) => {
            if (response.status !== 200) {
                console.log(
                    `Looks like there was a problem. Status Code: ${response.status}`
                );
            } else {
                // Examine the text in the response
                return response.json();
            }
        })
        .then((data) => {
            let currencyData = Object.values(data.results)
            for (element of currencyData) {
                if (element.currencySymbol !== undefined) {
                    // Create option
                    const option = document.createElement("option");
                    option.innerText = element.id
                    // Append the option to the selectCurrency element
                    selectCurrency.appendChild(option);
                }
            }
        });
}

currency();

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