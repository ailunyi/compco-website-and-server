<script setup>

    import common from "../assets/common"
</script>

<template>
    <main class="competitionPreview" @click="redirectToComp()">
        <img v-if="preview!=null" class="competitionPreviewImage" :src="preview.substring(0, 6) == 'static'?common.serverAddress + '/' + preview:preview" :alt="name">
        <div class="competitionPreviewName">{{ name }}</div>
        <div class="competitionPreviewLocation">{{ location }}</div>
        <div class="competitionPreviewViews">{{ views }} 👁</div>
        <div class="competitionPreviewDifficulty" :style="{color:difficultyColor}">{{ difficulty }}</div>
    </main>
</template>

<style scoped>

.competitionPreview {
    margin-top: 30px;
    float: left;
    background-color: white;
    height: 300px;
    width: 300px;
    margin-right: 20px;
    cursor: pointer;
    box-shadow: 1px 1px 3px 1px grey;
    border-radius: 10px;

}
.competitionPreviewViews{
    position: absolute;
    bottom:0px;
    
    font-family: montserrat-bold;
    left:10px;
}

.competitionPreviewDifficulty{
    position: absolute;
    bottom:0px;
    right:10px;
    font-family: montserrat-semibold;
}
.competitionPreview:after {
    content:'\A';
    position:absolute;
    width:100%; height:100%;
    top:0; left:0;
    background:rgba(0,0,0,0.6);
    opacity:0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    border-radius: 10px;
}
.competitionPreview:hover:after {
    /* box-shadow: 2px 2px 4px 2px var(--main-text-color); */
    opacity: 1;
}


.competitionPreviewName {
    float: left;
    margin-left: 10px;
    
    font-family: montserrat-Bold;
    line-height: 20px;
    font-size: 20px;
}

.competitionPreviewLocation {
    float: left;
    margin-left: 10px;
    font-size: 16px;
    line-height: 20px;
    
    font-family: montserrat-medium;
}

.competitionPreviewImage {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 200px;
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
        width:calc(100%/4 - 20px)!important;
    }
}

@media only screen and (max-width: 1200px) {

    .exploreCategories {
        margin-bottom: 50px;
    }
    .exploreCompetitionsArea {
        margin-bottom: 50px;
    }

    .competitionPreview{
        width:calc(100%/3 - 20px)!important;
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
import router from '../router';
export default defineComponent({
    props:["name","location","preview","views","difficulty","url"],
    created() {
        if (this.difficulty == "Beginner")
            this.difficultyColor = '#208143';
        
        if (this.difficulty == "Advanced")
            this.difficultyColor = "#F1223B";

            
        if (this.difficulty == "Intermediate")
            this.difficultyColor = "#203FD6";
    
    },
    data(){
        return{
            difficultyColor: 'black'
        }
    },
    methods:{
        redirectToComp() {
            router.push("/activity/" + this.url);
        },
    }
})
</script>
