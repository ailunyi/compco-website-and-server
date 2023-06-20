<script setup>

    import footerVue from '../components/footerVue.vue'
    
    import common from "../assets/common"
</script>

<template>
  <main >
    <div id="nav-placeholder" style="background-color:transparent!important; box-shadow:none"></div>
    
    <div id="banner" class="banner">
        <div :style="{'background-image':'url(/covers/' + covers[prevBanner]}" id="bannerimg" class="bannerImage fadeAnimation"></div>
        <div id="toggleButtonArea" class="toggleButtonArea">
            <button v-for="(cover, index) in covers" :key="cover" @click="toggleBanner(index)" :style="{backgroundColor: (index == prevBanner?'white':'rgba(0,0,0,0.6)') }" ></button>
        </div>
    </div>
    <div class="competitionSearchArea">
        <div class="sloganArea">
            <h1 v-if="common.language == 'en' "  >CompCo, a Compassionate Community of students working to impact the world.</h1>
            <h1 v-if="common.language == 'cn'"  >CompCo, 您的个性化活动和社区查找器</h1>
        </div>
        <form class="competitionSearchForm" action="/search/">

            <input id="competitionSearchBar" type="search" name="q" placeholder="Competition/Activity/Community Search..." />
            <button type="submit"><font-awesome-icon icon="search" style="color:black"></font-awesome-icon></button>
        </form>
        <div class="competitionSearchPopular">
            <text v-if="common.language == 'en' ">Trending Searches:</text>
            <text  v-if="common.$language == 'cn'">热门搜索：</text>
            <a href="/search/?q=olympiad">olympiad</a>
            <a href="/search/?q=USACO">USACO</a>
            <a href="/search/?q=physics">Physics</a>
        </div>
    </div>
    <div class="mainContent">
        <div class="currentlyTrendingArea">
            <div style="width:100%">
                <h2>Currently Trending Activities</h2>
                <router-link class="seeAll" to="/explore">SEE ALL</router-link>
            </div>
            <div class="trendingActivities">
                <div class="trendinActivitiesItemParent" v-for="(comp,index) in trendingComps" :key="comp">

                    <div class="trendingActivitiesItem skeleton" v-if="comp==null" ></div>
                    <div v-else>
                        <img class="trendingActivitiesItem" :title="comp.name" @click="redirectToComp(comp.url)" :src="comp.preview.substring(0, 6) == 'static'?common.serverAddress + '/' + comp.preview:comp.preview" :alt="comp.name"/>
                        <div class="itemTitle">
                            {{index + 1}}. {{ comp.name }}
                        </div>
                        <div class="viewCount"> 
                            <svg  width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path style="fill:var(--main-text-color);transition:fill 1s" d="M18.8216 14.6372C18.5352 10.9087 16.7993 8.57221 15.2678 6.5104C13.8498 4.60161 12.625 2.95327 12.625 0.521725C12.625 0.326413 12.5156 0.147897 12.3422 0.0583953C12.1682 -0.0316437 11.9592 -0.0168976 11.801 0.0980438C9.50103 1.74384 7.58198 4.51772 6.91162 7.1644C6.44624 9.00703 6.38467 11.0785 6.37603 12.4466C4.252 11.993 3.77085 8.81582 3.76577 8.7812C3.74185 8.6164 3.64116 8.47299 3.49468 8.39468C3.34668 8.31738 3.17271 8.31176 3.02266 8.38603C2.91128 8.43994 0.288769 9.77246 0.136181 15.0928C0.125488 15.2698 0.125 15.4474 0.125 15.6249C0.125 20.7936 4.33081 24.9992 9.5 24.9992C9.50713 24.9997 9.51475 25.0007 9.52085 24.9992C9.5229 24.9992 9.5249 24.9992 9.52744 24.9992C14.6839 24.9844 18.875 20.7845 18.875 15.6249C18.875 15.3649 18.8216 14.6372 18.8216 14.6372ZM9.5 23.9576C7.77676 23.9576 6.375 22.4644 6.375 20.6289C6.375 20.5664 6.37451 20.5033 6.37905 20.426C6.3999 19.6519 6.54692 19.1235 6.70815 18.772C7.0103 19.421 7.55044 20.0176 8.42783 20.0176C8.71572 20.0176 8.94868 19.7846 8.94868 19.4968C8.94868 18.7553 8.96396 17.8998 9.14858 17.1277C9.31289 16.4432 9.70552 15.7148 10.203 15.131C10.4242 15.8888 10.8556 16.5021 11.2767 17.1008C11.8794 17.9572 12.5025 18.8427 12.6119 20.3527C12.6185 20.4422 12.6251 20.5323 12.6251 20.6289C12.625 22.4644 11.2232 23.9576 9.5 23.9576Z" fill="white"/>
                            </svg>
                            <label>{{ comp.views }} Views</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="quote">Building an interschool community and providing resources for all students to excel in every aspect of life. <br> —— Compco's Mission</h3>
        <div class="seperators">
            <svg width="132" height="9" viewBox="0 0 132 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H131.131V8.19566H0V0Z" fill="#444444"/>
            </svg>
            <svg width="132" height="9" viewBox="0 0 132 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H131.131V8.19566H0V0Z" fill="#444444"/>
            </svg>
            <svg width="132" height="9" viewBox="0 0 132 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H131.131V8.19566H0V0Z" fill="#444444"/>
            </svg>
        </div>
        

    </div>
    <div class="blueBackground">
        <div class="mainContent aboutCompco">
            <h2>About Compco</h2>
            <h3 style="position: absolute;right:0px; font-family: 'Courier New', Courier, monospace;">For Students, By Students</h3>

            <h4>
                A platform for all students to find activities and interact with<br> students from other schools!
                <br>
                <br>
                Find all sorts of Activities Subjects/Sports/Club events/<br>Competitions/ Summer programs/Internships
                <br>
                <br>
                Club Showcase/Interesting color themes/GPA & Love<br> calculator Games 
                <br>
                <br>
                <router-link to="register" style="text-decoration: none;color:var(--main-nav-color)">sign up</router-link> to join a community of 1000+ students!
            </h4>
            <img class="dots" src="/src/assets/images/home/dots.png" alt="dots">
            <img class="fish" src="/src/assets/images/home/mascot.png" alt="compcoLogo">
            <div class="screenshots">
                <img class="screenshot1" src="/src/assets/images/home/screenshot1.png" alt="compcoScreenshot1">
                <img class="screenshot2" src="/src/assets/images/home/screenshot2.png" alt="compcoScreenshot2">
            </div>
        </div>
        
    </div>

    <div class="paths mainContent">
        <div style="width:500px">
            <svg style="position:absolute; left:75px; top:270px" width="340" height="375" viewBox="0 0 440 375" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M239.819 345.032C239.819 360.222 226.701 369.658 220.487 374.721C214.503 369.428 199.774 362.293 199.774 345.032C199.774 333.645 204.089 197.278 190.798 174.494C177.507 151.709 157.657 122.842 123.135 104.76C50.6389 66.7854 17.7279 27.6605 0.236816 0.503174L439.356 0.503174C387.573 66.7854 372.384 77.1419 315.768 104.76C287.981 118.314 263.985 146.186 247.414 177.256C230.844 208.325 239.819 330.517 239.819 345.032Z" fill="#3C3C3C"/>
            </svg>
            <svg style="position:absolute; left:0px" width="492" height="392" viewBox="0 0 492 492" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="245.796" cy="245.796" r="245.796" fill="#2B2A2A"/>
            </svg>
            <img style="position:absolute; top:80px; left: 140px; width:250px" src="/src/assets/images/home/iceberg.png" alt="iceberg">
        </div>
        <div style="flex-grow: 1; padding-top: 200px;">
            <h2>Find Your Own Path!</h2>
            <h3>Social Studies/Math/Science/Electives</h3>
        </div>
    </div>
    

    <footerVue/>
  </main>
