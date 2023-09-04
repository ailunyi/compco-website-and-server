<script setup>
    import { onUnmounted, onMounted } from 'vue'
    import common from "../assets/common"
    
    import footerVue from '../components/footerVue.vue'
    import compPreview from '../components/compPreview.vue'
</script>

<template>
    <main>
        <div id="egg" class="egg" v-if="showEgg" @click="goToLink()" @mouseover="moveEgg(this)" :style="{top:eggTop + 'px',left:eggLeft + 'px'}"></div>
        <div id="nav-placeholder"></div>

        <div  id="popup" v-if="showEditPopup">
            <div class="overlay" @click="closePopup()"></div>
            <div class="popup">
                <form id="editProfilePopup" @submit.prevent="editProfileHandle()">
                    <div>Edit Profile</div>
                    <hr>
                    <!-- <div >
                        <label for="pic-input" style="cursor: pointer;margin-top: 0px;" title="choose profile picture"> 
                            <img class="profilePic" id="editProfilePic">
                        </label>
                        <input style="display:none" id="pic-input" accept="image/*"  type="file">

                        <label for="banner-input" style="cursor: pointer;margin-top: 0px;" title="choose profile banner">
                                <img class="banner" id="editBannerPic">
                        </label>
                        <input style="display:none" id="banner-input" accept="image/*"  type="file">

                    </div> -->

                    <div>
                        <label style="margin-top: 5px;">Username:</label>
                        <input style="margin-top: 5px; background-color: grey;" placeholder="username" :value="newUserInfo.username" readonly>
                    </div>
                    
                    <div>
                        <label >First Name:</label>
                        <input :value="newUserInfo.firstName"  placeholder="your first name" id="editFirstName">
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input :value="newUserInfo.lastName" placeholder="your last name" id="editLastName">
                    </div>
                    
                    <div>
                        <label>School:</label>
                        <input :value="newUserInfo.school" id="editSchool" placeholder="school name (ex. SHSID)">    
                    </div>

                    <div>
                        <label>Birthday:</label>
                        <input id="editBirthday" :value="newUserInfo.birthday" type="date">
                    </div>

                    <div>
                        <label>Contact:</label>
                        <input :value="newUserInfo.contact" id="editContact" placeholder="email, wechat, qq, etc.">
                    </div>

                    <div>
                        <label>Bio:</label>
                        <textarea :value="newUserInfo.bio" placeholder="bio..." id="editBio"></textarea>
                    </div>
                    

                    <button type="submit">Save</button>
                    <div style="height: 20px; float: left; width: 100%;"></div>
                </form>
                <a @click="closePopup()" class="closePopup"  >X</a>
            </div>
        </div>

        <div>
            <div class="banner skeleton" id="banner"></div>
            <img :src="userInfo.profilePicture" class="profilePicture skeleton" id="profilePicture" style="opacity: 100%;"/>
            <div class="realName">
                <div id="realName">{{userInfo.firstName}} {{ userInfo.lastName }}</div>
                <img v-if="userInfo.admin" id="compcoTeamIcon" class="verifiedIcon" title="compco team" src="@/assets/images/logo.ico" >
            </div>
            <div class="username">
                @<text id="username">{{userInfo.username}}</text>        
            </div>
            
            <a id="editButton" class="editButton button" @click="showPopup()" v-if="userInfo.username == common.username" >edit profile</a>
            <a id="messageButton" class="messageButton button" v-else>Message</a>
            <!-- <div class="followersArea">
                <div>0 Followers</div>
                <div>0 Following</div>
            </div> -->
        </div>
        <div id="mainContent" class="mainContent" style="margin-top:550px;min-height:600px;">
            <div class="infoArea">
                School: <label id="school">{{userInfo.school}}</label>
            </div>
            <div class="infoArea">
                Contact: <label id="contact">{{userInfo.contact}}</label>
            </div>
            <div class="infoArea">
                Birthday: <label id="birthday">{{userInfo.birthday}}</label>
            </div>
            <div class="infoArea">
                Hobbies: <label>{{userInfo.hobbies}}</label> 
            </div>
            <div id="bio" class="description">
                {{userInfo.bio}}
            </div>
            <div class="categoriesArea">
                <a class="categoriesAreaChosen">Overview</a>
                <a id="activitiesButton">Activities</a>
                <a id="postsButton">Posts</a>
                <a id="savedButton" hidden><i class="fa fa-lock"></i> Saved</a>
            </div>
            <div class="usermadeActivities">
               <compPreview v-for="comp in userMadeComps" :key="comp" :name="comp.name" :location="comp.location" :preview="comp.preview" :views="comp.views" :difficulty="comp.difficulty" :url="comp.url"></compPreview>
            </div>
        </div>
        <footerVue></footerVue>
    </main>
</template>

<style scoped>
.banner {
    position:absolute;
    top:60px;
    width: 100%;
    height: 330px;
    background-repeat: no-repeat;
    background-size: cover;
}

