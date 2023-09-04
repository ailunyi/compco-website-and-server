<script setup>

    import footerVue from '../components/footerVue.vue'
    import popup from '../components/popup.vue';
</script>

<template>
    <main>
        <div class="sideBar">
            <button @click="exploreFeed()" :class="{selectedButton:clickedItem == 'explore'}">Explore</button>
            <button @click="exploreJoined()" :class="{selectedButton:clickedItem == 'joined'}">Joined</button>
            <button @click="clubshowcase()" :class="{selectedButton:clickedItem == 'clubshowcase'}">Club Showcase</button>
            <hr />
            <div>Communities</div>
            <button @click="exploreCommuity('Anime Waifu')" :class="{selectedButton:clickedItem == 'community/Anime Waifu'}"># Anime Waifu</button>
            <button @click="exploreCommuity('Programming')" :class="{selectedButton:clickedItem == 'community/Programming'}"># Programming</button>
            <button @click="exploreCommuity('SHSID')" :class="{selectedButton:clickedItem == 'community/SHSID'}"># SHSID</button>
            <button @click="exploreCommuity('anime waifu')" :class="{selectedButton:clickedItem == 'community/Tennis'}"># Tennis</button>
            <button @click="exploreCommuity('anime waifu')" :class="{selectedButton:clickedItem == 'community/Cooking'}"># Cooking</button>
            <hr />
            <div>Clubs</div>
            <button>CompCo</button>
            <button>Bakeneko Studios</button>
            <button class="createClubButton" @click="popupStatus('open')">Create</button>
            <div style="height:100px"></div> <!-- empty area for spacing-->
        </div>
        <popup v-if="popupOpen" @popupStatus="popupStatus"></popup>

        <router-view :key="$route.fullPath" @page="onEnterPage"></router-view>
    </main>
</template>

<style scoped>
main{
    width:100vw;
    height:100vh;
}

.sideBar {
    padding: 20px;
    margin-top: 60px;
    width: 260px;
    height: calc(100vh - 60px);
    position: fixed;
    background-color: var(--main-bg-color);
    font-size: 20px;
    font-family: Montserrat-semibold;
    overflow-y: scroll;
    transition: background-color 1s,box-shadow 1s;
    /*box-shadow: 0 1px 3px -2px grey;*/
    box-shadow: 0px 0px 2px 0px var(--main-text-color);
}
hr{
    margin-top: 10px;
    
    margin-bottom: 10px;
}
.createClubButton{
    color:var(--main-bg-color)!important;
    background-color:var(--main-panel-color)!important;
    text-align: center!important;
    padding:0!important;
    font-size: 18px!important;
    height:35px!important;
}

.createClubButton:hover{
    background-color:var(--main-text-color)!important;
}
.selectedButton{
    background-color:var(--main-panel-color)!important;
    
}
.navigation{
    box-shadow: 0 1px 3px -2px var(--main-text-color)!important;
    transition: box-shadow 1s,background-color 1s;
    background-color: var(--main-bg-color)!important;
}

.sideBar div {
    font-size: 20px;
}

.sideBar button {
    text-align:left;
    margin-top:3px;
    font-size: 20px;
    height:40px;
    border-radius:10px;
    cursor:pointer;
    width:100%;
    background:none;
    color:var(--main-text-color);
    border:none;
    padding-left: 10px;
    transition:  color 1s;
    font-family: Montserrat-SemiBold;
}
.sideBar button:hover {
    background-color:var(--main-panel-color);
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
            clickedItem:"explore",
            popupOpen:false
        }
    },
    methods:{
        exploreCommuity(name){
            router.push("/communities/explore/" + name);
            this.clickedItem = "community/"+name;
            
        },
        onEnterPage(value){
            this.clickedItem = value;
        },
        exploreFeed(){
            router.push("/communities");
            this.clickedItem = "explore";
        },
        clubshowcase(){
            router.push("/communities/clubshowcase");
            this.clickedItem = "clubshowcase";
        },
        exploreJoined(){
            router.push("/communities/joined");
            this.clickedItem = "joined";
        },
        popupStatus(status){
            if (status == "close")
                this.popupOpen = false;
            else
                this.popupOpen = true;
        }
    }
})
</script>
