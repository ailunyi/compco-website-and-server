<script setup>

import compPreview from '../../components/compPreview.vue'
import common from "../../assets/common"
import compTrendingPreview from '../../components/compTrendingPreview.vue';
import compPreviewArea from "../../components/compPreviewArea.vue";
</script>

<template>
    <main>
        <div class="exploreCompetitionsArea">
         
            <div class="title">Trending</div>
            <compTrendingPreview :trendingComps="trendingComps"></compTrendingPreview>

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
            <compPreviewArea :comps="newest"></compPreviewArea>
            
            
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
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import router from '../../router';
import compPreviewAreaVue from '../../components/compPreviewArea.vue';

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
