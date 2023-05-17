<script setup>
    import { onUnmounted, onMounted } from 'vue'
    import common from "../assets/common"
    
    import footerVue from '../components/footerVue.vue'
</script>

<template>
    <main>
        <div class="activityContent">
            <div class="galaxyArea">
                <div  id="competitionImageArea" class="competitionImageArea">
                    <div @mouseleave="showFullImageArea = false" @mouseover="showFullImageArea = true">
                        <img id="competitionImage" class="competitionImageAreaImage skeleton" @click="toggleImage(1)">
                        <div v-if="comeptitionInfo!=null" style="margin-top:-60px;height:60px; display:flex; flex-direction: column">
                            <label class="imageCounter">{{ currentImage + 1 }}/{{ comeptitionInfo.images.length }}</label>
                            <a v-if="showFullImageArea" @click="openImage" class="openImageButton">See Full Image</a>
                        </div>
                    </div>
                    
                    
                    <!-- <div v-if="comeptitionInfo!=null" class="competitionToggleButtons">
                        <button v-for="(button,index) in comeptitionInfo.images" :style="backgroundColor:" :key="button" class="imageToggle" @click="toggleImageNum(index)"></button>
                    </div> -->
                    <div class="competitionBasicInfo">
                        <div class="userOptions">
                            <a>Report</a>
                            <a>Share</a>
                            <a>Save</a>
                            <!-- <a>0 Dislikes</a> -->
                            <a @click="toggleLike(true)" :class="{'liked':likedActivity}">{{ comeptitionInfo==null?'...':comeptitionInfo.likes }} Likes</a>
                            <div><label id="views">...</label> views</div>
                        </div>

                        <div style="float:left; width:100%; border-top: solid var(--main-text-color) 1px; margin-top: 10px;">
                            <div class="userPreview" @click="redirectToProfile()">
                                <img class="userPreviewImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                <div class="competitionCreator"><label id="competitionCreator"></label><img src="/src/assets/images/logo.ico" class="adminImg" title="compco team" id="adminImg" hidden></div>
                                
                                <div class="contactInfo" id="name"></div>
                                <!-- <div class="contactInfo"><label id="name">...</label></div> -->
                            </div>

                            <div class="joinButton" title="Follow competition to be notified of updates">Follow</div>
                        </div>

                    </div>

                            
                    <div class="commentsArea">
                        <div class="commentCount"><label>{{ commentsCount }}</label> Comments</div>
                        <form @submit.prevent="handleComment()">
                            <img class="commentProfilePic" :src="common.profilePicture">
                            <div>
                                <div v-if="common.sessionID == -1">
                                    <label >You must </label> 
                                    <router-link  to="/signin">login</router-link>
                                    <label> to post a comment</label>
                                </div>
                                <div v-else>
                                    <label >Comment as </label> 
                                    <router-link  :to="'/profile/'+common.username">{{common.username}}</router-link>
                                </div>
                                <textarea :readonly="common.sessionID == -1" id="sendComment" @focus="commenting()" @input="auto_grow($event)" placeholder="Leave a comment..."></textarea>
                                    
                                <button type="submit"  v-if="showCommentingButtons">Comment</button>
                                <button @click.prevent="notCommenting()" style="background:none;color:var(--main-text-color)"  v-if="showCommentingButtons">Close</button>
                                
                            </div>
                        </form>
                        <div class="otherCommentsArea">
                            <div class="otherComment" v-for="(comment, index) in comments" :key="comment">
                                <router-link  :to="'/profile/'+comment.username">
                                    
                                    <img class="commentProfilePic" :src="comment.profilePic">
                                </router-link>
                                <div class="commentInfo" @mouseover="moreActions(index)" @mouseleave="stopActions(index)">
                                    <div>
                                        <router-link  :to="'/profile/'+comment.username">{{ comment.username }}</router-link>
                                        <label class="commentCreatedTime">{{ timeSince(new Date(parseInt(comment.mktimeCreated))) }} ago</label>
                                    </div>
                                    
                                    <div style=" white-space: pre-line;">{{ comment.message }}</div>
                                    <div class="commentActions">
                                        <label>Reply</label>
                                        <label >{{comment.likes}} Likes</label>
                                        <label>{{comment.likes}} Dislikes</label>
                                    </div>
                                    <div class="moreActions" v-if="comment.showMore">:</div>
                                </div>
                                
                            </div>
                            <label style="margin-top:20px; width:100%;text-align:center">- No comments remaining -</label>
                        </div>
                    </div>
                </div>
                <div class="competitionInfoArea">
                    <div style="display:flex; align-items: center; justify-content: center; width: 100%; gap:20px">
                        <div id="competitionNameTitle" class="competitionName">...</div>
                        <img class="competitionIcon skeleton" id="competitionIcon" />
                    </div>
                    
                    <div id="competitionDescription" :style="{cursor:canSeeMore?'pointer':'default'}" @click="seeMoreDescription()"   style="white-space: pre-line" class="competitionDescription">  </div>

                    <div class="competitionInfoParts">

                        <div class="competitionInfoPart">
                        location
                        <div id="competitionLocation"></div>
                        </div>
                        <div class="competitionInfoPart">
                            Start Time
                            <div id="competitionDateStart">  </div>
                            <div id="competitionTimeStart" v-if="comeptitionInfo!=null && comeptitionInfo.timeStart != ''"> {{ comeptitionInfo.timeStart }}</div>
                        </div>
                        <div class="competitionInfoPart">
                            End Time
                            <div id="competitionDateEnd" >  </div>
                            <div id="competitionTimeEnd" v-if="comeptitionInfo!=null && comeptitionInfo.timeEnd != ''"> {{ comeptitionInfo.timeEnd }}</div>
                        </div>
                        <div class="competitionInfoPart">
                            Register By
                            <div id="competitionDateRegister">  </div>
                            <div id="competitionTimeRegister" v-if="comeptitionInfo!=null && comeptitionInfo.timeRegister != ''"> {{ comeptitionInfo.timeRegister }}</div>
                        </div>
                        <div class="competitionInfoPart">
                            Register Location
                            <div id="registerLocation">  </div>
                        </div>
                        <div class="competitionInfoPart">
                            Category
                            <div id="category1">  </div>
                            <div id="category2">  </div>
                        </div>
                        <div class="competitionInfoPart" v-if="comeptitionInfo!=null && comeptitionInfo.prize != ''">
                            Rewards
                            <div id="prize"> {{comeptitionInfo.prize}}</div>
                        </div>
                        <div class="competitionInfoPart" >
                            Difficulty
                            <div id="difficulty">  </div>
                        </div>
                        <div class="competitionInfoPart" v-if="comeptitionInfo!=null && comeptitionInfo.fee != ''">
                            Entry Fee
                            <div id="fee"> {{comeptitionInfo.fee}}</div>
                        </div>
                        <div class="competitionInfoPart" v-if="comeptitionInfo!=null && comeptitionInfo.requirements != ''">
                            Requirements
                            <div id="requirements"> {{comeptitionInfo.requirements}}</div>
                        </div>
                        <!-- <div class="competitionInfoPart">
                            Joined
                        </div> -->
                        
                        <div class="competitionInfoPart" >
                            Activity type
                            <div id="type" v-if="comeptitionInfo!=null">{{ comeptitionInfo.type }}</div>
                        </div>
                        <div class="competitionInfoPart"  v-if="comeptitionInfo!=null && comeptitionInfo.contact != ''">
                            Contact
                            <div id="contact">{{comeptitionInfo.contact}}</div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            
            
            
        </div>
        
        
        <footerVue></footerVue>
    </main>
