let arrayOfUser = [],
    getStarted = document.getElementsByClassName("signupbtn")[0],
    msgEmpty = document.getElementById("msgEmpty"),
    input = Array.from(document.getElementsByTagName("input")),
    mailmsg = document.getElementById("msgMail");


let unknown = {
    Name: "",
    Email: "",
    Password: "",
    Currency: "",
    Product: [{
        id: "",
        title: "",
        description: "",
        category: "",
        image: ""
    }]
};
if (localStorage.getItem("unknown") == null) {
    localStorage.setItem("unknown", JSON.stringify(unknown));
}


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
    localStorage.setItem("unknown", JSON.stringify(unknown));
//if the user re-enter same email amessage will appear and will not store.
    if (!checkEmptyInput(user_Name, user_Email, user_Password)) {
        if (checkEmail(user_Email, JSON.parse(localStorage.getItem("users")))) mailmsg.style.display = "block"
        else localStorage.setItem("users", JSON.stringify(arrayOfUser));
    }
}