.usermadeActivities{
    display: flex;
    flex-wrap: wrap;
}

.competitionPreview{
    flex-grow: 1;
    /* max-width: 340px; */
}

.realName {
    position: absolute;
    left: 350px;
    top: 390px;
    font-size: 45px;
    font-family: Montserrat-Bold;
}

.realName div{
    float:left;
}

.description {
    margin-top:20px;
    margin-bottom: 30px;
    font-size: 20px;
    font-family: Montserrat-Medium;
    white-space: pre-line;
}

.profilePicture {
    position: absolute;
    top: 290px;
    width: 200px;
    height: 200px;
    left: 100px;
    border-radius: 20px;
    border: solid var(--main-bg-color) 5px;
    background-color: var(--main-bg-color);
    transition:border 1s;
}

.username {
    position: absolute;
    left: 350px;
    top: 440px;
    font-size: 35px;
    font-family: Montserrat-Medium;
}
.verifiedIcon{
    float:left;
    margin-left: 10px;
    margin-top: 18px;
    height: 30px;
    width: 30px;
}
.button {
    position: absolute;
    right: 150px;
    top: 430px;
    width: 100px;
    height: 50px;
    color: white;
    border: white;
    border-radius: 5px;
    padding-top: 15px;
    text-align: center;
    text-decoration: none;
    font-family: Montserrat-Bold;
    cursor: pointer;
}

.messageButton{
    
    background-color: var(--main-button-color);
}


.editButton{
    color:var(--main-text-color);
    background-color: var(--main-panel-color);
    width: 120px;
}

.editButton:hover{
    background-color: rgba(0,0,0,0.5);
}



.title {
    font-size: 20px;
    font-family: Montserrat-Bold;
    opacity: 60%;
}

.egg {
    z-index: 1;
    position: absolute;
    top: 100px;
    width: 80px;
    height: 70px;
    cursor: pointer;
    background-image: url("/src/assets/images/egg.gif");
    background-repeat: no-repeat;
    background-size: cover;
    transition:top 700ms, left 700ms;
}
.infoArea {
    margin-bottom: 10px;
    font-family: Montserrat-Medium;
    font-size: 20px;
}
.infoArea label {
    font-family: Montserrat-SemiBold;
}
.categoriesArea {
    border-bottom: solid 1px var(--main-text-color);
    font-family: Montserrat-SemiBold;
    font-size: 20px;
    padding-bottom: 5px;
    margin-bottom:20px;
}
.categoriesArea a{
    margin-right:20px;
    cursor:pointer;
    opacity:50%;
}
.categoriesAreaChosen {
    opacity: 100% !important;
    padding-bottom:2px;
    border-bottom: 3px solid;
}
.categoriesArea a:hover{
    margin-right:20px;
    opacity:100%;
}
.followersArea{
    position: absolute;
    right:500px;
    top:450px;
    font-family: Montserrat-SemiBold;
}

.inventory{
    margin-top:20px;
    float:right;
    width:400px;
    height:500px;
    background-color:var(--main-panel-color);
    border-radius:20px;
}

.overlay {
    position: fixed;
    background-color: rgba(0,0,0,0.4);
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 3;
}

