
// light, dark
var themeNames =    ["Light", "Dark", "Purple", "Neon", "Lime", "idk"]
var mainBgColors = ["#fcfcfc", "#151515", "#A084DC", "#3F0071", "#82CD47", "#6d597a"];
var secondaryBgColors = ["#F6F6F6", "#1F1F1F", "#EBC7E6", "#0002A1", "#379237", "#355070"];
var mainButtonColors = ["#3175fa", "#3175fa", "#FF6CBD", "#FB2576", "#007200", "#4871A2"];
var navColors = ["white", "black", "#BFACE2", "#332FD0", "#ccff33", "#e56b6f"];
var textColors = ["black", "#bab9b6", "#645CBB", "#FB2576", "#007200", "#FFB790"];
var searchbarColors = ["white", "#232323", "#BFACE2", "white", "white", "white"]
var searchbarTextColors = ["black", "white", "black", "white", "black", "black"]

var mainPanelColors = ["rgba(0,0,0,0.3)", "rgba(255, 255, 255,0.2)", "rgba(255, 255, 255,0.2)", "rgba(255, 255, 255,0.2)", "rgba(0,0,0,0.3)", "rgba(255, 255, 255,0.2)"];
var secondaryPanelColors = ["rgba(0,0,0,0.5)", "rgba(255, 255, 255,0.3)", "rgba(255, 255, 255,0.3)", "rgba(255, 255, 255,0.3)", "rgba(0,0,0,0.1)", "rgba(255, 255, 255,0.3)"];

var curTheme = 0;

// change colors according to theme
function setColors() {

    if (localStorage['theme'] != null) { // check local storage for color preference
        curTheme = parseInt(localStorage['theme']);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { // check system color preference
        curTheme = 1;
    }

    document.documentElement.style.setProperty('--main-bg-color', mainBgColors[curTheme]);
    document.documentElement.style.setProperty('--main-panel-color', mainPanelColors[curTheme]);
    document.documentElement.style.setProperty('--secondary-panel-color', secondaryPanelColors[curTheme]);
    document.documentElement.style.setProperty('--main-nav-color', navColors[curTheme]);
    document.documentElement.style.setProperty('--main-text-color', textColors[curTheme]);
    document.documentElement.style.setProperty('--secondary-bg-color', secondaryBgColors[curTheme]);
    document.documentElement.style.setProperty('--main-button-color', mainButtonColors[curTheme]);
    document.documentElement.style.setProperty('--main-searchbar-color', searchbarColors[curTheme]);
    document.documentElement.style.setProperty('--searchbar-text-color', searchbarTextColors[curTheme]);
}

setColors();

function changeColor() {
    curTheme += 1;
    if (curTheme >= themeNames.length)
        curTheme = 0;
    localStorage['theme'] = curTheme;
    document.getElementById("themeName").innerHTML = "Theme: " + themeNames[curTheme];
    setColors();
}
