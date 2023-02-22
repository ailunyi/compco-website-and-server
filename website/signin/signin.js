//var serverAdress = "http://www.compco.cc:8000/login"
//var serverAdress = "http://localhost:8000/login"

//import writeCookie from "/essentials.js"

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    console.log(`form__message--${type}`);
    messageElement.classList.add(`form__message--${type}`);
}

// aready logged in
if (readCookie("SESSIONID") != "") {
    window.location.href = "/";
}

function login(username, password) {

    return fetch(serverAddress + "/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ username: username, password: password })
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



document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#signinForm")
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        
        setFormMessage(loginForm, "success", "loading...");
            
        login(e.target[0].value, e.target[1].value).then(loginData => {
            
            if (loginData.login == 2) {
                console.log("loginSuccess");
                setFormMessage(loginForm, "success", "Login success");
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
                console.log("wrong pass");
                setFormMessage(loginForm, "error", "Incorrect username or password");
            }else if (loginData.login == 0) {
                console.log("no user found");
                setFormMessage(loginForm, "error", "User not found");
            }
        });
    });
});