</template>

<style scoped>

.liked{
    background-color: var(--main-button-color)!important;
    color:white;
}
.commentActions{
    display: flex;
    gap:10px;
}

.moreActions{
    right:0px;
    position:absolute;
    cursor: pointer;
    width:20px;
    text-align: right;
}
.commentActions label{
    cursor: pointer;
    
    color:var(--main-panel-color);
}
.commentActions label:hover{
    cursor: pointer;
    color:var(--main-button-color);
}


.otherCommentsArea{
    display: flex;
    flex-direction: column;
}
.commentCreatedTime{
    color:var(--main-panel-color);
    margin-left: 10px;
}
.otherComment{
    width: 100%;
    display: flex;
    gap:10px;
    margin-top: 20px;
}

.commentInfo{
    display: flex;
    flex-direction: column;
    width:100%;
    font-family: montserrat-medium;
}

.otherComment a{
    
    text-decoration: none;
    
    font-family: montserrat-medium;
    color:var(--main-text-color);
}

.commentsArea{
    margin-top:40px;
    
}

.commentsArea form{
    display: flex;
    gap:20px;
    margin-top: 10px;
    
    font-family: montserrat-medium;
}

.commentsArea form a{
    color:var(--main-button-color);
    text-decoration: none;
    
    font-family: montserrat-medium;
}
.commentsArea form div button{
    float:right;
    margin-left: 10px;
    cursor: pointer;
    font-size: 15px;
    background-color: var(--main-button-color);
    border:none;
    padding: 7px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    color:white;
    
    font-family: montserrat-medium;
}


