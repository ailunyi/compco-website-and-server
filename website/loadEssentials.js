const serverAddress = "http://localhost:8000";
//const serverAddress = "https://www.compco.cc:8000";
$.get("/nav.html", function (data) {
    $("#nav-placeholder").replaceWith(data);

    refreshLanguage();
    refreshUserInfo();
    document.getElementById("themeName").innerHTML = "Theme: " + themeNames[curTheme];
});

$.get("/footer.html", function (data) {
    $("#footer").replaceWith(data);

    refreshLanguage();
});


var mouseMobileNav = false;
function checkLanguage() {
    if (localStorage['userLanguage'] != null) {
        if (localStorage['userLanguage'] == "cn") {
            document.location.hash = "#cn";
        } else {
            document.location.hash = "#en";
        }
        refreshLanguage();
    }
}


function toggleVisibility(element) {
    if (document.getElementById(element).hidden == true) {
        $('#' + element).fadeIn(300);
        document.getElementById(element).hidden = false;
    } else {
        $('#' + element).fadeOut(300);
        document.getElementById(element).hidden = true;
    }
}

function toggleVisibilityNoFade(element) {
    if (document.getElementById(element).hidden == true) {
        document.getElementById(element).hidden = false;
    } else {
        document.getElementById(element).hidden = true;
        document.getElementById(element).style.display = "";
    }
}


function refreshLanguage(){
    if (window.location.hash == "#cn") {

        $('[lang="en"]').hide();
        $('[lang="kor"]').hide();
        $('[lang="zh"]').show();
        localStorage['userLanguage'] = "cn";
    }
    else if (window.location.hash == "#en"){

        $('[lang="zh"]').hide();
        $('[lang="kor"]').hide();
        $('[lang="en"]').show();
        localStorage['userLanguage'] = "en";
    }else if (window.location.hash == "#kor"){

        $('[lang="zh"]').hide();
        $('[lang="kor"]').show();
        $('[lang="en"]').hide();
        localStorage['userLanguage'] = "kor";
    }
}

window.onhashchange = function () {
    refreshLanguage();
    if (document.getElementById('languageTogglerDropdown') != null)
        toggleVisibility('languageTogglerDropdown');
}

// close profileDropDown
document.addEventListener("click", (e) => {
    if (!document.getElementById("profileDropDown").hidden && !e.target.classList.contains("dontHide"))
        toggleVisibilityNoFade("profileDropDown");
    if (!document.getElementById("mobileNav").hidden && !e.target.classList.contains("dontHide") && e.target != document.getElementById("mobileNavBars")) {
        toggleVisibilityNoFade("mobileNav");
        console.log("ok");
    }
});



function readCookie(name) {
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

function getUserInfo(sessionID) {
    return fetch("http://localhost:8000/userInfo", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ "SESSIONID": sessionID })
    })
    .then((res) => res.json()).then((data) => {
        // Handle response 
        console.log('Response: ', data);
        return data;
    })
    .catch(err => {
        // Handle error 
        console.log('Error message: ', err);
    });
}

function refreshUserInfo() {

    if (readCookie("SESSIONID") != "") {
        document.getElementById("loggedIn").hidden = false;
        
        document.getElementById("organizations").hidden = false;
        document.getElementById("notLoggedIn").hidden = true;
        //document.getElementById("aboutUs1").hidden = true;
        //document.getElementById("aboutUs2").hidden = true;

        var username = readCookie("username");
        var firstName = readCookie("firstName");
        var lastName = readCookie("lastName");
        var profilePicture = readCookie("profilePicture");

        document.getElementById("profileIcon").src = profilePicture;
        if (username.length > 11)
            username = username.slice(0, 11) + "...";
        document.getElementById("profileUsername").innerHTML = username;
        document.getElementById("profileName").innerHTML = firstName + " " + lastName;
        document.getElementById("profileIcon2").src = profilePicture;
        //userInfo = getUserInfo(readCookie("SESSIONID"));
        //$('[id="loggedIn"]').show();
        //$('[id="notLoggedIn"]').hide();

    }
}
function delete_cookie(name, path, domain) {
    if (readCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}


hidden = false;
function checkScreenSize() {
    if ($(document).width() < 1200) {
        if (!hidden) {
            document.getElementById("pcNav").hidden = "hidden";
            //document.getElementById("mobileNavBars").removeAttribute("hidden");
            document.getElementById("icons").hidden = "";
            document.getElementById("searchBar").style.marginLeft = "20px";
            document.getElementById("searchBar").style.width = "calc(100% - 600px)";
            hidden = true;
        }
    }
    else {
        if (hidden) {
            document.getElementById("icons").hidden = "hidden";
            document.getElementById("pcNav").removeAttribute("hidden");
            document.getElementById("searchBar").style.marginLeft = "40px";
            document.getElementById("searchBar").style.width = "calc(100% - 850px)";
           // document.getElementById("mobileNavBars").hidden = "hidden";
            hidden = false;
        }
    }

 
}



function showBar(element) {
    if (element == "#mobileNav" || element == "#mobileNavGames") {
        mouseMobileNav = true;
        $(element).toggle("slide", { direction: "right" }, 100);
        document.getElementById("mobileNav").hidden = "";
    }
    else if (element == "#navGamesDropDown") {
        if (!mousOverGames)
            $(element).fadeIn();
    }
    else {
        $(element).fadeIn();
    }
}


//function hideBar(element) {
//    if (element == "#navGamesDropDown") {
//        if (mousOverGames) {
//            return 0;
//        }
//        mousOverGames = true;
//        setTimeout(() => mousOverGames = false, 100);
//        $(element).fadeOut("fast");
//    }
//    else {
//        mouseMobileNav = false;

//        $(element).toggle("slide", { direction: "right" }, 100)
//    }
//}


checkLanguage(); // CHECK LANGAUGES
setInterval(checkScreenSize, 100); // CHECK SCREEN SIZE