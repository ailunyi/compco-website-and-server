var hidden = false;
var mouseMobileNav = false;
var mobileNavGames = false;

//fetch("http://localhost:8000/request").then((Response) => {
//    return Response.json()
//}).then((data) => {
//    console.log(data.message);
//})


function scrollChangeBrightness() {
    var amount = 60 - scrollY / 17;
    document.getElementById("bannerimg").style.filter = "brightness(" + String(amount) + "%)"
}

var totalBanners = 2;
var prevBanner = 1;
function toggleBanner(num) {

    document.getElementById("bannerimg-" + String(prevBanner)).style.backgroundColor = "rgba(0,0,0,0.3 )";
    prevBanner = num;
    document.getElementById("bannerimg").style.backgroundImage = "url(images/covers/" + String(num) + ".jpg)";
    document.getElementById("bannerimg-" + String(num)).style.backgroundColor = "white";
    clearInterval(toggleBannerTimer);
    toggleBannerTimer = setInterval(autoToggleBanner, 5000);
}

function autoToggleBanner() {
    if (prevBanner < totalBanners)
        toggleBanner(prevBanner + 1);
    else
        toggleBanner(1);

}

function createToggleButtons() {
    for (let i = 0; i < totalBanners; i++) {
        const element = document.createElement("button");
        element.onclick = "toggleBanner(" + (i + 1) + ")";
        element.id = "bannerimg-" + (i + 1);
        element.className = "bannerToggle";
        element.style = " left: calc(50% - 30px)";
        if (i == 0)
            element.backgroundColor = "white";
    }
}

var toggleBannerTimer = setInterval(autoToggleBanner, 5000);

if (document.getElementById("bannerimg"))
    setInterval(scrollChangeBrightness, 50);


const searchbarPlaceholders = ["Competition Search...", "竞赛搜索..."];

// on language change
$(window).on('hashchange', function () {
    if (window.location.hash == "#cn") {
        document.getElementById("competitionSearchBar").placeholder = searchbarPlaceholders[1];
    }
    else {
        document.getElementById("competitionSearchBar").placeholder = searchbarPlaceholders[0];
    }
});