.commentsArea form div{
    flex-grow: 1;
}
.commentsArea form textarea{

    width:100%;
    border-radius: 5px;
    border: 1px solid black;
    padding:10px;
    font-size: 15px;
    resize: none;
    font-family: montserrat-medium;
    background-color: var(--main-panel-color);
    color:var(--main-text-color);
}

.commentProfilePic{
    width:50px;
    height:50px;
    border-radius: 30px;
}
.openImageButton{
    position: relative;
    color:rgba(255, 255, 255, 0.5);
    margin-left: 30px;
    cursor: pointer;
    width: 110px;
}
.openImageButton:hover{
    color:rgba(255, 255, 255, 1);
}
.imageCounter{
    color:white;
    position: relative;
    margin-left:60px;
    font-size: 18px;
}

.activityContent{
    width:calc(100vw - 200px);
    margin-left:100px;
    margin-top:80px;
    display: flex;
    flex-wrap: wrap;
}
.galaxyArea{
    /* background-image:url(../assets/images/galaxy.png);
    width:100vw;
    background-size: cover; */
    display: flex;
    flex-wrap: wrap;
}
.competitionArea{
    margin-top:100px;
    margin-bottom:50px;
    padding-left:200px;
    padding-right:200px;
}
.competitionImageArea {
    position: relative;
    float: left;
    width: 900px;
    border-radius: 10px;
    background: no-repeat center center fixed;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background-size: cover;
    display: flex;
    flex-direction: column;
    /* background-image:url(../assets/images/galaxy.png); */

}

.competitionImageAreaImage {
    
    cursor: pointer;
    object-fit: contain;
    background:url(../assets/images/galaxy.png);
    height: 500px;
    width: 100%;
    /* width: calc((500px/9)*16);
    margin-left: calc(((800px - (500px/9)*16))/2); */
    image-resolution: 100dpi snap;
    border-radius: 5px;
}

.competitionInfoArea {
    width:calc(100% - 950px);
    border-bottom-left-radius: 10px;
    padding-right: 10px;
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    flex-direction: column;
}



.competitionName {
    margin-right: 20px;
    margin-top: 10px;
    font-size: 34px;
    font-family: Montserrat-Bold;
}
.competitionToggleButtons{
    width:100%;
    display: flex;
    gap:20px;
    justify-content: center;
    flex-direction: row;
}
.competitionInfoParts{
    display: flex;
    flex-wrap: wrap;
}
.competitionInfoPart {
    margin-top: 30px;
    font-size: 18px;
    font-family: Montserrat-Bold;
    text-align: center;
    background-color: var(--main-panel-color);
    padding: 10px;
    border-radius: 10px;
    width:45%;
    word-wrap: break-word;
    margin-left: 2.5%;
    margin-right: 2.5%;
}
.competitionInfoPart div {
    font-family: Montserrat-Medium;
}

.competitionIcon {
    height: 200px;
    width: 300px;
    border-radius: 10px;
}

.competitionBasicInfo {
    width:100%;
    float:left;
    padding-bottom:10px;
    border-bottom:solid 1px;
}

.competitionDescription {
    float: left;
    width: 100%;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    margin-top: 15px;
    font-size: 17px;
    font-family: Montserrat-Medium;
    background-color: var(--main-panel-color);
    border-radius: 5px;
    word-wrap: break-word;
}

.userPreview {
    width:400px;
    float:left;
    margin-top: 10px;
    height: 55px;
    cursor: pointer;
    border: 1px transparent solid;
}

