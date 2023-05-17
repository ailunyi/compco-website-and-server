<script setup>

import compPreview from '../../components/compPreview.vue'
import common from "../../assets/common"
</script>

<template>
    <main>
        <div class="exploreCompetitionsArea">

            <div class="title">Trending</div>
            <div id="competitionPreviewArea-Trending" class="competitionPreviewAreaTop">
                <div v-for="(comp, index) in trendingComps" :key="comp" class="competitionPreview2" :class="{'skeleton':comp==null}" @click="redirectToComp(comp.url)">
                    <img v-if="comp!=null" class="competitionPreviewImage2" :src="comp.preview.substring(0, 6) == 'static'?common.serverAddress + '/' + comp.preview:comp.preview" :alt="comp.name">
                    <div v-if="comp!=null" class="competitionPreviewName2">{{ index+1 }}. {{ comp.name.length>15?comp.name.slice(0, 15) + "...":comp.name}}</div>
                    <div v-if="comp!=null" class="competitionPreviewViews2">{{ comp.views }} 👁</div>
                </div>
            </div>

            <div class="exploreCommunitiesArea">
                <div class="title">Communities</div>
                
            </div>
        
        
            <div class="exploreUsersArea">
                <div class="title" style="margin-bottom:30px;">Newest Users</div>
                <div id="exploreUsersArea">
                    <div v-for="(user, index) in users" :key="user" class="userPreview" :class="{'skeleton':user==null}" @click="redirectToUser(user.username)">
                        <img v-if="user!=null"  :src="user.profilePicture.substring(0, 6) == 'static'?common.serverAddress + '/' + user.profilePicture:user.profilePicture" :alt="user.username">
                        <label v-if="user!=null" class="username">{{ user.username.length>16?user.username.slice(0, 16) + "...":user.username}}</label>
                        <div v-if="user!=null && user.admin" class="adminImg" title="compco team"></div>
                        <label v-if="user!=null" class="realName">{{ user.firstName.length + 1 + user.lastName.length>16?(user.firstName +' '+  user.lastName).slice(0, 16) + "...":user.firstName +' '+ user.lastName}}</label>
                    </div>
                </div>
            </div>
            <div class="title">Newest <router-link to="/search/?q=all">see more</router-link></div>
            <div v-if="newest[0] == null" class="competitionPreviewArea">
                <compPreview v-for="comp in newest" :key="comp" class="skeleton"></compPreview>
            </div>
            <div v-else class="competitionPreviewArea">
                <compPreview v-for="comp in newest" :key="comp" :name="comp.name" :url="comp.url" :preview="comp.preview" :location="comp.location" :views="comp.views" :difficulty="comp.difficulty"></compPreview>
            </div>

            <div class="title">Trending Events <a>see more</a></div>
            <div id="competitionPreviewArea-Events" class="competitionPreviewArea">
                <compPreview v-for="comp in ongoing" :key="comp" :class="{'skeleton':comp==null}"></compPreview>
            </div>

            <div class="title">Ongoing Activites <a>see more</a></div>
            <div id="competitionPreviewArea-Ongoing" class="competitionPreviewArea">
                <compPreview v-for="comp in ongoing" :key="comp" name="hi" :class="{'skeleton':comp==null}" ></compPreview>
            </div>

            <div class="title">Official Competitions <a>see more</a></div>
            <div id="competitionPreviewArea-Official" class="competitionPreviewArea">
                <compPreview v-for="comp in ongoing" :key="comp" :class="{'skeleton':comp==null}"></compPreview>
            </div>


            <div class="title">Trending Summer & Winter Programs <a>see more</a></div>
            <div id="competitionPreviewArea-Programs" class="competitionPreviewArea">
                <compPreview v-for="comp in ongoing" :key="comp" :class="{'skeleton':comp==null}"></compPreview>
            </div>

            <div class="title">Trending Internships & Jobs <a>see more</a></div>
            <div id="competitionPreviewArea-Internships" class="competitionPreviewArea">
                <compPreview v-for="comp in ongoing" :key="comp" :class="{'skeleton':comp==null}"></compPreview>
            </div>


            <div class="title">Most viewed <a>see more</a></div>
            <div id="competitionPreviewArea-MostViewed" class="competitionPreviewArea">
                <compPreview v-for="comp in ongoing" :key="comp" :class="{'skeleton':comp==null}"></compPreview>
            </div>

            

            <div class="title">Most liked <a>see more</a></div>
            <div id="competitionPreviewArea-MostLiked" class="competitionPreviewArea">
                <compPreview v-for="comp in ongoing" :key="comp" :class="{'skeleton':comp==null}"></compPreview>
            </div>


            <div class="title">Just Finished<a>see more</a></div>
            <div id="competitionPreviewArea-Finished" class="competitionPreviewArea">
                <compPreview v-for="comp in ongoing" :key="comp" :class="{'skeleton':comp==null}"></compPreview>
            </div>

        </div>
        <footerVue/>
    </main>
