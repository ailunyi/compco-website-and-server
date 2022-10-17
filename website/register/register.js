var serverAdress = "http://localhost:8000/register"


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    console.log(`form__message--${type}`);
    messageElement.classList.add(`form__message--${type}`);
}

function login(username, password, email) {

    return fetch(serverAdress, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ username: username, password: password, email: email})
    })
    .then((res) =>  res.json()).then((data) => {
        // Handle response 
        console.log('Response: ', data);
        return data;
    })
    .catch(err => {
        // Handle error 
        console.log('Error message: ', err);
    });

}

function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
        return true;

    } else {

        return false;

    }

}



function writeCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}



document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#signinForm")
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        console.log("username:" + e.target[1].value);
        console.log("password:" + e.target[2].value);
        console.log("email:" + e.target[0].value);
        if (ValidateEmail(e.target[0].value)) {
            login(e.target[1].value, e.target[2].value, e.target[0].value).then(loginData => {
                if (loginData.register == 2) {
                    console.log("loginSuccess");
                    setFormMessage(loginForm, "success", "Success");
                    writeCookie("SESSIONID", e.target[1].value, 3);
                    //set logged in stuff to visible
                    document.getElementById("loggedIn").hidden = false;
                    document.getElementById("notLoggedIn").hidden = true;
                } else if (loginData.register == 1) {
                    console.log("Username Taken");
                    setFormMessage(loginForm, "error", "Username Taken");
                } else if (loginData.register == 0) {
                    console.log("invalid username/password");
                    setFormMessage(loginForm, "error", "Invalid username/password");
                }
            });
        } else {
            setFormMessage(loginForm, "error", "Invalid Email Address");
        }
        
    });
});