const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

var searchedProfile = params.username;
if (searchedProfile == null){
    searchedProfile = readCookie("username");
    if (searchedProfile == ""){
        window.location.href = "/signin/";
    }
}

document.title = searchedProfile+"'s profile";

var links = ['https://funvizeo.com/media/memes/3b25a6767a2c44f0/when-you-fart-but-you-poop-meme-1d7d4a1aa0753e35-b18ab626096ee820.jpg',
    'https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/programming-or-googling.jpg',
    "https://www.bakeneko.games/index.html", "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
    "https://i.pinimg.com/736x/bb/d5/5a/bbd55a2c112ecd05c679420efa6619ae.jpg",
    "https://todaysparent.mblycdn.com/uploads/tp/2017/06/when-your-kid-becomes-a-meme.jpg",
    "https://i.chzbgr.com/thumb800/18014213/h6932CDF2/a-compilation-of-anime-memes",
    "https://noguiltlife.com/wp-content/uploads/2015/08/BTS-meme-8-650x488.jpg",
    "https://s.hdnux.com/photos/73/11/26/15504786/4/ratio3x2_1800.jpg"]

function goToLink() {
    window.open(links[Math.floor(Math.random() * links.length)], '_blank');
}

function createEgg() {
    const element = document.createElement("div");
    element.id = "egg";
    element.classList.add("egg");
    element.addEventListener('click', function handleClick() {
        goToLink();
    });
    document.getElementById("eggArea").appendChild(element);

    $('#egg').on('mouseover', function () {
        $("#egg").animate({
            'top': 70 + Math.random() * (window.innerHeight - 140) + "px",
            'left': Math.random() * (window.innerWidth - 80) + "px"
        });

    })
}

function showPopup(){
    
    toggleVisibilityNoFade('popup');
    // document.body.style.overflow = "hidden";
    // document.getElementById("mainContent").style.overflow = "hidden";
}

//createEgg();
var user;
function getUserProfile(name) {
    fetch(serverAddress + "/getUser/" + name).then((Response) => {
        return Response.json()
    }).then((data) => {
        data = JSON.parse(data);
        console.log(data);
        user = data;
        if (user == null){
            
            document.getElementById("realName").innerHTML = "user not found";
            return;
        }
        document.getElementById("username").innerHTML = data.username;
        document.getElementById("realName").innerHTML = data.firstName + " " + data.lastName;
        document.getElementById("school").innerHTML = data.school;
        document.getElementById("contact").innerHTML = data.contact;
        document.getElementById("birthday").innerHTML = data.birthday;
        document.getElementById("profilePicture").src = data.profilePicture;
        document.getElementById("profilePicture").classList.remove("skeleton");
        if (data.bio == null)
            document.getElementById("bio").innerHTML = "user has no bio yet...";
        else
            document.getElementById("bio").innerHTML = data.bio;
        if (data.banner != null){
            document.getElementById("banner").style.backgroundImage = "url("+data.banner+")";
            document.getElementById("banner").classList.remove("skeleton");   
        }

        if (data.admin == true)
            document.getElementById("compcoTeamIcon").hidden = false;

        if (readCookie("username") == data.username){ // user
            document.getElementById("editProfilePic").src = data.profilePicture;
            document.getElementById("editButton").hidden = false;
            document.getElementById("editUsername").value = data.username;
            document.getElementById("editFirstName").value = data.firstName;
            document.getElementById("editLastName").value = data.lastName;
            document.getElementById("editBio").value = data.bio;
            document.getElementById("editSchool").value = data.school;
            document.getElementById("editContact").value = data.contact;
            document.getElementById("editBirthday").value = data.birthday;
            
            document.getElementById("savedButton").hidden = false;

            if (data.banner != null){
                document.getElementById("editBannerPic").src = data.banner;
            }
        }else{
            document.getElementById("messageButton").hidden = false;
        }
        if (data.egg == true)
            createEgg();

    })
}


// create competition
function editProfile(details) {
    const formData = new FormData();
    
    //formData.append('files', logo);
    //formData.append('files', logo);

    formData.append("content", JSON.stringify({details}) );

    fetch(serverAddress + "/editUserProfile", {
        method: 'POST',
        body: formData
    })
    .then((res) => res.json()).then((data) => {
        // Handle response 
        console.log('Response: ', data);        
        location.reload();
    })
    .catch(err => {
        // Handle error 
        console.log('Error message: ', err);
    });


}


document.addEventListener("DOMContentLoaded", () => {
    const editProfilePopup = document.querySelector("#editProfilePopup");

    editProfilePopup.addEventListener("submit", e => {
        e.preventDefault();
        const details = new Object();
        
        details.username = document.querySelector("#editUsername").value;
        details.pic = document.querySelector("#pic-input").files[0];
        details.banner = document.querySelector("#banner-input").files[0];

        details.firstName = document.querySelector("#editFirstName").value;
        details.lastName = document.querySelector("#editLastName").value;

        details.school = document.querySelector("#editSchool").value;
        details.birthday = document.querySelector("#editBirthday").value;
        details.bio = document.querySelector("#editBio").value;
        details.contact = document.querySelector("#editContact").value;

        details.sessionId = readCookie("SESSIONID");
        
        console.log(details);
        editProfile(details);

    });
});

getUserProfile(searchedProfile);
console.log(searchedProfile);
