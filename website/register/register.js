//var serverAdress = "http://localhost:8000/register"
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    console.log(`form__message--${type}`);
    messageElement.classList.add(`form__message--${type}`);
}

function register(firstName, lastName, username, password, email) {

    return fetch(serverAddress + "/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, password: password, email: email })
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


if (readCookie("SESSIONID") != "") {
    window.location.href = "/";
}


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#signinForm")
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        if (ValidateEmail(e.target[2].value)) {

            setFormMessage(loginForm, "success", "loading...");
            register(e.target[0].value, e.target[1].value,e.target[3].value, e.target[4].value, e.target[2].value).then(loginData => {
                if (loginData.login == 2) {
                    console.log("loginSuccess");
                    setFormMessage(loginForm, "success", "Success");
                    writeCookie("SESSIONID", loginData.SESSIONID, 3);
                    writeCookie("username", loginData.username, 3);
                    writeCookie("profilePicture", loginData.profilePicture, 3);
                    writeCookie("firstName", loginData.firstName, 3);
                    writeCookie("lastName", loginData.lastName, 3);
                    //set logged in stuff to visible
                    document.getElementById("loggedIn").hidden = false;
                    document.getElementById("notLoggedIn").hidden = true;
                    window.location.href = "/";
                } else if (loginData.login == 1) {
                    console.log("Username Taken");
                    setFormMessage(loginForm, "error", "Username Taken");
                } else if (loginData.login == 3) {
                    console.log("Email Taken");
                    setFormMessage(loginForm, "error", "Email Taken");
                } else if (loginData.login == 0) {
                    console.log("invalid username/password");
                    setFormMessage(loginForm, "error", "Invalid username/password");
                } else if (loginData.login == 4) {
                    console.log("invalid email");
                    setFormMessage(loginForm, "error", "Invalid email address");
                }
            });
        } else {
            setFormMessage(loginForm, "error", "Invalid Email Address");
        }
        
    });
});