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
        document.getElementById("exploreUsersArea").innerHTML = "";
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
var categoriesAll = [
    ["Ongoing","Official", "Events", "Programs","Internships", "MostViewed", "Newest", "MostLiked","Finished"],
    ["Math", "Chem", "CS", "Econ", "Business", "Physics", "Chinese", "History", "English", "Other"],
    [],
    ["Gaming","Other"],
    []];
var competitionCount = 0;
var categoryIndex = 0;
if (window.location.pathname == "/explore/subject/")
    categoryIndex = 1;
if (window.location.pathname == "/explore/sports/")
    categoryIndex = 2;
if (window.location.pathname == "/explore/hobbies/")
    categoryIndex = 3;
if (window.location.pathname == "/explore/other/")
    categoryIndex = 4;

function getTrendingCompetitions() {
    var category = "";
    if (categoryIndex == 0)
        category = "all";
    else if (categoryIndex == 1)
        category = "Subject";
    else if (categoryIndex == 2)
        category = "Sports";
    else if (categoryIndex == 3)
        category = "Hobbies";
    else if (categoryIndex == 4)
        category = "Other";

    fetch(serverAddress + "/explore/trendingComptitions/"+category).then((Response) => {
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
            createCompetitionElement(i, "competitionPreviewArea-Trending",true,"2");
        })
    })
}

function redirectToComp(index) {
    window.location.href = "/competitions/page/?q=" + competitions[index].url; // or use windlow.location.replace()
}

function redirectToUser(index) {
    window.location.href = "/profile/?username=" + users[index].username;
}

function createCompetitionElement(competition, parent, rank, type) {

    // comp preview box
    const element = document.createElement("div");
    element.className = "competitionPreview"+type;
    element.id = "comptitionPreview--" + competitionCount;
    document.getElementById(parent).appendChild(element);


    // comp image
    const compImage = document.createElement("img");
    compImage.className = "competitionPreviewImage"+type;
    if (competition.preview.substring(0, 6) == "static")
        competition.preview = serverAddress + "/" + competition.preview
    compImage.src = competition.preview;
    element.appendChild(compImage);

    // comp name
    const compName = document.createElement("div");
    
    if (rank)
        compName.innerHTML = (competitionCount + 1) + ". " ;
        
    if (competition.official){
        const officialIcon = document.createElement("img");
        officialIcon.src = "/images/official.png";
        officialIcon.className = "officialIcon";
        officialIcon.title = "official";
        compName.appendChild(officialIcon);
    }
    const compNameLabel = document.createElement("label");
    if (competition.name.length > 10 && competition.official)
        competition.name = competition.name.slice(0, 10) + "...";
        
    if (competition.name.length > 15 && !competition.official)
        competition.name = competition.name.slice(0, 15) + "...";

    compNameLabel.innerHTML = competition.name;
    compName.appendChild(compNameLabel);
    compName.className = "competitionPreviewName"+type;
    element.appendChild(compName);

    // comp location
    const compLocation = document.createElement("div");
    if (competition.location.length > 22)
        competition.location = competition.location.slice(0, 22) + "...";
    compLocation.innerHTML = competition.location;
    compLocation.className = "competitionPreviewLocation"+type;
    element.appendChild(compLocation);


    // comp views
    const compViews = document.createElement("div");
    if (competition.views == null)
        competition.views = 0;
    if (competition.views>=1000 && competition.views<1000000){
        competition.views/=1000;
        if (competition.views<10)   
            competition.views = competition.views.toFixed(1);
        else
            competition.views = competition.views.toFixed(0);
        competition.views += "K";
    }else if (competition.views>=1000000){
        competition.views/=1000000;
        competition.views = competition.views.toFixed(0);
        competition.views += "M";
    }
    compViews.innerHTML = competition.views + " 👁";
    compViews.className = "competitionPreviewViews"+type;
    element.appendChild(compViews);

    // comp difficulty
    const compLikes = document.createElement("div");
    compLikes.innerHTML = " Hard";
    compLikes.className = "competitionPreviewLikes"+type;
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


    //  image
    const userImage = document.createElement("img");
    if (user.profilePicture.substring(0, 6) == "static")
        user.profilePicture = serverAddress + "/" + user.profilePicture
    userImage.src = user.profilePicture;
    element.appendChild(userImage);

    //  username
    const userName = document.createElement("label");
    if (user.username.length > 16)
        user.username = user.username.slice(0, 16) + "...";
        
    userName.className = "username";
    userName.innerHTML = user.username;
    element.appendChild(userName);

    if (user.admin){
        const adminImg = document.createElement("div");
        adminImg.className = "adminImg";
        adminImg.title = "compco team";
        element.appendChild(adminImg);
    }
    
    //  name
    const realName = document.createElement("label");
    var userRealName = user.firstName +" "+ user.lastName;
    if (userRealName > 16)
        userRealName = userRealName.slice(0, 16) + "...";
        
    realName.className = "realName";
    realName.innerHTML = userRealName;
    element.appendChild(realName);


    userPreviews.push(element);

    userPreviews[index].addEventListener('click', function handleClick() {
        redirectToUser(index);
    });
}

function createSkeletons() {
    for (var i = 0; i < 8; i++) {

        // comp preview box
        const element = document.createElement("div");
        element.className = "competitionPreview2 skeleton";
        document.getElementById("competitionPreviewArea-Trending").appendChild(element);
    }
    
    // for (var i = 0; i < 5; i++) {

    //     // comp preview box
    //     const element = document.createElement("div");
    //     element.className = "userPreview skeleton";
        
    //     const element2 = document.createElement("img");
    //     element2.className = "skeleton";
    //     element2.appendChild(element);
    //     document.getElementById("exploreUsersArea").appendChild(element);
    // }

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
if (categoryIndex == 0)
    getNewestUsers();