<script setup>

    import footerVue from '../components/footerVue.vue'
</script>

<template>
    <main>
        <div class="exploreCategories">
            <h1>Explore</h1>
            <div class="routes">

                <router-link to="/explore" :class="{ exploreCategoriesSelected: exploreIndex == 0 }" >All</router-link>
                <router-link to="/explore/subject" :class="{ exploreCategoriesSelected: exploreIndex == 1 }">Subjects</router-link>
                <router-link to="/explore/sports" :class="{ exploreCategoriesSelected: exploreIndex == 2 }">Sports</router-link>
                <router-link to="/explore/hobbies" :class="{ exploreCategoriesSelected: exploreIndex == 3 }">Hobbies</router-link>
                <router-link to="/explore/other" :class="{ exploreCategoriesSelected: exploreIndex == 4 }">Other</router-link>
                <label> | </label>
                <a>Users</a>
                <a>Communities</a>
            </div>

        </div>
        <router-view @setIdx="setIdx"></router-view>
        <footerVue/>
    </main>
</template>

<style scoped>

.exploreCompetitionsArea {
    margin-left: 100px;
    margin-top: 200px;
    margin-bottom: 50px;
    padding-top:30px;
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

.sortOptions div {
    margin-left:15px;
    float:left;
    font-size:20px;
    cursor:pointer;
}

.sortOptions div:hover{
    color:var(--main-button-color);
}
.sortOptionsSelected {
    color: var(--main-button-color);
}
.routes{
    display: flex;
    flex-wrap: wrap;
    
    border-bottom: 1px solid var(--main-text-color);
}
.exploreCategories {
    position: absolute;
    height: 145px;
    width: calc(100vw - 200px);
    left: 100px;
    transition: border-bottom 1s;
    font-family: Montserrat-Bold;
    top: 60px;
    padding-bottom: 30px;
    z-index: 1;

}
.exploreCategories h1{
    margin-top:10px;
    font-size: 50px;
}
.exploreCategories a {
    float: left;
    cursor: pointer;
    margin-right: 20px;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: var(--main-panel-color);
    text-decoration: none;
    color: var(--main-text-color);
}
.exploreCategories label {
    float: left;
    margin-right: 20px;
    height: 28px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    color: var(--main-text-color);
}

.exploreCategories a:hover {
    transition: none !important;
    background-color: var(--main-text-color) !important;
    color: var(--main-bg-color) !important;
}


.exploreCategoriesSelected {
    background-color: var(--main-text-color) !important;
    color: var(--main-bg-color) !important;
    transition: background-color 1s, color 1s;
}

@media only screen and (max-width: 1600px) {
    .exploreCategories {
        width: calc(100% - 80px);
        left: 40px;
    }
    

}

main{
    width:100vw;
}

main::v-deep .exploreCompetitionsArea {
    margin-left: 100px;
    margin-top: 200px;
    margin-bottom: 50px;
    padding-top:30px;
    width:calc(100% - 100px);
}
main::v-deep .exploreCommunitiesArea {
    display: none;
    
    position: absolute;
    width: 400px;
    right: 0px;
    top: 230px;
    margin-bottom: 50px;
}

main::v-deep .exploreUsersArea {
  
    position: absolute;
    width: 400px;
    right: 0px;
    top: 30px;
    /* margin-top: 765px; */
    margin-bottom: 50px;
}


main::v-deep .title {
    font-size: 25px;
    font-family: Montserrat-Bold;
}
main::v-deep .title a{
    margin-left:5px;
    font-size: 20px;
    color:var(--main-panel-color);
    text-decoration: none;
    cursor:pointer;
}
main::v-deep .title a:hover {
    color: var(--main-button-color);
    transition: none !important;

}
main::v-deep .categoryTitle{
    float:left;
    width:120px;
}

/*competition preview area*/

main::v-deep .competitionPreviewAreaTop {
    width: calc(100vw - 530px);
    margin-bottom: 50px;
    min-height: 500px;
}

main::v-deep .competitionPreviewArea {
    height: 350px;
    margin-bottom: 50px;
    overflow: hidden;
}
main::v-deep .exploreCompetitionsArea {
    float: left;
    padding-bottom: 20px;
    min-height: 1000px;
}


main::v-deep .competitionPreview{
    width:calc(100vw/5 - 20px - 40px)!important;
    display: inline-block;
}
main::v-deep .userPreview {
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
main::v-deep .userPreview:hover{
    border: solid var(--main-text-color) 1px;
}
main::v-deep .userPreview .username {
    float:left;
    
    font-size: 23px;
    margin-left:10px;
    cursor:pointer;
}
main::v-deep .userPreview .adminImg{
    float:left;
    
    margin-top:12px;
    margin-left:5px;
    height:15px;
    width: 15px;
    background-image: url(../../assets/images/logo.ico);
    background-size: cover;
}
main::v-deep .userPreview .realName {
    float:left;
    width: calc(100% - 70px);
    margin-left:10px;
    font-size: 16px;
    cursor:pointer;
}

main::v-deep .userPreview img{
    float:left;
    width:60px;
    height:60px;
    border-radius: 30px;
}

@media only screen and (max-width: 1600px) {
   
    main::v-deep .competitionPreview2 {
        width: calc(100%/4 - 20px);
    }
    main::v-deep .exploreCompetitionsArea {
        width: calc(100% - 80px);
        margin-left: 40px;
    }

    
    main::v-deep .competitionPreviewAreaTop {
        width: 100%;
    }

    main::v-deep .exploreCommunitiesArea {
        top:0px;
        position: relative;
        width: 400px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    main::v-deep .exploreUsersArea {
        top:0px;
        position: relative;
        width: 400px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    main::v-deep .competitionPreview{
        width:calc(100vw/4 - 20px - 20px)!important;
    }
    
    main::v-deep .compPreviewSlider{
        margin-left: -30px;
        width:calc(100vw - 30px);
    }
}

@media only screen and (max-width: 1250px) {

    main::v-deep  .exploreCompetitionsArea {
        margin-bottom: 50px;
    }

    main::v-deep .competitionPreview{
        width:calc(100vw/3 - 20px - 20px)!important;
    }
    
    main::v-deep .competitionPreview2 {
        width: calc(100%/3 - 20px);
        margin-right: 20px;
    }
}

@media only screen and (max-width: 950px) {
    
    main::v-deep  .competitionPreview2 {
        width: calc(100%/2 - 20px);
        margin-right: 20px;
    }
    main::v-deep  .competitionPreview{
        width:calc(100vw/2 - 20px - 20px)!important;
    }
}

@media only screen and (max-width: 750px) {
 
    main::v-deep  .exploreCompetitionsArea {
        margin-top:280px;
    }
}


@media only screen and (max-width: 550px) {

    main::v-deep .exploreCompetitionsArea {
        margin-top: 320px;
    }

    main::v-deep  .competitionPreview2 {
        width: 100%;
        margin-right: 20px;
    }
    main::v-deep  .competitionPreview{
        width:100%!important;
    }
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    
    data(){
        return {
            exploreIndex:0
        }
    },
    methods:{
        setIdx(index){
            this.exploreIndex = index;
        }
    },
    mounted(){
        console.log(this.exploreIndex);
    },
})
</script>