.popup {
    overflow-y:auto;
    overflow-x: hidden;
    position: fixed;
    width: 600px;
    height: 70%;
    top: 15%;
    left: calc((100vw - 600px)/2);
    border-radius: 10px;
    background-color: var(--main-bg-color);
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 4;
}
.popup .profilePic{
    margin-left:20px;
    width: 100px;
    height: 100px;
    border-radius: 10px;
}
.popup form{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.popup .banner{
    margin-left:40px;
    margin-top: 30px;
    width: 300px;
    height: 100px;
    border-radius: 10px;
}

.popup div{
    margin-left: 20px;
    margin-top: 20px;
    font-family: Montserrat-Bold;
    font-size: 25px;
    width: 100%;
    display: flex;
    gap:5px;
}
.popup hr{
    border:none;
    margin-top: 10px;
    background-color:var(--main-text-color);
    height: 1px;
    margin-left:-10px;
    width: calc(100% + 20px);
}

.closePopup{
    font-size: 25px;
    font-family: Montserrat-Bold;
    position: absolute;
    right:20px;
    top:20px;
    cursor: pointer;
}

.popup label{
    margin-left: 20px;
    width: 120px;
    font-size: 20px;
    font-family: Montserrat-SemiBold;
    margin-top: 20px;
    margin-bottom: 20px;
}

.popup input{
    margin-top: 20px;
    width:395px;
    margin-right: 20px;
    height:40px;
    border-radius: 5px;
    border:solid 1px var(--main-text-color);
    font-size: 17px;
    
    font-family: Montserrat-SemiBold;
    color:var(--main-text-color);
    background-color: var(--main-bg-color);
    padding-left: 5px;
}

.popup textarea{
    margin-top: 20px;
    width:395px;
    margin-right: 20px;
    min-height:80px;
    border-radius: 5px;
    border:solid 1px var(--main-text-color);
    background-color: var(--main-bg-color);
    padding-left: 5px;
    resize: vertical;
    color:var(--main-text-color);
    font-size: 17px;
    
    font-family: Montserrat-SemiBold;
}
.popup button{
    height: 40px;
    width: 100px;
    margin-top: 30px;
    margin-left: 175px;
    font-family:Montserrat-Bold;
    background-color: var(--main-button-color);
    border-radius: 5px;
    border:solid 1px black;
    cursor: pointer;
    font-size: 15px;
}

@media only screen and (max-width: 1200px) {
    .popup{
        top:0px;
        left:0px;
        width: 100%;
        height:100%;
    }
    .realName {
        left: 270px;
    }

    .profilePicture {
        left: 20px;
    }

    .username {
        left: 270px;
    }

    .button {
        top:300px;
        right: 20px;
    }

    .editButton{
        background-color:rgba(0,0,0,0.8);
        color:white;
    }

    .popup input{
        width:calc(100% - 200px);
    }

    .popup textarea{
        width:calc(100% - 200px);
    }
}


@media only screen and (max-width: 600px) {
    
    .profilePicture {
        top: 350px;
        width: 100px;
        height: 100px;
    }

    .realName {
        left: 150px;
        font-size: 35px;
    }
    
    .verifiedIcon{
        height: 20px;
        width: 20px;
    }
    .username {
        left: 150px;
        font-size: 25px;
        
        top: 440px;
    }

    .mainContent{
        margin-top: 500px !important;
    }
}

</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
    },
    data(){
        return {
            showEgg:false,
            eggTop:0,
            eggLeft:0,
            userInfo:[],
            showEditPopup:false,
            newUserInfo:[],
            userMadeComps:[]
        }
    },
    mounted(){
        this.moveEgg();
        this.getUserProfile(this.$route.params.username);
    },
    methods:{
        goToLink() {
                            
            let links = ['https://funvizeo.com/media/memes/3b25a6767a2c44f0/when-you-fart-but-you-poop-meme-1d7d4a1aa0753e35-b18ab626096ee820.jpg',
                'https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/programming-or-googling.jpg',
                "https://www.bakeneko.games/index.html", "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
                "https://i.pinimg.com/736x/bb/d5/5a/bbd55a2c112ecd05c679420efa6619ae.jpg",
                "https://todaysparent.mblycdn.com/uploads/tp/2017/06/when-your-kid-becomes-a-meme.jpg",
                "https://i.chzbgr.com/thumb800/18014213/h6932CDF2/a-compilation-of-anime-memes",
                "https://noguiltlife.com/wp-content/uploads/2015/08/BTS-meme-8-650x488.jpg",
                "https://s.hdnux.com/photos/73/11/26/15504786/4/ratio3x2_1800.jpg"]

            window.open(links[Math.floor(Math.random() * links.length)], '_blank');
        },
        moveEgg(element){
            this.eggTop = 70 + Math.random() * (window.innerHeight - 140);
            this.eggLeft = Math.random() * (window.innerWidth - 80);
        },

        editProfileHandle(e){
            
            const details = new Object();
            details.username = this.userInfo.username;
            details.firstName = document.querySelector("#editFirstName").value;
            details.lastName = document.querySelector("#editLastName").value;

            details.school = document.querySelector("#editSchool").value;
            details.birthday = document.querySelector("#editBirthday").value;
            details.bio = document.querySelector("#editBio").value;
            details.contact = document.querySelector("#editContact").value;

            details.sessionId = common.sessionID;
            
            console.log(details);
            this.editProfile(details);
        },
        
        editProfile(details) {
            const formData = new FormData();
            
            //formData.append('files', logo);
            //formData.append('files', logo);

            formData.append("content", JSON.stringify({details}) );

            fetch(common.serverAddress + "/editUserProfile", {
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
        },

        showPopup(){
            this.showEditPopup = true;
        },

        closePopup(){
            this.showEditPopup = false;
        },
        
        getUserProfile(name) {
            let that =this;
            fetch(common.serverAddress + "/getUser/" + name).then((Response) => {
                return Response.json()
            }).then((data) => {
                data = JSON.parse(data);
                let user = data;
                if (user == null){
                    
                    document.getElementById("realName").innerHTML = "user not found";
                    return;
                }
                that.userInfo = data;
                that.newUserInfo = data;
                
                if (data.banner != null){
                    document.getElementById("banner").style.backgroundImage = "url("+data.banner+")";
                    document.getElementById("banner").classList.remove("skeleton");   
                }

                that.showEgg = data.egg;
                that.getUserMadeCompetitions(data.USERID)
            })
        },
        getUserMadeCompetitions(id) {
            let that =this;
            fetch(common.serverAddress + "/getUserMadeComps/" + id).then((Response) => {
                return Response.json()
            }).then((data) => {
                data = JSON.parse(data);
                console.log(data);
                that.userMadeComps = data;
            })
        }
    }

    
})
</script>
