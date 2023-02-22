var competitions = [];
var previews = [];
var userPreviews = [];
var currentCompetition;
var users = [];

function getNewestUsers() {
    fetch(serverAddress + "/explore/newUsers").then((Response) => {
        return Response.json()
    }).then((data) => {
        users = [];

        console.log(JSON.parse(data));
        users = JSON.parse(data);
        //document.getElementById("competitionPreviewArea").innerHTML = ""; //remove existing
        //document.getElementById("searchedItemNumber").innerHTML = Object.keys(competitions).length;
        var index = 0;
        users.forEach(function (i) {
            createUserElement(i, index);
            index += 1;
        })
    })

}

//all, subject,sports
var categoriesAll = [["Official", "Events", "Programs","Internships", "MostViewed", "Newest", "MostLiked"],
    ["Math", "Chem", "CS", "Econ", "Business", "Physics", "Chinese", "History", "English", "Other"]];
var competitionCount = 0;
var categoryIndex = 0;
if (window.location.pathname == "/explore/subject/")
    categoryIndex = 1;

function getTrendingCompetitions() {
    fetch(serverAddress + "/explore/trendingComptitions/all").then((Response) => {
        return Response.json()
    }).then((data) => {
        removeSkeletons("Trending");
        currentCompetition = 0;
        competitions = [];

        console.log(JSON.parse(data));
        competitions = JSON.parse(data);
        //document.getElementById("competitionPreviewArea").innerHTML = ""; //remove existing
        //document.getElementById("searchedItemNumber").innerHTML = Object.keys(competitions).length;

        competitions.forEach(function (i) {
            createCompetitionElement(i, "competitionPreviewArea-Trending",true);
        })
    })
}

function redirectToComp(index) {
    window.location.href = "/competitions/page/?q=" + competitions[index].url; // or use windlow.location.replace()
}

function redirectToUser(index) {
    window.location.href = "/profile/?q=" + users[index].username;
}

function createCompetitionElement(competition, parent, rank) {

    // comp preview box
    const element = document.createElement("div");
    element.className = "competitionPreview";
    element.id = "comptitionPreview--" + competitionCount;
    document.getElementById(parent).appendChild(element);


    // comp image
    const compImage = document.createElement("img");
    compImage.className = "competitionPreviewImage";
    if (competition.preview.substring(0, 6) == "static")
        competition.preview = serverAddress + "/" + competition.preview
    compImage.src = competition.preview;
    element.appendChild(compImage);

    // comp name
    const compName = document.createElement("div");
    if (competition.official)
        competition.name = "(official) " + competition.name;
    if (rank)
        competition.name = (competitionCount + 1) + ". " + competition.name;
    if (competition.name.length > 22)
        competition.name = competition.name.slice(0, 22) + "...";
    compName.innerHTML = competition.name;
    compName.className = "competitionPreviewName";
    element.appendChild(compName);

    // comp location
    const compLocation = document.createElement("div");
    if (competition.location.length > 22)
        competition.location = competition.location.slice(0, 22) + "...";
    compLocation.innerHTML = competition.location;
    compLocation.className = "competitionPreviewLocation";
    element.appendChild(compLocation);


    // comp views
    const compViews = document.createElement("div");
    if (competition.views == null)
        competition.views = 0;
    compViews.innerHTML = competition.views + " 👁";
    compViews.className = "competitionPreviewViews";
    element.appendChild(compViews);

    // comp difficulty
    const compLikes = document.createElement("div");
    compLikes.innerHTML = " Hard";
    compLikes.className = "competitionPreviewLikes";
    element.appendChild(compLikes);
    element.index = competitionCount;

    previews.push(element);

    previews[competitionCount].addEventListener('click', function handleClick() {
        redirectToComp(this.index);
    });
    competitionCount += 1;
}

function createUserElement(user, index) {

    // comp preview box
    const element = document.createElement("div");
    element.className = "userPreview";
    element.id = "userPreview--" + index;
    document.getElementById("exploreUsersArea").appendChild(element);


    // comp image
    const userImage = document.createElement("img");
    if (user.profilePicture.substring(0, 6) == "static")
        user.profilePicture = serverAddress + "/" + user.profilePicture
    userImage.src = user.profilePicture;
    element.appendChild(userImage);

    // comp name
    const userName = document.createElement("label");
    if (user.username.length > 16)
        user.username = user.username.slice(0, 16) + "...";
    userName.innerHTML = user.username;
    element.appendChild(userName);


    userPreviews.push(element);

    userPreviews[index].addEventListener('click', function handleClick() {
        redirectToUser(index);
    });
}

function createSkeletons() {
    for (var i = 0; i < 9; i++) {

        // comp preview box
        const element = document.createElement("div");
        element.className = "competitionPreview skeleton";
        document.getElementById("competitionPreviewArea-Trending").appendChild(element);
    }
    for (var j = 0; j < categoriesAll[categoryIndex].length; j++) {
        for (var i = 0; i < 5; i++) {

            // comp preview box
            const element = document.createElement("div");
            element.className = "competitionPreview skeleton";
            document.getElementById("competitionPreviewArea-" + categoriesAll[categoryIndex][j]).appendChild(element);

        }
    }
    
}

function removeSkeletons(category) {
    document.getElementById("competitionPreviewArea-" + category).innerHTML = "";
}

createSkeletons();
getTrendingCompetitions();
getNewestUsers();