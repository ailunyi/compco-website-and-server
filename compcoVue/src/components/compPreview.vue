<script setup>

    import common from "../assets/common"
</script>

<template>
    <main class="competitionPreview" @click="redirectToComp()">
        <img v-if="preview!=null" class="competitionPreviewImage" :src="preview.substring(0, 6) == 'static'?common.serverAddress + '/' + preview:preview" :alt="name">
        <div class="competitionPreviewName">{{ name }}</div>
        <div class="competitionPreviewLocation">{{ location }}</div>
        <!-- <div style="display: flex; width: 100%;">
            <v-chip>Chemistry</v-chip>
            <v-chip>Free</v-chip>
        </div> -->
        <div class="competitionPreviewViews">{{ views==null?0:views }} <font-awesome-icon style="font-size: 10px; bottom:1px" icon="fa-solid fa-eye" /></div>
        <div class="competitionPreviewDifficulty" :style="{color:difficultyColor}">{{ difficulty }}</div>
        
    </main>
</template>

<style scoped>

.competitionPreview {
    margin-top: 30px;
    background-color: var(--main-bg-color);
    height: 300px;
    width: 300px;
    margin-left: 10px;
    cursor: pointer;
    box-shadow: 0px 2px 4px 0.01em rgba(0,0,0,0.5);
    border-radius: 10px;
    background:var(--main-bg-color);
    float:left;
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
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    border-radius: 10px;
}
.competitionPreview:hover:after {
    /* box-shadow: 2px 2px 4px 2px var(--main-text-color); */
    opacity: 1;
}

.competitionPreviewName {
    width:100%;
    float: left;
    padding-left: 10px;
    padding-right: 10px;
    font-family: montserrat-Bold;
    line-height: 20px;
    font-size: 17px;
    
    word-wrap: break-word;
}

.competitionPreviewLocation {
    float: left;
    margin-left: 10px;
    font-size: 14px;
    line-height: 20px;
    
    font-family: montserrat-medium;
}

.competitionPreviewImage {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 200px;
    width: 100%;
    background-size: contain;
    
    box-shadow: 0px 0px 2px 0.01em rgba(0,0,0,0.5);
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
