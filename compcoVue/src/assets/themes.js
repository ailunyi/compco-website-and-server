

let exports = {}
// light, dark
exports.themeNames =    ["Light", "Dark", "Purple", "Neon", "Lime", "idk"]
exports.mainBgColors = ["#fcfcfc", "#151515", "#A084DC", "#3F0071", "#82CD47", "#6d597a"];
exports.secondaryBgColors = ["#F6F6F6", "#1F1F1F", "#EBC7E6", "#0002A1", "#379237", "#355070"];
exports.mainButtonColors = ["#3175fa", "#3175fa", "#FF6CBD", "#FB2576", "#007200", "#4871A2"];
exports.navColors = ["white", "black", "#BFACE2", "#332FD0", "#ccff33", "#e56b6f"];
exports.textColors = ["black", "#bab9b6", "#645CBB", "#FB2576", "#007200", "#FFB790"];
exports.searchbarColors = ["white", "#232323", "#BFACE2", "rgba(255, 255, 255,0.3)", "white", "white"]
exports.searchbarTextColors = ["black", "white", "black", "white", "black", "black"]

exports.mainPanelColors = ["rgba(0,0,0,0.3)", "rgba(255, 255, 255,0.2)", "rgba(255, 255, 255,0.2)", "rgba(255, 255, 255,0.2)", "rgba(0,0,0,0.3)", "rgba(255, 255, 255,0.2)"];
exports.secondaryPanelColors = ["rgba(0,0,0,0.5)", "rgba(182, 182, 182,0.6)", "rgba(135, 109, 180,0.8)", "rgba(255, 255, 255,0.3)", "rgba(0,0,0,0.1)", "rgba(255, 255, 255,0.3)"];

exports.curTheme = 0;

// change colors according to theme
exports.setColors= () =>{

    if (localStorage['theme'] != null) { // check local storage for color preference
        exports.curTheme = parseInt(localStorage['theme']);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { // check system color preference
        exports.curTheme = 1;
    }
    let curTheme = exports.curTheme;

    document.documentElement.style.setProperty('--main-bg-color', exports.mainBgColors[curTheme]);
    document.documentElement.style.setProperty('--main-panel-color', exports.mainPanelColors[curTheme]);
    document.documentElement.style.setProperty('--secondary-panel-color', exports.secondaryPanelColors[curTheme]);
    document.documentElement.style.setProperty('--main-nav-color', exports.navColors[curTheme]);
    document.documentElement.style.setProperty('--main-text-color', exports.textColors[curTheme]);
    document.documentElement.style.setProperty('--secondary-bg-color', exports.secondaryBgColors[curTheme]);
    document.documentElement.style.setProperty('--main-button-color', exports.mainButtonColors[curTheme]);
    document.documentElement.style.setProperty('--main-searchbar-color', exports.searchbarColors[curTheme]);
    document.documentElement.style.setProperty('--searchbar-text-color', exports.searchbarTextColors[curTheme]);
}

exports.changeColor= () =>{
    exports.curTheme += 1;
    if (exports.curTheme >= exports.themeNames.length)
        exports.curTheme = 0;
    localStorage['theme'] = exports.curTheme;
    exports.setColors();
}


export default exports;