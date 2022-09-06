var serverAdress = "http://localhost:8000/login"


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    console.log(`form__message--${type}`);
    messageElement.classList.add(`form__message--${type}`);
}

function login(username, password) {

    return fetch(serverAdress, {
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
        console.log("username:" + e.target[0].value);
        console.log("password:" + e.target[1].value);
        login(e.target[0].value, e.target[1].value).then(loginData => {
            if (loginData.login == 2) {
                console.log("loginSuccess");
                setFormMessage(loginForm, "success", "Login success");
            } else if (loginData.login == 1) {
                console.log("wrong pass");
                setFormMessage(loginForm, "error", "Incorrect username or password");
            }else if (loginData.login == 0) {
                console.log("no user found");
                setFormMessage(loginForm, "error", "Username not found");
            }
        });
    });
});