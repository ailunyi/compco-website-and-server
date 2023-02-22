var hidden = false;
var mouseMobileNav = false;
var mobileNavGames = false;

//fetch("http://localhost:8000/request").then((Response) => {
//    return Response.json()
//}).then((data) => {
//    console.log(data.message);
//})

var shown = true;
var shown2 = true;
var bannerSize = 530;
var shown3 = true;
function scrollChangeBrightness() {
    if ($(document).width() < 1400)
        bannerSize = 425;
    else
        bannerSize = 530;


    if (scrollY > bannerSize + 50 && !shown3) {

        document.getElementById("navigation").classList.remove("noTransition");
        shown3 = true;
    } else if (scrollY < bannerSize + 50 && shown3) {
        document.getElementById("navigation").classList.add("noTransition");
        shown3 = false;
    }


    if (scrollY < bannerSize && shown2) {
        if (document.getElementById("navigation") == null) return;
        shown2 = false;

        document.getElementById("navigation").style.backgroundColor = "transparent";
        document.getElementById("navigation").style.boxShadow = "none";

        document.getElementById("searchBarArea").hidden = "hidden";
        var elements = document.getElementsByClassName("navLink");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] != null) {
                elements[i].style.color = "white";
                elements[i].classList.add("noTransition");
            }
        }
        


        var elements = document.getElementsByClassName("navShowBar");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] != null) {
                elements[i].style.color = "white";
                elements[i].classList.add("noTransition");
            }
        }

        var elements = document.getElementsByClassName("navIcon");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] != null) {
                elements[i].style.backgroundColor = "white";
                elements[i].classList.add("noTransition");
            }
        }

        var elements = document.getElementsByClassName("inboxIcon");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] != null) {
                elements[i].style.backgroundColor = "white";
                elements[i].classList.add("noTransition");
            }
        }

        var elements = document.getElementsByClassName("compcoText");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] != null) {
                elements[i].style.color = "white";
                elements[i].classList.add("noTransition");
            }
        }

        var element = document.getElementById("signin");
        element.style.color = "white";
        element.classList.add("noTransition");

        element.style.color = "white";
    } else if (scrollY > bannerSize && !shown2) {

        if (document.getElementById("navigation") == null) return;
        shown2 = true;

        document.getElementById("searchBarArea").hidden = "";

        document.getElementById("navigation").style.boxShadow = "0 1px 3px -2px grey";

        document.getElementById("navigation").style.backgroundColor = "var(--main-nav-color)";

        var elements = document.getElementsByClassName("navLink");
        for (var i = 0; i < elements.length; i++)
            if (elements[i] != null)
                elements[i].style.color = "var(--main-text-color)";

        var elements = document.getElementsByClassName("navIcon");
        for (var i = 0; i < elements.length; i++)
            if (elements[i] != null)
                elements[i].style.backgroundColor = "var(--main-text-color)";

        var elements = document.getElementsByClassName("inboxIcon");
        for (var i = 0; i < elements.length; i++)
            if (elements[i] != null)
                elements[i].style.backgroundColor = "var(--main-text-color)";


        var elements = document.getElementsByClassName("navShowBar");
        for (var i = 0; i < elements.length; i++)
            if (elements[i] != null)
                elements[i].style.color = "var(--main-text-color)";

        var elements = document.getElementsByClassName("compcoText");
        for (var i = 0; i < elements.length; i++)
            if (elements[i] != null)
                elements[i].style.color = "var(--main-text-color)";

        var element = document.getElementById("signin");
        element.style.color = "var(--main-text-color)";
    }


    var amount = 120 - scrollY / 5;
    document.getElementById("banner").style.filter = "brightness(" + String(amount) + "%)"
}


if (document.getElementById("bannerimg"))
    setInterval(scrollChangeBrightness, 50);

var prevBanner = 0;
var covers = ["shanghai.jpg", "tokyo2.jpg", "cherry.jpg", "china.jpg", "cool.gif"];
var coversSmall = ["shanghaiSmall.jpg", "tokyo2Small.jpg", "cherrySmall.jpg", "chinaSmall.jpg", "cool.gif"];
var images = [];
var imagesSmall = [];
var blured = true;
function toggleBanner(num) {

    document.getElementById("bannerimg-" + String(prevBanner)).style.backgroundColor = "rgba(0,0,0,0.3 )";
    prevBanner = num;
    if (images[num].complete && images[num].naturalWidth != 0) {
        document.getElementById("bannerimg").style.backgroundImage = "url(images/covers/" + covers[num];
        if (blured) {
            document.getElementById("bannerimg").classList.toggle("blur");
            document.getElementById("bannerimg").classList.toggle("noBlur");
        }
        blured = false;
    }
    else {

        document.getElementById("bannerimg").style.backgroundImage = "url(images/covers/" + coversSmall[num];
        if (!blured) {
            document.getElementById("bannerimg").classList.toggle("blur");
            document.getElementById("bannerimg").classList.toggle("noBlur");
        }
        blured = true;
    }
    document.getElementById("bannerimg-" + String(num)).style.backgroundColor = "white";
    clearTimeout(toggleBannerTimer);
    toggleBannerTimer = setTimeout(autoToggleBanner, 5000);
}

function autoToggleBanner() {
    if (prevBanner < covers.length-1)
        toggleBanner(prevBanner + 1);
    else
        toggleBanner(0);

}

function createToggleButtons() {

    document.getElementById("bannerimg").style.backgroundImage = "url(images/covers/" + coversSmall[0];
    for (let i = 0; i < covers.length; i++) {

        //prelaod images
        var img = new Image();
        img.src = "/images/covers/" + covers[i];
        img.index = i;
        images.push(img);


        var img2 = new Image();
        img2.src = "/images/covers/" + coversSmall[i];
        imagesSmall.push(img2);

        img.onload = function () {
            if (prevBanner == this.index) {
                document.getElementById("bannerimg").style.backgroundImage = "url(images/covers/" + covers[this.index];
                if (blured) {
                    document.getElementById("bannerimg").classList.toggle("blur");
                    document.getElementById("bannerimg").classList.toggle("noBlur");
                }
                blured = false;
            }
            
        };

        //create buttons
        const element = document.createElement("button");
        element.addEventListener('click', function handleClick() {
            toggleBanner(i);
        });
        element.id = "bannerimg-" + i;
        element.className = "bannerToggle";
        element.style.left = "calc(50vw - 150px + " + (300 / (covers.length+1) * (i+1)) + "px)";
        if (i == 0)
            element.style.backgroundColor = "white";
        document.getElementById("banner").appendChild(element);
    }
}


createToggleButtons();
var toggleBannerTimer = setTimeout(autoToggleBanner, 5000);


const searchbarPlaceholders = ["Competition/Activity/Community Search...", "比赛/活动/社区搜索..."];

// on language change
$(window).on('hashchange', function () {
    if (window.location.hash == "#cn") {
        document.getElementById("competitionSearchBar").placeholder = searchbarPlaceholders[1];
    }
    else {
        document.getElementById("competitionSearchBar").placeholder = searchbarPlaceholders[0];
    }
});