</template>

<style scoped>
main{
    width:100vw;
}

.exploreCompetitionsArea {
    margin-left: 100px;
    margin-top: 200px;
    margin-bottom: 50px;
    padding-top:30px;
    width:calc(100% - 100px);
}
.exploreCommunitiesArea {
    display: none;
    
    position: absolute;
    width: 400px;
    right: 0px;
    top: 230px;
    margin-bottom: 50px;
}

.exploreUsersArea {
  
    position: absolute;
    width: 400px;
    right: 0px;
    top: 30px;
    /* margin-top: 765px; */
    margin-bottom: 50px;
}


.title {
    font-size: 25px;
    font-family: Montserrat-Bold;
}
.title a{
    margin-left:5px;
    font-size: 20px;
    color:var(--main-panel-color);
    text-decoration: none;
    cursor:pointer;
}
.title a:hover {
    color: var(--main-button-color);
    transition: none !important;

}
.categoryTitle{
    float:left;
    width:120px;
}

/*competition preview area*/

.competitionPreviewAreaTop {
    width: calc(100vw - 530px);
    margin-bottom: 50px;
    min-height: 500px;
}

.competitionPreviewArea {
    height: 350px;
    margin-bottom: 50px;
    overflow: hidden;
}

.exploreCompetitionsArea {
    float: left;
    padding-bottom: 20px;
    min-height: 1000px;
}


.competitionPreview2 {
    position: relative;
    margin-top: 30px;
    display: inline-block;
    background-color: white;
    /* height: 200px; */
    /* width: 230px; */
    width: calc(100%/4 - 20px);
    aspect-ratio: 3/2;
    margin-right: 20px;
    cursor: pointer;
    box-shadow: 1px 1px 2px 1px grey;
    border-radius: 10px;

}

.competitionPreview2:hover {
    box-shadow: 2px 2px 4px 2px var(--main-text-color);
}


.competitionPreviewName2 {
    
    position: absolute;
    /* float: left;
    margin-left: 10px; */
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 18px;
    bottom: 5px;
    left: 10px;
    background-color: var(--main-text-color);
    color:var(--main-bg-color);

    padding-left: 10px;
    padding-right: 10px;

    border:solid 1px black;
    border-radius: 5px;
    transition: text-color 1s, background-color 1s;
}

.officialIcon{
    margin-bottom: -3px;
    height: 20px;
    width: 20px;
    background-color: var(--main-button-color);
    border-radius: 5px;
    margin-right: 5px;
    transition: background-color 1s;
}

.competitionPreviewLocation2 {
    display: none;

    float: left;
    margin-left: 10px;
    font-size: 20px;

}

.competitionPreviewViews2 {
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-family: Montserrat-Medium;
    font-size: 13px;
    
    background-color: var(--main-text-color);
    color:var(--main-bg-color);
    
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    
    border:solid 1px black;
    border-radius: 5px;
    transition: text-color 1s, background-color 1s;
}

.competitionPreviewLikes2 {
    display: none;

    position: absolute;
    bottom: 5px;
    right: 20px;
    font-family: Montserrat-Medium;
    font-size:13px;
}

.competitionPreviewImage2 {
    position: absolute;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    background-size: contain;
}

.competitionPreview{
    width:calc(100%/5 - 40px)!important;
}

