
//fetch("http://localhost:8000/competitions/search?").then((Response) => {
//    return Response.json()
//}).then((data) => {
//    console.log(data.message);
//})

// get params from query
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const searchedCompetition = params.q;
//const serverAddress = "http://localhost:8000";
var competitions = [];
var previews = [];
document.getElementById("competitionSearchBar").value = searchedCompetition;
document.getElementById("searchedItemName").innerHTML = searchedCompetition;

var searchbarPlaceholders = ["Competition Search...", "竞赛搜索..."];

function getLanguage() {
    if (window.location.hash) {
        if (window.location.hash === "#cn") {
            console.log("wow");
        }
    }
}

// on language change
$(window).on('hashchange', function () {
    if (window.location.hash == "#cn") {
        document.getElementById("competitionSearchBar").placeholder = searchbarPlaceholders[1];
    }
    else {
        document.getElementById("competitionSearchBar").placeholder = searchbarPlaceholders[0];
    }
});


function findCompetitionsWithName(name) {
    fetch(serverAddress+"/competitions/search/" + name).then((Response) => {
        return Response.json()
    }).then((data) => {
        console.log(JSON.parse(data));
        competitions = JSON.parse(data);

        document.getElementById("searchedItemNumber").innerHTML = Object.keys(competitions).length;
        var index = 0;
        competitions.forEach(function (i) {
            createCompetitionElement(i, index);
            index += 1;
        })
    })

}

function redirectToComp(index) {
    window.location.href = "/competitions/page/?q=" + competitions[index].url; // or use windlow.location.replace()
}

function createCompetitionElement(competition, index) {

    // comp preview box
    const element = document.createElement("div");
    element.className = "competitionPreview";
    element.id = "comptitionPreview--" + index;
    document.getElementById("competitionPreviewArea").appendChild(element);


    // comp image
    const compImage = document.createElement("img");
    compImage.className = "competitionPreviewImage";
    if (competition.preview.substring(0, 6) == "static")
        competition.preview = serverAddress + "/" + competition.preview 
    compImage.src = competition.preview;
    element.appendChild(compImage);

    // comp name
    const compName = document.createElement("div");
    compName.innerHTML = competition.name;
    compName.className = "competitionPreviewName";
    element.appendChild(compName);

    // comp location
    const compLocation = document.createElement("div");
    compLocation.innerHTML = competition.location;
    compLocation.className = "competitionPreviewLocation";
    element.appendChild(compLocation);


    previews.push(element);

    previews[index].addEventListener('click', function handleClick() {
        redirectToComp(index);
    });
}

findCompetitionsWithName(searchedCompetition)
