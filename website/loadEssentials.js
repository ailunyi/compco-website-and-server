$.get("/nav.html", function (data) {
    $("#nav-placeholder").replaceWith(data);

    refreshLanguage();
    refreshUserInfo();
});

$.get("/footer.html", function (data) {
    $("#footer").replaceWith(data);
});

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
        $('#' + element).fadeIn();
        document.getElementById(element).hidden = false;
    } else {
        $('#' + element).fadeOut();
        document.getElementById(element).hidden = true;
    }
}

function refreshLanguage(){
    if (window.location.hash == "#cn") {

        $('[lang="en"]').hide();
        $('[lang="zh"]').show();
        localStorage['userLanguage'] = "cn";
    }
    else {

        $('[lang="zh"]').hide();
        $('[lang="en"]').show();
        localStorage['userLanguage'] = "en";
    }
}

window.onhashchange = function () {
    refreshLanguage();
    if (document.getElementById('languageTogglerDropdown') != null)
        toggleVisibility('languageTogglerDropdown');
}


checkLanguage();


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

function refreshUserInfo() {

    if (readCookie("SESSIONID") != "") {
        document.getElementById("loggedIn").hidden = false;
        document.getElementById("notLoggedIn").hidden = true;
        //$('[id="loggedIn"]').show();
        //$('[id="notLoggedIn"]').hide();
    }
}
function delete_cookie(name, path, domain) {
    if (get_cookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

//function checkIfText() {
//    if (window.innerWidth < 600 || window.screen.width < 600) {
//        if (!hidden) {
//            for (i = 0; i < document.getElementsByClassName("navGames").length; i++) {
//                document.getElementsByClassName("navGames")[i].hidden = "hidden";
//            }
//            document.getElementById("showBar").removeAttribute("hidden");
//            hidden = true;
//        }
//    }
//    else {
//        if (hidden) {
//            for (i = 0; i < document.getElementsByClassName("navGames").length; i++) {
//                document.getElementsByClassName("navGames")[i].removeAttribute("hidden");
//            }
//            document.getElementById("showBar").hidden = "hidden";
//            hidden = false;
//        }
//    }
//}


//function showBar(element) {
//    if (element == "#mobileNav" || element == "#mobileNavGames") {
//        mouseMobileNav = true;
//        $(element).toggle("slide", { direction: "right" }, 100);
//    }
//    else if (element == "#navGamesDropDown") {
//        if (!mousOverGames)
//            $(element).fadeIn();
//    }
//    else {
//        $(element).fadeIn();
//    }
//}


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


//setInterval(checkIfText, 100)