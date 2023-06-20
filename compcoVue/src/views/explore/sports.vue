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
        
            <div v-for="(cat, index) in subCategories" :key="cat">
                <div class="title">Trending {{ cat }} <a>see more</a></div>
                <div v-if="subCategoryInfo[index] == null" class="competitionPreviewArea">
                    <compPreview v-for="comp in empty" :key="comp" class="skeleton"></compPreview>
                </div>
                <compPreviewArea v-else :comps="subCategoryInfo[index]"></compPreviewArea>
            
            </div>

        </div>
        <footerVue/>
    </main>
</template>



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
            category:"Sports",
            subCategoryInfo:[],
            subCategories:["Tennis","Basketball","Volleyball","Hockey","Badminton","Table Tennis","Soccer","Other"]
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
        
        for (let i=0; i<this.subCategories.length;i++)
            this.subCategoryInfo.push(new Array(8));

        this.$emit('setIdx', 2);
        this.getTrendingCompetitions();
        this.getTrendingSubcategory();
    }
})
</script>