.userPreview {
    margin-top: 20px;
    width: 300px;
    height: 80px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 25px;
    border-radius: 10px;
    padding-top: 5px;
    padding-left: 5px;
    cursor: pointer;
    border: solid transparent 1px;
}
.userPreview:hover{
    border: solid var(--main-text-color) 1px;
}
.userPreview .username {
    float:left;
    
    font-size: 23px;
    margin-left:10px;
    cursor:pointer;
}
.userPreview .adminImg{
    float:left;
    
    margin-top:12px;
    margin-left:5px;
    height:15px;
    width: 15px;
    background-image: url(../../assets/images/logo.ico);
    background-size: cover;
}
.userPreview .realName {
    float:left;
    width: calc(100% - 70px);
    margin-left:10px;
    font-size: 16px;
    cursor:pointer;
}

.userPreview img{
    float:left;
    width:60px;
    height:60px;
    border-radius: 30px;
}

@media only screen and (max-width: 1600px) {
    .exploreCategories {
        width: calc(100% - 80px);
        left: 40px;
        margin-bottom: 50px;
    }
    .competitionPreview2 {
        width: calc(100%/4 - 20px);
    }
    .exploreCompetitionsArea {
        width: calc(100% - 80px);
        margin-left: 40px;
    }

    
    .competitionPreviewAreaTop {
        width: 100%;
    }

    .exploreCommunitiesArea {
        top:0px;
        position: relative;
        width: 400px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    .exploreUsersArea {
        top:0px;
        position: relative;
        width: 400px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    .competitionPreview{
        width:calc(100%/4 - 20px)!important;
    }
}

@media only screen and (max-width: 1250px) {

    .exploreCategories {
        margin-bottom: 50px;
    }
    .exploreCompetitionsArea {
        margin-bottom: 50px;
    }

    .competitionPreview{
        width:calc(100%/3 - 20px)!important;
    }
    
    .competitionPreview2 {
        width: calc(100%/3 - 20px);
        margin-right: 20px;
    }
}

@media only screen and (max-width: 950px) {
    
    .competitionPreview2 {
        width: calc(100%/2 - 20px);
        margin-right: 20px;
    }
    .competitionPreview{
        width:calc(100%/2 - 20px)!important;
    }
}

@media only screen and (max-width: 750px) {
    .exploreCategories {
        padding-bottom:100px;
    }
    .exploreCompetitionsArea {
        margin-top:280px;
    }
}


@media only screen and (max-width: 550px) {
    .exploreCategories {
        padding-bottom: 150px;
    }
    .exploreCompetitionsArea {
        margin-top: 320px;
    }

    .competitionPreview2 {
        width: 100%;
        margin-right: 20px;
    }
    .competitionPreview{
        width:100%!important;
    }
}
</style>

<script>
import { defineComponent } from 'vue'
import router from '../../router';

export default defineComponent({
    setup() {
    },
    data(){
        return{
            trendingComps: new Array(8),
            ongoing:new Array(8),
            category:"all",
            users: new Array(5),
            newest: new Array(8)
        }
    },
    methods:{
        getTrendingCompetitions() {
            let that = this;
            fetch(common.serverAddress + "/explore/trendingComptitions/"+this.category).then((Response) => {
                return Response.json()
            }).then((data) => {
                console.log(JSON.parse(data));
                that.trendingComps = JSON.parse(data);
                //document.getElementById("competitionPreviewArea").innerHTML = ""; //remove existing
                //document.getElementById("searchedItemNumber").innerHTML = Object.keys(competitions).length;

                // competitions.forEach(function (i) {
                //     createCompetitionElement(i, "competitionPreviewArea-Trending",true,"2");
                // })
            })
        },
        getNewestCompetitions() {
            let that = this;
            fetch(common.serverAddress + "/explore/newestComptitions/"+this.category).then((Response) => {
                return Response.json()
            }).then((data) => {
                console.log(JSON.parse(data));
                
                that.newest = JSON.parse(data);
            })
        },
        redirectToComp(url) {
            router.push("/activity/" + url);
        },
        redirectToUser(name){
            router.push("/profile/" + name);
        },

        getNewestUsers() {
            let that = this;
            fetch(common.serverAddress + "/explore/newUsers").then((Response) => {
                return Response.json()
            }).then((data) => {
                let users = [];
                users = JSON.parse(data);
                that.users = users;
            })

        },

    },
    
    
    mounted(){
        this.$emit('setIdx', 0);
        this.getTrendingCompetitions();
        this.getNewestUsers();
        this.getNewestCompetitions();
    }
})
</script>
