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
    box-shadow: 2px 2px 4px 1px grey;
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
    height: 65px;
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
    margin-top:5px;
    cursor:pointer;
}
.userPreview .adminImg{
    float:left;
    
    margin-top:12px;
    margin-left:5px;
    height:15px;
    width: 15px;
    background-image: url(/images/logo.ico);
    background-size: cover;
}
.userPreview .realName {
    float:left;
    width: calc(100% - 70px);
    margin-left:10px;
    margin-top:5px;
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
            category:"Other"
        }
    },
    methods:{
        redirectToComp(url) {
            router.push("/activity/" + url);
        },
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
        getTrendingSubcategory() {
            let that = this;
            for (let i=0; i<this.subCategories.length; i++){
                fetch(common.serverAddress + "/explore/trendingSubcategory/"+this.category+"/sub/"+this.subCategories[i]).then((Response) => {
                    return Response.json()
                }).then((data) => {
                    console.log(JSON.parse(data));
                    data = JSON.parse(data);
                    that.subCategoryInfo[i] = data;
                })
            }
        }

    },
    mounted(){
        this.$emit('setIdx', 4);
        this.getTrendingCompetitions();
    }
})
</script>