</template>

<style scoped>

/*HOMEPAGE STUFF*/

main{
    
    overflow: none;
}

.blueBackground{
    background: linear-gradient(180.96deg, #284A9F 0.82%, #422F9C 129.1%);
    backdrop-filter: blur(7px);
    height: 1300px;
    color:white!important;
}

.paths{
    margin-top: 200px;
    height: 650px;
    display: flex;

}

.paths h2{
    font-size: 40px;
    text-align: center;
}
.paths h3{
    text-align: center;
}
.quote{

    font-family: montserrat-medium;
    font-size: 25px;
    line-height: 187.5%;
    padding-left:10%;
    padding-right:10%;
    margin-top: 50px;
    /* or 66px */

    text-align: center;


}

.seperators{
    margin-top: 50px;
    display: flex;
    justify-content: center;
    gap: 50px;
}
.dots{
    position: absolute;
    right:30px;
    top:100px;
}
.fish{
    position: absolute;
    right:150px;
    top:220px;
}

.viewCount{
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap:20px;
    font-family: montserrat-semiBold;
}

.itemTitle{
    margin-top: 10px;
    font-family: montserrat-Bold;
    font-size: 20px;
    text-align: center;
}



.screenshot1{
    position: absolute;
    width: 697px;
    height: 366px;
    margin-top: 150px;
}
.screenshot2{
    position: absolute;
    width: 697px;
    height: 366px;
    margin-top: 400px;
    left:600px;
}


.aboutCompco{
    margin-top: 50px;
}

.trendingActivities{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap:30px;
    width:100%;
}

.trendingActivitiesItem{
    height:300px;
    border-radius: 10px;
    cursor: pointer;
    width:100%;
    border:solid rgba(0,0,0,0.3) 1px;
}

.trendinActivitiesItemParent{
    width:calc(100%/4);
}



.aboutCompco h4{
    width: calc(100% - 500px);
    margin-top: 50px;
    font-size: 19px;
    
}
.competitionSearchArea {
    position: absolute;
    top: 90px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    min-height: 180px;
    padding-bottom: 20px;
    width: 1050px;
    left: calc((100vw - 1000px)/2);
    background-color: var(--main-bg-color);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    transition: background-color 1s;
    
}

h2{
    font-family: Montserrat-Bold;
    font-size: 26px;
}
.currentlyTrendingArea{
    display: flex;
    flex-direction: column;
}

.mainContent{
    /* color:white; */
}

.seeAll{
    position: absolute;
    right:0px;

    height:50px;
    width:130px;
    background:var(--main-panel-color);
    border-radius: 10px;

    color:var(--main-text-color);
    font-size:17px;
    text-align: center;
    padding-top: 13px;
    margin-top: -40px;

    text-decoration: none;
}

.sloganArea{
    margin-top:30px;
    font-family: Montserrat-Bold;
    font-size:28px;
    text-align:center;
    line-height: 40px;
    padding-left:4px;
    padding-right: 4px;
}

h1{
    font-size:29px;
}


.exploreDropdown {
    position: fixed;
    width: 100%;
    height: 300px;
    background-color: #3175fa;
    top: 70px;
}
.featuredHomepage {
    margin-top: 20px;
    width: 100%;
    aspect-ratio:3/1;
    background-color:var(--main-panel-color);
    border-radius: 30px;
    
    background-image:url(../assets/images/covers/cool.GIF);
    background-size:cover;
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

.toggleButtonArea{
    position: absolute;
    bottom:20px;
    width:100vw;
    display: flex;
    gap:20px;
    justify-content: center;
}
.toggleButtonArea button {
    background-color: rgba(0,0,0,0.5);
    padding: 8px;
    width:50px;
    height:10px;
    border-radius: 30px;
    border: solid 1px rgba(255,255,255,0.2);
    cursor: pointer;
}


.recommendedCompetitions {
    font-size:25px;
    font-family: Montserrat-SemiBold;
    width: calc(100% - 200px);
    margin-left:100px;
    margin-top: 50px;
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
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: #BCBCBC;
    border-left: black solid 1px;
    border:solid black 1px;
}

.homepageButtons a {
    margin-top:20px;
    background-color: var(--main-panel-color);
    float: left;
    margin-left: 20px;
    width: calc((100% - 40px)/3);
    text-align: center;
    font-size:20px;
    padding-top: 30px;
    padding-bottom: 30px;

    border-radius: 10px;
    text-decoration: none;
    color: var(--main-text-color);
    transition: background-color 300ms, color 1s;
}

.homepageButtons a:hover{
    background-color:var(--secondary-panel-color);
}



.bannerImage {
    position: absolute;
    height: 100%;
    width: 100%;
    filter: brightness(70%);
    background-repeat: no-repeat;
    background-position: bottom;
    background-attachment: fixed;
    background-size: cover;
    border: 0;
    transition: 1s;
    border-bottom: solid var(--main-text-color) 1px;
    /*cursor: pointer;*/
    /*background-color: #4B4B4B;*/
}
.blur {
    filter: blur(10px) brightness(60%);
    -webkit-filter: blur(10px) brightness(60%);
    transition: all 1s;
}
.noBlur {
    transition: all 1s;
}
.banner {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
    background-color:black;
    transition:height 1s;
}

@media only screen and (max-width: 1500px) {
    
    .trendingActivitiesItem{
        height: 200px;
    }
    
    .screenshot1{
        position: absolute;
        width: 600px;
        height: 320px;
        margin-top: 200px;
    }
    .screenshot2{
        position: absolute;
        width: 600px;
        height: 320px;
        margin-top: 400px;
        left:400px;
    }

    .fish{
        height: 350px;
        right:100px;
        top:200px;
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
.banner {
    height: 500px;
}
.recommendedCompetitions {
    width: calc(100% - 100px);
    margin-left:50px;
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
.banner {
    height: 500px;
}
.recommendedCompetitions {
    width: calc(100% - 100px);
    margin-left:50px;
}

.competitionSearchForm input {
    width: 650px;
}

.competitionSearchForm button {
    margin-left: 650px;
}

}
@media only screen and (max-width: 900px) {

    
.trendingActivities{
    flex-direction: column;
    align-items: center;
}

.trendingActivitiesItem{
    width:100%;
}
.trendinActivitiesItemParent{
    width:300px;
}
.seeAll{
    margin-top: 0px;
}



.featuredHomepage{
    aspect-ratio:2/1;
}
.homepageButtons a {
    width: 100%;
    margin-left: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
}

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
.recommendedCompetitions {
    width: 90%;
    margin-left: 5%;
    margin-top: 50px;
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
import { defineComponent } from 'vue'
import router from '../router';
export default defineComponent({
  setup() {
    showNav
    
  },
  data(){
        return {
            width:0,
            height:0,
                        
            prevBanner: 0,
            covers: ["teamCover.png", "tokyo2.jpg", "china.jpg"],
            coversSmall: ["shanghaiSmall.jpg", "tokyo2Small.jpg", "cherrySmall.jpg", "chinaSmall.jpg", "cool.gif"],
            images: [],
            imagesSmall: [],
            blured: true,
            toggleBannerTimer:null,

            trendingComps:[null,null,null,null]
        }
    },
  mounted(){
    window.addEventListener("scroll", this.scrollChangeBrightness, true);
    window.addEventListener('resize', this.handleResize);
    
    this.$emit('toggleNav', false);
    this.handleResize();
    this.scrollChangeBrightness();
    

    //prelaod images
    for (let i = 0; i < this.covers.length; i++) {
        var img = new Image();
        img.src = "/covers/" + this.covers[i];
        img.index = i;
        this.images.push(img);
    }

    // var img2 = new Image();
    // img2.src = "/covers/" + this.coversSmall[i];
    // this.imagesSmall.push(img2);
    // let that = this;
    // img.onload = function () {
    //     if (that.prevBanner == this.index) {
    //         document.getElementById("bannerimg").style.backgroundImage = "url(/covers/" + that.covers[this.index];
    //         if (that.blured) {
    //             document.getElementById("bannerimg").classList.toggle("blur");
    //             document.getElementById("bannerimg").classList.toggle("noBlur");
    //         }
    //         that.blured = false;
    //     }
    // }

    this.toggleBannerTimer = setTimeout(this.autoToggleBanner, 5000);
    this.getTrendingCompetitions();
  },
  unmounted(){

    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener("scroll", this.scrollChangeBrightness, true)
    
    this.$emit('toggleNav', true); 
  },
  methods:{
    getTrendingCompetitions() {
        let that = this;
        fetch(common.serverAddress + "/explore/trendingComptitions/all").then((Response) => {
            return Response.json();
        }).then((data) => {
            console.log(JSON.parse(data));
            that.trendingComps = JSON.parse(data).slice(0,4);
            
        })
    },
    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    },
    redirectToComp(url) {
        router.push("/activity/" + url);
    },
    scrollChangeBrightness(e) {
                
        let bannerSize;
        if (this.width < 1400)
            bannerSize = 435;
        else
            bannerSize = 540;


        // if (window.top.scrollY > bannerSize + 50) {
        //     this.$emit('toggleNav', true);
        // } else if (window.top.scrollY < bannerSize + 50) {

        // }


        if (window.top.scrollY < bannerSize) {
            this.$emit('toggleNav', false);
        } else if (window.top.scrollY > bannerSize) {
            this.$emit('toggleNav', true);
        }


        let amount = 100 - window.top.scrollY / 7;
        document.getElementById("banner").style.filter = "brightness(" + String(amount) + "%)"
    },
    toggleBanner(num) {
        this.prevBanner = num;
        // if (this.images[num].complete && this.images[num].naturalWidth != 0) {
        //     document.getElementById("bannerimg").style.backgroundImage = "url(src/assets/images/covers/" + this.covers[num];
        //     if (this.blured) {
        //         document.getElementById("bannerimg").classList.toggle("blur");
        //         document.getElementById("bannerimg").classList.toggle("noBlur");
        //     }
        //     this.blured = false;
        // }
        // else {

        //     document.getElementById("bannerimg").style.backgroundImage = "url(src/assets/images/covers/" + this.coversSmall[num];
        //     if (!this.blured) {
        //         document.getElementById("bannerimg").classList.toggle("blur");
        //         document.getElementById("bannerimg").classList.toggle("noBlur");
        //     }
        //     this.blured = true;
        // }
        clearTimeout(this.toggleBannerTimer);
            this.toggleBannerTimer = setTimeout(this.autoToggleBanner, 5000);
        },

        autoToggleBanner() {
            if (this.prevBanner < this.covers.length-1)
                this.toggleBanner(this.prevBanner + 1);
            else
                this.toggleBanner(0);

        },

        // createToggleButtons() {

        //     document.getElementById("bannerimg").style.backgroundImage = "url(src/assets/images/covers/" + this.coversSmall[0];
        //     for (let i = 0; i < this.covers.length; i++) {

        //         //prelaod images
        //         var img = new Image();
        //         img.src = "/images/covers/" + this.covers[i];
        //         img.index = i;
        //         this.images.push(img);


        //         // var img2 = new Image();
        //         // img2.src = "/images/covers/" + this.coversSmall[i];
        //         // this.imagesSmall.push(img2);
        //         // let that = this;
        //         // img.onload = function () {
        //         //     if (that.prevBanner == this.index) {
        //         //         document.getElementById("bannerimg").style.backgroundImage = "url(src/assets/images/covers/" + that.covers[this.index];
        //         //         if (that.blured) {
        //         //             document.getElementById("bannerimg").classList.toggle("blur");
        //         //             document.getElementById("bannerimg").classList.toggle("noBlur");
        //         //         }
        //         //         that.blured = false;
        //         //     }
                    
        //         // };
        //         let that = this;
        //         //create buttons
        //         const element = document.createElement("button");
        //         element.addEventListener('click', function handleClick() {
        //             that.toggleBanner(i);
        //             console.log("clicked " + i);
        //         });
        //         element.id = "bannerimg-" + i;
        //         element.innerHTML = " a";
        //         // element.style.left = "calc(50vw - 150px + " + (300 / (this.covers.length+1) * (i+1)) + "px)";
        //         if (i == 0)
        //             element.style.backgroundColor = "white";
        //         document.getElementById("toggleButtonArea").appendChild(element);
        //     }
        // }


    }
    })
</script>
