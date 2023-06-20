<script setup>
    import { onUnmounted, onMounted } from 'vue'
    import common from "../assets/common"
    
    import compPreview from '../components/compPreview.vue'
    import footerVue from '../components/footerVue.vue'
</script>

<template>
    <main>
        <div class="mainContent">
            <div class="competitionSearchArea2">
                <form class="competitionSearchForm" action="/search/">

                    <input id="competitionSearchBar" type="search" name="q" placeholder="Competition Search..." />
                    <button type="submit"><font-awesome-icon icon="search"></font-awesome-icon></button>
                </form>
                <div class="competitionSearchPopular">
                    <text lang="en">Trending Searches:</text>
                    <text hidden lang="zh">热门搜索：</text>
                    <a href="/search/?q=olympiad">olympiad</a>
                    <a href="/search/?q=USACO">USACO</a>
                    <a href="/search/?q=physics">Physics</a>
                </div>
            </div>

            <div class="searchInfoArea">
                <text v-if="common.language == 'en' ">found </text>
                <text v-if="common.language == 'cn' ">找到</text>
                <text id="searchedItemNumber" class="searchInfo">...</text>

                <text v-if="common.language == 'cn' ">个与</text>
                <text v-if="common.language == 'en' "> results for </text>
                <text id="searchedItemName" class="searchInfo">{{searchedCompetition}}</text>
                <text v-if="common.language == 'cn' ">相关的结果</text>
            </div>
            <div v-if="competitions[0] == null" class="competitionPreviewArea">
                <compPreview v-for="comp in competitions" :key="comp" class="skeleton"></compPreview>
            </div>
            <div v-else class="competitionPreviewArea">
                <compPreview v-for="comp in competitions" :key="comp" :name="comp.name" :url="comp.url" :preview="comp.preview" :location="comp.location" :views="comp.views" :difficulty="comp.difficulty"></compPreview>
            </div>
        </div>
    
        
        
        <footerVue></footerVue>
    </main>
</template>

<style scoped>



.competitionSearchArea {
    position: absolute;
    top: 90px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    min-height: 180px;
    padding-bottom: 20px;
    width: 1150px;
    left: calc((100vw - 1000px)/2);
    background-color: var(--main-bg-color);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    transition: background-color 1s;
    
}



.competitionSearchForm input {
    height: 72px;
    margin-top: 25px;
    margin-left: 50px;
    width: 850px;
    font-size: 25px;
    float: left;
    padding-left: 10px;
    border-radius: 3px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border: 1px solid black;
    outline: 0;
    background-color: var(--main-searchbar-color);
    color: var(--searchbar-text-color);
    transition: background-color 1s, color 1s;
}



.competitionSearchForm input:focus {
    border-width: 2px;
    border-color: #3175fa;
}

.competitionSearchPopular{
    float:left;
    margin-top:3px;
    margin-left:50px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.competitionSearchPopular a{
    margin-left:10px;
    float:left;
    cursor:pointer;
    color:var(--main-text-color);
    
    transition: background-color 1s, color 1s;
    text-decoration:none;
}


.competitionSearchPopular a:hover {
    color: #3175fa;
    transition: none!important;
}

.competitionSearchPopular text{
    float:left;
}


.competitionSearchForm button {
    float: left;
    height: 72px;
    margin-top: -72px;
    margin-left: 850px;
    width: 100px;
    font-size: 25px;
    cursor: pointer;
    float: left;
    border-left: 0;
    border-radius: 3px;
    border-width: 1px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: #BCBCBC;
    border-left: black solid 1px;
}



.searchInfoArea{
    margin-top:20px;
    font-family:Arial, Helvetica, sans-serif;
}

.searchInfo{
    color: green;
}
.competitionPreview{
    flex-grow: 1;
    max-width: 400px;
}
.competitionPreviewArea {
    margin-top: 20px;
    margin-bottom: 200px;
    min-height:500px;
    display: flex;
    gap:10px;
    flex-wrap: wrap;
}


.competitionSearchArea2 {
    height: 140px;
    width: 100%;
    margin-left: calc((100% - 1000px)/2);
}


@media only screen and (max-width: 1400px) {
.competitionSearchArea {
    width: 800px;
    left: calc((100vw - 860px)/2);
}

.competitionSearchArea2 {
    width: 800px;
    margin-left: calc((100% - 800px)/2)!important;
}
.competitionSearchForm input {
    width: 650px;
}

.competitionSearchForm button {
    margin-left: 650px;
}

}

@media only screen and (max-width: 1400px) {

.competitionSearchArea {
    width: 800px;
    left: calc((100vw - 860px)/2);
}

.competitionSearchArea2 {
    width: 800px;
    margin-left: calc((100% - 800px)/2)!important;
}
.competitionSearchForm input {
    width: 650px;
}

.competitionSearchForm button {
    margin-left: 650px;
}
}


@media only screen and (max-width: 900px) {

.competitionSearchArea {
    width: 90%;
    left: calc(5% - 5px);
}
.competitionSearchPopular {
    display: none;
}
.competitionSearchArea2 {
    width: calc(100% - 20px) !important;
    margin-left: 10px !important;
}

.competitionSearchForm input {
    width:calc(100% - 20px);
    margin-left:10px;
}

.competitionSearchForm button {
    margin-left: calc(100% - 60px);
    width: 50px;
}
}

</style>

<script>
import { defineComponent } from 'vue';
import router from '../router';

export default defineComponent({
    setup() {
    },
    data(){
        return {
            searchedCompetition:"",
            competitions:Array(10)
        }
    },
    mounted(){
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        this.searchedCompetition = params.q;
        console.log("hi");
        this.findCompetitionsWithName(this.searchedCompetition);
    },
    methods:{
        
        findCompetitionsWithName(name) {
            let that = this;
            fetch(common.serverAddress+"/competitions/search/" + name).then((Response) => {
                return Response.json()
            }).then((data) => {
                console.log(JSON.parse(data));
                that.competitions = JSON.parse(data);

                document.getElementById("searchedItemNumber").innerHTML = Object.keys(that.competitions).length;
                
            })

        },
        redirectToComp(url){
            router.push("/activity/" + url);
        },
    }

    
})
</script>
