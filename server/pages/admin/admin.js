
//const serverAddress = "http://localhost:8000";
var competitions = [];
var previews = [];
var currentImage = 0;
var currentCompetition = 0;
var official = false;

function getPendingCompetitions() {
    fetch(serverAddress + "/admin/pendingComptitions").then((Response) => {
        return Response.json()
    }).then((data) => {

        currentCompetition = 0;
        competitions = [];
        previews = [];
        official = false;
        console.log(JSON.parse(data));
        competitions = JSON.parse(data);
        document.getElementById("competitionPreviewArea").innerHTML = ""; //remove existing
        document.getElementById("searchedItemNumber").innerHTML = Object.keys(competitions).length;
        var index = 0;
        competitions.forEach(function (i) {
            createCompetitionElement(i, index);
            index += 1;
        })
    })

}
function toggleImage(dir) {
    currentImage += dir;
    if (currentImage >= competitions[currentCompetition].images.length)
        currentImage = 0;
    else if (currentImage < 0)
        currentImage = competitions[currentCompetition].images.length-1;
    document.getElementById("competitionImage").src = competitions[currentCompetition].images[currentImage];
}

function showCompInfo(index) {
    official = false;
    document.getElementById("officialButton").innerText = "NO";
    document.getElementById("competitionInfoPopup").hidden = false;
    document.getElementById("competitionName").innerHTML = "competition name: " + competitions[index].name;
    document.getElementById("competitionLocation").innerHTML = "location: " + competitions[index].location;
    document.getElementById("competitionDescription").innerHTML = "description: " + competitions[index].description;
    document.getElementById("competitionCreator").innerHTML = "creator: " + competitions[index].creatorName;
    document.getElementById("competitionURL").innerHTML = "url: " + competitions[index].url;

    // check images
    for (var i = 0; i < competitions[index].images.length; i++)
        if (competitions[index].images[i].substring(0, 6) == "static")
            competitions[index].images[i] = serverAddress + "/" + competitions[index].images[i]

    document.getElementById("competitionImage").src = competitions[index].images[0];
}

function toggleOfficial() {
    official = !official;
    if (official) {
        document.getElementById("officialButton").innerText = "YES";
    } else {
        document.getElementById("officialButton").innerText = "NO";
    }
}

function approveCompetition() {
    if (confirm("Are you sure you want to approve?") == true) {
        return fetch(serverAddress + "/admin/approveCompetition", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ url: competitions[currentCompetition].url, official: official })
        })
        .then((res) => res.json()).then((data) => {
            // Handle response 
            console.log('Response: ', data);

            document.getElementById("competitionInfoPopup").hidden = true;
            getPendingCompetitions();
            return data;
        })
        .catch(err => {
            // Handle error 
            console.log('Error message: ', err);
        });
    }
}


function rejectCompetition() {
    if (confirm("Are you sure you want to reject?") == true) {
        return fetch(serverAddress + "/admin/rejectCompetition", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ url: competitions[currentCompetition].url, official: official })
        })
        .then((res) => res.json()).then((data) => {
            // Handle response 
            console.log('Response: ', data);

            document.getElementById("competitionInfoPopup").hidden = true;
            getPendingCompetitions();
            return data;
        })
        .catch(err => {
            // Handle error 
            console.log('Error message: ', err);
        });
    }
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
        showCompInfo(index);
        currentCompetition = index;
    });
}

getPendingCompetitions()
