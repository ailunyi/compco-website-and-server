
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
var competition;
var currentImage = 0;
//document.getElementById("competitionSearchBar").value = searchedCompetition;
//document.getElementById("searchedItemName").innerHTML = searchedCompetition;

function redirectToProfile() {
    window.location.href = "/profile/?q=" + competition["creatorName"]; // or use windlow.location.replace()
}

function toggleImage(dir) {
    currentImage += dir;
    if (currentImage >= competition.images.length)
        currentImage = 0;
    else if (currentImage < 0)
        currentImage = competition.images.length - 1;
    document.getElementById("competitionImage").src = competition.images[currentImage];

    document.getElementById("img-" + String(prevBanner)).style.backgroundColor = "rgba(0,0,0,0.3 )";
    prevBanner = currentImage;
    document.getElementById("img-" + String(currentImage)).style.backgroundColor = "white";
    clearTimeout(toggleImageTimer);
    toggleImageTimer = setTimeout(function () { toggleImage(1) }, 5000);

}

function toggleImageNum(num) {
    console.log(num);
    document.getElementById("competitionImage").src = competition.images[num];

    document.getElementById("img-" + String(prevBanner)).style.backgroundColor = "rgba(0,0,0,0.3 )";
    prevBanner = num;
    document.getElementById("img-" + String(num)).style.backgroundColor = "white";
    clearTimeout(toggleImageTimer);
    toggleImageTimer = setTimeout(function () { toggleImage(1) }, 5000);
}

function getCompetitionInfo(url) {
    fetch(serverAddress + "/competitions/page/" + url).then((Response) => {
        return Response.json()
    }).then((data) => {
        console.log(JSON.parse(data));
        competition = JSON.parse(data);
        if (competition == null) {
            document.getElementById("competitionNameTitle").innerHTML = "NOT FOUND";
        }
        else {
            // change info
            document.getElementById("competitionNameTitle").innerHTML = competition["name"];
            document.getElementById("competitionLocation").innerHTML = competition["location"];
            document.getElementById("competitionDescription").innerHTML = competition["description"];
            document.getElementById("competitionCreator").innerHTML = competition["creatorName"];
            document.getElementById("contactInfo").innerHTML = competition["contact"];
            document.getElementById("competitionDate").innerHTML = competition["date"];
            document.getElementById("views").innerHTML = competition["views"];

            document.getElementById("competitionDuration").innerHTML = competition["time"];
            if (competition.preview.substring(0,6) == "static") 
                competition.preview = serverAddress +"/"+ competition.preview
            document.getElementById("competitionIcon").src = competition.preview;
            document.getElementById("competitionIcon").classList.remove("skeleton");


            // check images
            for (var i = 0; i < competition.images.length; i++)
                if (competition.images[i].substring(0, 6) == "static")
                    competition.images[i] = serverAddress + "/" + competition.images[i]
            var img = new Image();
            /*document.getElementById("competitionImageArea").style.backgroundImage = "url("+competition.images[0]+")";*/
            document.getElementById("competitionImage").src = competition.images[0];
            document.getElementById("competitionImage").classList.remove("skeleton");

            createToggleButtons();

            toggleImageTimer = setTimeout(function () { toggleImage(1) }, 5000);
        }

    })

}

var prevBanner = 0;
var toggleImageTimer;


function createToggleButtons() {
    for (let i = 0; i < competition.images.length; i++) {
        const element = document.createElement("button");
        element.addEventListener('click', function handleClick() {
            toggleImageNum(i);
        });
        element.id = "img-" + i;
        element.className = "imageToggle";
        //var dir = 1;
        //if (i % 2 == 0)
        //    dir = -1;
        //console.log((dir * Math.floor((i + 1) / 2) * 25));
        //"calc(50% + " + (dir * Math.floor((i + 1) / 2) * 40) + "px)";
        element.style.left = "calc(50% - 100px + " + (200 / (competition.images.length + 1) * (i + 1)) + "px)";
        if (i == 0)
            element.style.backgroundColor = "white";
        document.getElementById("competitionImageArea").appendChild(element);
    }
}


getCompetitionInfo(searchedCompetition);