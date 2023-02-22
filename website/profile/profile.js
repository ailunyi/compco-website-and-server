const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const searchedProfile = params.q;

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

//createEgg();

function getUserInfo(url) {
    fetch(serverAddress + "/competitions/page/" + url).then((Response) => {
        return Response.json()
    }).then((data) => {
        console.log(JSON.parse(data));
        competition = JSON.parse(data);
        

    })
}

console.log(searchedProfile);
