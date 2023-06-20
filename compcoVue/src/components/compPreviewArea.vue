<script setup>
    import common from "../assets/common"
    import compPreview from "../components/compPreview.vue"
</script>

<template>
    <div v-if="comps[0] == null" class="competitionPreviewArea">
        <compPreview v-for="comp in comps" :key="comp" class="skeleton"></compPreview>
    </div>
    <v-slide-group  next-icon="mdi-arrow-right-bold-circle" prev-icon="mdi-arrow-left-bold-circle" v-else class="competitionPreviewArea compPreviewSlider" >
        <compPreview v-for="comp in comps" :key="comp" :name="comp.name" :url="comp.url" :preview="comp.preview" :location="comp.location" :views="comp.views" :difficulty="comp.difficulty"></compPreview>
    </v-slide-group>
</template>

<style scoped>
/* 
.compPreviewSlider{
    margin-left: -50px;
    width:calc(100% - 30px);
} */
.competitionPreview{
    float: left  !important;
}

.compPreviewSlider{
    margin-left: -50px;
    width:calc(100% - 30px);
}
.competitionPreviewArea {
    height: 350px;
    margin-bottom: 50px;
    overflow: hidden;
}

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
}

@media only screen and (max-width: 1200px) {

    .exploreCategories {
        margin-bottom: 50px;
    }
    .exploreCompetitionsArea {
        margin-bottom: 50px;
    }

    .competitionPreview{
        width:calc(100vw/3 - 20px - 20px)!important;
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
    props:["comps"],
    created() {
        
    },
    data(){
        return{
        }
    },
    methods:{
        redirectToComp() {
            router.push("/activity/" + this.url);
        },
    }
})
</script>
