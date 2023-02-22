
function logout(sessionID) {

    return fetch(serverAddress +"/logout", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ SESSIONID: sessionID })
    })
    .then((res) => res.json()).then((data) => {
        // Handle response 
        console.log('Response: ', data);
        delete_cookie("SESSIONID", "/", "");
        delete_cookie("username", "/", "");
        delete_cookie("profilePicture", "/", "");
        delete_cookie("firstName", "/", "");
        delete_cookie("lastName", "/", "");
        window.location.replace("/");
        return data;
    })
    .catch(err => {
        // Handle error 
        console.log('Error message: ', err);
    });

}

logout(readCookie("SESSIONID"));