.userPreview:hover{
    border:1px black solid;
    border-radius:10px;
}

.competitionCreator {
    margin-left: 60px;
    font-size: 25px;
    line-height: 25px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.contactInfo {
    margin-left:60px;
    font-size: 20px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.userPreviewImage {
    float: left;
    margin-top: 1px;
    margin-left: 2.5px;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    background-color: black;
}

.userOptions {
    float: right;
    margin-top: 10px;
    font-family: Montserrat-Medium;
}

.userOptions a {
    float: right;
    margin-left: 20px;
    cursor: pointer;
    height: 40px;
    padding-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: var(--main-panel-color);
    border-radius: 20px;
}
.userOptions a:hover {
    background-color: var(--secondary-panel-color);
}
.userOptions div {
    float: right;
    margin-left: 20px;
    padding-top:10px;
}

.joinButton {
    float: right;
    margin-top: 10px;
    width: 180px;
    height: 55px;
    border-radius: 10px;
    background-color: var(--main-button-color);
    cursor: pointer;
    text-align: center;
    font-family: Montserrat-Bold;
    padding-top: 7.5px;
    font-size: 25px;
    color: white;
}

.imageToggle {
    position: absolute;
    background-color: rgba(0,0,0,0.3 );
    padding: 8px;
    border-radius: 30px;
    border-color: white;
    bottom: 30px;
    cursor:pointer;
}

.commentCount {
    font-family: Montserrat-Bold;
    font-size:25px;
}




.adminImg{
    margin-top: 5px;
    margin-left: 5px;
    height:15px;
    width: 15px;
}


@media only screen and (max-width: 1500px) {
    .activityContent{
        width:calc(100vw - 100px);
        margin-left:50px;
    }

    .competitionInfoArea {
        margin-top:10px;
        width:calc(100% - 750px);
    }

    
    .competitionIcon {
        float: left;
        height: 150px;
        width: 225px;
        border-radius: 10px;
    }


    .competitionImageArea {
        width: 700px;
        height: 400px;
    }

    .competitionImageAreaImage {
        height: 350px;
        
        width: 100%;
        /* width: calc((400px/9)*16);
        margin-left: calc(((600px - (400px/9)*16))/2); */
    }

    .competitionName{
        font-size: 25px;
    }
    .competitionInfoPart{
        font-size: 16px;
    }
    .competitionDescription{
        font-size: 16px;
    }

    .joinButton{
        font-size: 24px;
        height:55px;
    }
}

@media only screen and (max-width: 1100px) {
    .activityContent{
        width:100vw;
        margin-left:0px;
    }

    
    .joinButton {
        margin-top: 30px;
        float:left;
        margin-left: calc((100% - 200px)/2);
    }

    .competitionIcon {
        margin-left: calc((100% - 300px)/2);
    }

    .competitionInfoPart {
        width: 100%;
        margin-left:0px;
    }
    .competitionImageArea {
        width: 100vw;
        height: calc((100vw/16)*9);
        background: none;
        margin-top: -30px;
    }

    .competitionImageAreaImage {
        height: calc((100vw/16)*9);
        width: 100vw;
        margin-left: -20px;
    }
}

</style>

<script>
import { defineComponent } from 'vue'
import router from '../router';

export default defineComponent({
    setup() {
    },
    data(){
        return {
            comeptitionInfo:null,
            toggleImageTimer:null,
            currentImage:0,
            prevBanner:0,
            seeMore:false,
            canSeeMore:false,
            showCommentingButtons:false,
            
            comments:[],
            commentsCount:"...",
            showFullImageArea:false,
            
            likedActivity:false
        }
    },
    mounted(){
        this.getCompetitionInfo(this.$route.params.url);
        this.getComments(this.$route.params.url);
        this.toggleLike(false);
    },
    methods:{
        toggleLike(change){
            const formData = new FormData();
            var compInfo = JSON.stringify({'sessionID':common.sessionID,
                                            'competitionUrl':this.$route.params.url,
                                            "change":change});

            formData.append('content',compInfo);
            let that =this;
            console.log(formData);
            fetch(common.serverAddress + "/competitions/like", {
                method: 'POST',
                body: formData
            })
            .then((res) => res.json()).then((data) => {
                // Handle response 
                console.log('Response: ', data);
                that.likedActivity = data;
                if (change){
                    if (data == false) // just diliked
                        that.comeptitionInfo.likes--;
                    else
                        that.comeptitionInfo.likes++;
                }
                return data;
            })
            .catch(err => {
                // Handle error 
                console.log('Error message: ', err);
                
            });
        },
        moreActions(index){
            this.comments[index].showMore = true;
        },
        stopActions(index){
            this.comments[index].showMore = false;
        },
        timeSince(date) {
            var seconds = Math.floor((new Date() - date) / 1000);
            
            var interval = seconds / 31536000;

            if (interval > 1) {
            return Math.floor(interval) + " years";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
            return Math.floor(interval) + " months";
            }
            interval = seconds / 86400;
            if (interval > 1) {
            return Math.floor(interval) + " days";
            }
            interval = seconds / 3600;
            if (interval > 1) {
            return Math.floor(interval) + " hours";
            }
            interval = seconds / 60;
            if (interval > 1) {
            return Math.floor(interval) + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        },
        commenting(){
            if (common.sessionID == -1) return;
            this.showCommentingButtons = true;
        },
        notCommenting(){
            this.showCommentingButtons = false;
        },
        getComments(url){
            let that =this;
            fetch(common.serverAddress + "/competitions/comments/" + url).then((Response) => {
                return Response.json()
            }).then((data) => {
                data = JSON.parse(data);
                console.log(data);
                that.comments = data;
            })
        },
        handleComment(){
            var comment = document.getElementById("sendComment").value;
            document.getElementById("sendComment").value = "";
            this.showCommentingButtons = false;
            document.getElementById("sendComment").style.height = "60px";

            const formData = new FormData();
            var compInfo = JSON.stringify({'sessionID':common.sessionID,
                                            'competitionUrl':this.$route.params.url,
                                            'message':comment});

            formData.append('content',compInfo);
           let that =this;
            console.log(formData);
            fetch(common.serverAddress + "/competitions/comment", {
                method: 'POST',
                body: formData
            })
            .then((res) => res.json()).then((data) => {
                // Handle response 
                console.log('Response: ', data);
                that.getComments(that.$route.params.url);
                that.commentsCount++;
                return data;
            })
            .catch(err => {
                // Handle error 
                console.log('Error message: ', err);
                
            });
        },
        auto_grow(element) {
            element = element.target;
            element.style.height = "5px";
            element.style.height = (element.scrollHeight + 20)+"px";
        },
        redirectToProfile(){
            if (this.comeptitionInfo!=null){
                router.push("/profile/"+this.comeptitionInfo.creatorName);
            }
        },
        seeMoreDescription(){
        
            if (this.comeptitionInfo == null || this.canSeeMore == false) return false;
            if (!this.seeMore && this.comeptitionInfo != null){
                document.getElementById("competitionDescription").innerHTML = this.comeptitionInfo["description"];
                this.seeMore = true;
            }else{
                document.getElementById("competitionDescription").innerHTML = this.comeptitionInfo["description"].substring(0,300)+"...";
                this.seeMore = false;
            }
        },
        getCompetitionInfo(url) {
            let that = this;
            fetch(common.serverAddress + "/competitions/page/" + url).then((Response) => {
                return Response.json()
            }).then((data) => {
                console.log(JSON.parse(data));
                let competition = JSON.parse(data);
                if (competition == null) {
                    document.getElementById("competitionNameTitle").innerHTML = "NOT FOUND";
                }
                else {
                    that.comeptitionInfo = competition;
                    if (competition.comments == null) competition.comments = 0;
                    if (competition.likes == null) competition.likes = 0;
                    that.commentsCount = competition.comments;
                    // change info
                    document.getElementById("competitionNameTitle").innerHTML = competition["name"];
                    document.getElementById("competitionLocation").innerHTML = competition["location"];
                    if (competition["description"].length>300){
                        document.getElementById("competitionDescription").innerHTML = competition["description"].substring(0,300)+"...";

                        that.canSeeMore = true;
                    }
                    else{
                        document.getElementById("competitionDescription").innerHTML = competition["description"];
                        that.canSeeMore = false;
                    }
                        
                    document.getElementById("competitionCreator").innerHTML = competition["creatorName"];
                    document.getElementById("name").innerHTML = competition["creatorRealName"];
                    if (competition["creatorAdmin"] == true){
                        document.getElementById("adminImg").hidden = false;
                    }

                    document.getElementById("views").innerHTML = competition["views"];

                    document.getElementById("competitionDateStart").innerHTML = competition["dateStart"];
                    // document.getElementById("competitionTimeStart").innerHTML = competition["timeStart"];
                    
                    document.getElementById("competitionDateEnd").innerHTML = competition["dateEnd"];
                    // document.getElementById("competitionTimeEnd").innerHTML = competition["timeEnd"];
                    
                    document.getElementById("competitionDateRegister").innerHTML = competition["dateRegister"];
                    //document.getElementById("competitionTimeRegister").innerHTML = competition["timeRegister"];

                    
                    document.getElementById("registerLocation").innerHTML = competition["registerLocation"];
                    document.getElementById("category1").innerHTML = competition["category1"];
                    if (competition["category2"] != "None")
                        document.getElementById("category2").innerHTML = competition["category2"];
                    document.getElementById("difficulty").innerHTML = competition["difficulty"];

                    if (competition.preview.substring(0,6) == "static") 
                        competition.preview = common.serverAddress +"/"+ competition.preview
                    document.getElementById("competitionIcon").src = competition.preview;
                    document.getElementById("competitionIcon").classList.remove("skeleton");


                    // check images
                    for (var i = 0; i < competition.images.length; i++)
                        if (competition.images[i].substring(0, 6) == "static")
                            competition.images[i] = common.serverAddress + "/" + competition.images[i]
                    var img = new Image();
                    /*document.getElementById("competitionImageArea").style.backgroundImage = "url("+competition.images[0]+")";*/
                    document.getElementById("competitionImage").src = competition.images[0];
                    document.getElementById("competitionImage").classList.remove("skeleton");

                    that.toggleImageTimer = setTimeout(function () { that.toggleImage(1) }, 5000);
                }

            })


        },
            
        // createToggleButtons() {
        //     for (let i = 0; i < this.comeptitionInfo.images.length; i++) {
        //         const element = document.createElement("button");
        //         let that = this;
        //         element.addEventListener('click', function handleClick() {
        //             that.toggleImageNum(i);
        //         });
        //         element.id = "img-" + i;
        //         element.className = "imageToggle";
        //         element.style.left = "calc(50% - 100px + " + (200 / (this.comeptitionInfo.images.length + 1) * (i + 1)) + "px)";
        //         if (i == 0)
        //             element.style.backgroundColor = "white";
        //         document.getElementById("competitionImageArea").appendChild(element);
        //     }
        // },
        toggleImageNum(num) {
            let that = this;
            this.currentImage = num;
            document.getElementById("competitionImage").src = this.comeptitionInfo.images[num];

            document.getElementById("img-" + String(this.prevBanner)).style.backgroundColor = "rgba(0,0,0,0.3 )";
            this.prevBanner = num;
            document.getElementById("img-" + String(num)).style.backgroundColor = "white";
            clearTimeout(this.toggleImageTimer);
            this.toggleImageTimer = setTimeout(function () { that.toggleImage(1) }, 5000);
        },
        toggleImage(dir) {
            let that = this;
            this.currentImage += dir;
            if (this.currentImage >= this.comeptitionInfo.images.length)
                this.currentImage = 0;
            else if (this.currentImage < 0)
                this.currentImage = this.comeptitionInfo.images.length - 1;
            document.getElementById("competitionImage").src = this.comeptitionInfo.images[this.currentImage];

            //document.getElementById("img-" + String(this.prevBanner)).style.backgroundColor = "rgba(0,0,0,0.3 )";
            this.prevBanner = this.currentImage;
            //document.getElementById("img-" + String(this.currentImage)).style.backgroundColor = "white";
            clearTimeout(this.toggleImageTimer);
            this.toggleImageTimer = setTimeout(function () { that.toggleImage(1) }, 5000);
        },
        openImage(){
            window.open(this.comeptitionInfo.images[this.currentImage],"_blank")
        }
    }

    
})
</script>
