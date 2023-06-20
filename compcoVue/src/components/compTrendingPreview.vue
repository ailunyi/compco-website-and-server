<script setup>
    import common from "../assets/common"
</script>

<template>
    <div id="competitionPreviewArea-Trending" class="competitionPreviewAreaTop">
        <div  @mouseover="showDetails(index)" @mouseleave="hideDetails()" v-for="(comp, index) in trendingComps" :key="comp" class="competitionPreview2" :class="{'skeleton':comp==null}" @click="redirectToComp(comp.url)">
            <img v-if="comp!=null" :class="{'darkenBackground':showingDetails==index}" class="competitionPreviewImage2" :src="comp.preview.substring(0, 6) == 'static'?common.serverAddress + '/' + comp.preview:comp.preview" :alt="comp.name">
            <div class="bottomInfo" :class="{'infoMoveup':showingDetails==index}" >
                <div v-if="comp!=null" class="competitionPreviewName2">{{ index+1 }}.</div>
                <div v-if="comp!=null" class="competitionPreviewViews2">{{ comp.views }} 👁</div>
                <div v-if="comp!=null" :class="{'detailsMoveup':showingDetails==index}" class="detailsArea">
                    <h1>{{ comp.name}}</h1>
                    <h2>{{comp.description.substring(0,100) + (comp.description.length>100?"...":"")}}</h2>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
h1{
    font-size: 17px;
    display: block;
}
h2{
    font-size: 14px;
    opacity: 80%;
}
.competitionPreview2 {
    position: relative;
    margin-top: 30px;
    float: left;
    background-color: white;
    /* height: 200px; */
    /* width: 230px; */
    width: calc(100%/4 - 20px);
    aspect-ratio: 3/2;
    margin-right: 20px;
    cursor: pointer;
    box-shadow: 0px 2px 4px 0.01em rgba(0,0,0,0.5);
    border-radius: 10px;

}

.detailsArea{
    width:90%;
    margin-left: 5%;
    border-radius: 5px;
    float:left;
    z-index: 1;
    margin-top: 10px;
    margin-bottom: auto;
    padding:5px;
    font-family: Montserrat-Medium;
    background-color: var(--main-bg-color);
    box-shadow: 0px 0px 1em 0.01em rgba(0,0,0,0.5);
    opacity: 0%;
    
    word-wrap: break-word;
}
.darkenBackground{
    opacity: 50%;
}
.infoMoveup{
    transform: translateY(calc(100% - 100px)) !important;
    
    pointer-events:auto!important;
}
.detailsMoveup{
    opacity: 100%!important;
    transition: 200ms;
}

.bottomInfo{
    position: absolute;
    bottom:5px;
    width:100%;
    z-index: 1;
    transition: 300ms;
    transform: translateY(calc(100% - 35px));
    
    pointer-events: none;   
}
.competitionPreviewName2 {
    
    float:left;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 18px;
    margin-left:10px;
    height: 31px;
    
    background-color: var(--main-text-color);
    color:var(--main-bg-color);

    padding-left: 10px;
    padding-right: 10px;

    border:solid 1px black;
    border-radius: 12px;
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
    float:left;
    margin-left: 10px;
    height:31px;
    font-family: Montserrat-Medium;
    font-size: 13px;
    
    background-color: var(--main-bg-color);
    color:var(--main-text-color);
    
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    
    border:solid 1px black;
    border-radius: 12px;
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
        width:calc(100vw/4 - 20px - 20px)!important;
    }
    
    .compPreviewSlider{
        margin-left: -30px;
        width:calc(100vw - 30px);
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
        width:calc(100vw/3 - 20px - 20px)!important;
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
        width:calc(100vw/2 - 20px - 20px)!important;
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
import router from '../router';
export default defineComponent({
    props:["trendingComps"],
    created() {
       
    },
    data(){
        return{
            showingDetails:-1
        }
    },
    methods:{
        redirectToComp(url) {
            router.push("/activity/" + url);
        },
        showDetails(index){
            this.showingDetails=index;
        },
        hideDetails(){
            this.showingDetails=-1;
        }
    }
})
</script>
