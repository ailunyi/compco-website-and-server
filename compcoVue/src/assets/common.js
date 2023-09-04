import { createCommentVNode } from "vue";

let exports = {}
exports.serverAddress = "http://localhost:8000";
//exports.serverAddress = "https://www.compco.cc:8000";
exports.sessionID = -1;
exports.username = "username..";
exports.firstName = "firstName..";
exports.lastName = "lastName..";
exports.email = "";
exports.profilePicture = "";
exports.admin = false;
exports.language = "en";
exports.refreshSession = () =>{
    if (exports.readCookie("SESSIONID") != ""){
        exports.sessionID = exports.readCookie("SESSIONID");

        return fetch(exports.serverAddress+"/userInfo", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
    
            },
            body: JSON.stringify({ "SESSIONID": exports.sessionID })
        })
        .then((res) => res.json()).then((data) => {
            data = JSON.parse(data);
            if (data == null){
                // user session expired
                exports.delete_cookie("SESSIONID");
                window.location.href = '/';
            }
            exports.username = data.username;
            exports.profilePicture = data.profilePicture;
            exports.firstName = data.firstName;
            exports.lastName = data.lastName;
            exports.admin = data.admin;
            // if (data.survey == null || data.survey == false){
            //     if (window.location.pathname != "/survey")
            //         window.location.href = '/survey';
            // }
            return data;
        })
        .catch(err => {
            // Handle error 
            console.log('Error message: ', err);
            return err;
        });
    }else{
        return new Promise((resolve, reject) => {
            resolve('fail!');
        });
    }
}

exports.checkLanguage = (that) => {
    if (localStorage['userLanguage'] != null) {
        if (localStorage['userLanguage'] == "cn") {
            document.location.hash = "#cn";
        } else {
            document.location.hash = "#en";
        }
        refreshLanguage();
    }
}

exports.changeLanguage = (language) => {
    exports.language = language;
}


exports.readCookie = (name) => {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
}
exports.writeCookie= (name, value, days) => {
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
var userInfo;
var alreadyAddedAdmin = false;

exports.getUserInfo= (sessionID) => {
    return fetch(serverAddress+"/userInfo", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ "SESSIONID": sessionID })
    })
    .then((res) => res.json()).then((data) => {
        // Handle response 
        data = JSON.parse(data);
        console.log('Response: ', data);
        //document.getElementById("aboutUs1").hidden = true;
        //document.getElementById("aboutUs2").hidden = true;
        
        if (data["admin"] && alreadyAddedAdmin == false){
            alreadyAddedAdmin = true;
            const element = document.createElement("a");
            element.target = "_blank";
            element.innerHTML = "Admin Panel";
            element.addEventListener("click",function handleClick() {goToAdminPanel()});
            document.getElementById("placeholder").appendChild(element);
        }

        var username = data["username"];
        var firstName = data["firstName"];
        var lastName = data["lastName"];
        var profilePicture = data["profilePicture"];

        document.getElementById("profileIcon").src = profilePicture;
        if (username.length > 11)
            username = username.slice(0, 11) + "...";
        document.getElementById("profileUsername").innerHTML = username;
        document.getElementById("profileName").innerHTML = firstName + " " + lastName;
        document.getElementById("profileIcon2").src = profilePicture;

        return data;
    })
    .catch(err => {
        // Handle error 
        console.log('Error message: ', err);
    });
}

var opened = false;
exports.openProfile = () => {
    toggleVisibilityNoFade('profileDropDown');
    if (!opened){ //prevent refresh profile on exit
        opened = true;
        userInfo = getUserInfo(readCookie("SESSIONID"));
    }
    else
        opened = false;
}

exports.refreshUserInfo = () => {

    if (readCookie("SESSIONID") != "") {
        
        document.getElementById("loggedIn").hidden = false;
        
        document.getElementById("organizations").hidden = false;
        document.getElementById("notLoggedIn").hidden = true;
        
        var profilePicture = readCookie("profilePicture");
        document.getElementById("profileIcon").src = profilePicture;
        //$('[id="loggedIn"]').show();
        //$('[id="notLoggedIn"]').hide();

    }else{
        
    }
}
exports.delete_cookie = (name, path, domain) => {
    if (exports.readCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}



exports.goToAdminPanel = () => {
    sessionID = readCookie("SESSIONID");
    
    window.location.href = serverAddress+"/adminPanel/"+sessionID;

}

export default exports;

// checkLanguage(); // CHECK LANGAUGES
// setInterval(checkScreenSize, 100); // CHECK SCREEN SIZE