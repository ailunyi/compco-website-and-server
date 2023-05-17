<script setup>
import common from "../assets/common.js"

import themes from "../assets/themes.js"
</script>

<template>
    <nav id="navigation" class="navigation" 
    :style="{'background-color': transparentNav ? 'transparent': 'var(--main-nav-color)',
            'box-shadow': transparentNav ? 'none': '0 1px 3px -2px grey'}">
        <router-link to="/">
            <img class="navLogo" alt="Bakeneko" src="../assets/images/logo2.png" />
            <text class="compcoText" :style="{'color': transparentNav ? 'white': 'var(--main-text-color)'}" >omp</text>
            <text class="compcoText" :style="{'color': transparentNav ? 'white': 'var(--main-text-color)', 'top':'13px'}">co</text>
        </router-link>


        <!-- PHONE NAVIGATION -->
        <button  id="mobileNavBars" class="navShowBar">☰</button>
        <div id="mobileNav" hidden class="mobileNav dontHide">

        </div>


        
        <div id="notLoggedIn"  v-if="common.sessionID == -1"> <!-- when not logged in -->
            <!--language toggler-->
            <div @click="toggleLangageToggler()" id="languageToggler" class="languageToggler"><img src="../assets/images/language.png" alt="langauge" /> </div>
            <div v-if="showLanguageToggler" id="languageTogglerDropdown" class="languageTogglerDropdown">
                <a  v-if="common.language == 'en'" style="cursor:default; color:darkred" href="#en">English</a>
                <a @click="changeLanguage('cn')" v-if="common.language == 'en'" href="#cn">中文</a>

                <a @click="changeLanguage('en')" v-if="common.language == 'cn'">English</a>
                <a v-if="common.language == 'cn'" style="cursor:default; color:darkred">中文</a>
            </div>


            <!-- login & signin buttons -->
            <router-link to="/register" v-if="common.language=='en'" class="registerButton"><p>Register</p></router-link>
            <router-link to="/signin" v-if="common.language=='en'" class="signinButton" id="signin" 
            :style="{'color': transparentNav ? 'white': 'var(--secondary-panel-color)'}">Sign in</router-link>

            <router-link to="/register" v-if="common.language=='cn'" class="registerButton"><p>登记</p></router-link>
            <router-link to="/signin" v-if="common.language=='cn'" class="signinButton"
            :style="{'color': transparentNav ? 'white': 'var(--secondary-panel-color)'}">登入</router-link>

        </div>
        <div id="loggedIn"  v-else> <!-- when  logged in -->

            <img @focusout="hideProfileDropdown" tabindex="0" @click="toggleProfile()" id="profileIcon" :src="common.profilePicture"  class="profileIcon dontHide" />
            <div  v-if="showProfile && common.language=='en'"  id="profileDropDown" class="profileDropDown dontHide">
                <img id="profileIcon2" :src="common.profilePicture" class="profileIcon2 dontHide" />
                <label id="profileUsername" class="profileUsername dontHide">{{common.username}}</label>
                <label id="profileName" class="profileName dontHide">{{common.firstName + " " + common.lastName}}</label>

                <hr />
                <router-link  :to="{path:'/profile/'+common.username}">My Profile</router-link>
                <router-link  :to="{path:'/profile/'+common.username}">Settings</router-link>
                <!--<a lang="en" href="/my_activities">My Activities</a>-->
                <a v-if="common.admin" lang="en" @click="goToAdminPanel()">Admin Panel</a>



                <hr />
                <a lang="en" class="dontHide" @click="changeTheme()" id="themeName">Theme: {{themes.themeNames[themes.curTheme]}}</a>
                <a lang="en" @click="changeLanguage('cn')">Language: {{common.language}}</a>

                <hr />
                <a lang="en" href="">Help</a>
                <a lang="en" @click="logout()">Logout</a>

            </div>
            <div  v-if="showProfile && common.language=='cn'"  id="profileDropDown" class="profileDropDown dontHide">
                <img id="profileIcon2" :src="common.profilePicture" class="profileIcon2 dontHide" />
                <label id="profileUsername" class="profileUsername dontHide">{{common.username}}</label>
                <label id="profileName" class="profileName dontHide">{{common.firstName + " " + common.lastName}}</label>

                <hr />
                <router-link  :to="{path:'/profile/'+common.username}">My Profile</router-link>
                <router-link  :to="{path:'/profile/'+common.username}">Settings</router-link>
                <!--<a lang="en" href="/my_activities">My Activities</a>-->
                <a v-if="common.admin" lang="en" @click="goToAdminPanel()">Admin Panel</a>



                <hr />
                <a lang="en" class="dontHide" @click="changeTheme()" id="themeName">Theme: {{themes.themeNames[themes.curTheme]}}</a>
                <a lang="en" @click="changeLanguage('en')">Language: {{common.language}}</a>

                <hr />
                <a lang="en" href="">Help</a>
                <a lang="en" @click="logout()">Logout</a>

            </div>


            <a onclick="toggleIcon(0)" @mouseover="toggleIcon(0)" @mouseleave="toggleIcon(-1)" class="inboxIcon dontHide"
            :style="{'background-color': transparentNav ? 'white': 'var(--main-text-color)'}"></a>
            <span v-if="showIconToolkit == 0" class="navIconSpan" style="right:40px" id="inboxSpan" >Notifications</span>
            <div>

            </div>


            <router-link v-if="common.language == 'en'" to="/create" class="createButton">Create</router-link>
            <router-link v-if="common.language == 'cn'" to="/create" class="createButton" >创建</router-link>
        </div>


        <!-- PC NAVIGATION -->
        <div id="pcNav" style="margin-top:17px">
            <router-link to="/explore" class="navLink" v-if="common.language=='en'" style="margin-left:200px" 
            :style="{'color': transparentNav ? 'white': 'var(--secondary-panel-color)'}">Explore</router-link>
            <router-link to="/communities" id="organizations" class="navLink" v-if="common.language=='en'"
            :style="{'color': transparentNav ? 'white': 'var(--secondary-panel-color)'}">Communities</router-link>
            <router-link to="/resources" id="games" class="navLink"  v-if="common.language=='en'"
            :style="{'color': transparentNav ? 'white': 'var(--secondary-panel-color)'}">Resources</router-link>

          
            <router-link to="/explore" class="navLink" v-if="common.language=='cn'" onmouseover="toggleVisibility('exploreDropdown')" style="width: 60px;margin-left:240px"
            :style="{'color': transparentNav ? 'white': 'var(--secondary-panel-color)'}">探索</router-link>
            <router-link to="/communities" v-if="common.language=='cn'" id="organizations" class="navLink"  style="width: 60px;"
            :style="{'color': transparentNav ? 'white': 'var(--secondary-panel-color)'}">社区</router-link>
            <router-link to="/resources"  id="games" class="navLink"  v-if="common.language=='cn'" style="width: 60px;"
            :style="{'color': transparentNav ? 'white': 'var(--secondary-panel-color)'}">资源</router-link>

        </div>

        <div id="icons" style="margin-top:27px" hidden>
            <a onmouseover="toggleVisibilityNoFade('newsSpan')" onmouseout="toggleVisibilityNoFade('newsSpan')" class="navIcon" href="/news" style="margin-left:180px; mask:url(../assets/images/icons/news.svg) no-repeat center;-webkit-mask: url(/images/icons/news.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:170px" id="newsSpan" hidden>News</span>

            <a onmouseover="toggleVisibilityNoFade('exploreSpan')" onmouseout="toggleVisibilityNoFade('exploreSpan')" class="navIcon" href="/explore" style=" mask:url(../assets/images/icons/explore.svg) no-repeat center;-webkit-mask: url(/images/icons/explore.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:210px" id="exploreSpan" hidden>Explore</span>

            <!--<a onmouseover="toggleVisibilityNoFade('tutorsSpan')" onmouseout="toggleVisibilityNoFade('tutorsSpan')" class="navIcon" href="/tutor" lang="en" style="mask:url(/images/icons/tutors.svg) no-repeat center;-webkit-mask: url(/images/icons/tutors.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:260px" id="tutorsSpan" hidden>Tutors</span>-->

            <a onmouseover="toggleVisibilityNoFade('communitiesSpan')" onmouseout="toggleVisibilityNoFade('communitiesSpan')" id="organizations" class="navIcon" href="/communities"  style="mask:url(../assets/images/icons/communities.svg) no-repeat center;-webkit-mask: url(/images/icons/communities.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:230px" id="communitiesSpan" hidden>Communities</span>

            <a onmouseover="toggleVisibilityNoFade('resourcesSpan')" onmouseout="toggleVisibilityNoFade('resourcesSpan')" id="resources" class="navIcon" href="/resources" style="mask:url(../assets/images/icons/resources.svg) no-repeat center;-webkit-mask: url(/images/icons/resources.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:300px" id="resourcesSpan" hidden>Resources</span>
        </div>

        <form v-if="!transparentNav" id="searchBarArea" class="searchBarAreaTop" action="/search/">
            <!--<i class="fa fa-search searchIcon"></i>-->
            <input id="searchBar" class="searchBar" type="search" name="q" placeholder="Search activities, communities, or users" />
            <button>
                <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
        </form>
        <!--explore-->
        <!--<div hidden onmouseout="toggleVisibilityNoFade('exploreDropdown')" id="exploreDropdown" class="exploreDropdown">
            <div>Competitions:</div>
            <a>Subject:</a>
            <a>Math</a>
            <a>Computer Science</a>
        </div>-->




    </nav>

</template>

<style scoped>
a.router-link-active {
    color: var(--main-text-color)!important;
    transition:none;
  }

.navigation {
    position: fixed;
    background-color: var(--main-nav-color);
    width: 100%;
    height: 61px;
    top: 0px;
    left: 0px;
    z-index: 2;
    white-space: nowrap;
    box-shadow: 0 1px 3px -2px grey;
}
.searchBarAreaTop{
    z-index: -1;
    
    margin-top: -9px;
    margin-left: 40px;
    width: calc(100vw - 830px);
    display:flex;
    justify-content: center;
}

.searchBarAreaTop button{
    height:45px;
    cursor: pointer;
    width:50px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    font-size: 18px;
    padding-right: 10px;
    color:grey;
    border: solid 1px #272727;
    border-left: none;
    background-color: var(--main-searchbar-color);
    transition: background-color 300ms, color 1s;
}
.searchBarAreaTop button:hover{
    background-color: var(--main-panel-color);
    
}

.searchBar {
    margin-left: 40px;
    width: 100%;
    height: 45px;
    background-color: var(--main-searchbar-color);
    color: var(--searchbar-text-color);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border: solid 1px #272727;
    padding-left: 10px;
    font-size: 17px;
    transition: background-color 1s, color 1s;
}
.searchBar:focus {
    outline: none;
}
.searchBar::-webkit-search-cancel-button{
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    border-radius: 50em;
    background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%;
    background-size: contain;
    opacity: 0.3;
    cursor: pointer;
}


.searchIconFa{
    margin-left:-30px;
    color:grey;
}
.noTransition {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
}

.navLogo {
    position: fixed;
    top: 3px;
    left: 18px;
    height: 53px;
}
.navIcon {
    position: relative;
    float: left;
    margin-left: 10px;
    cursor: pointer;
    margin-top: -15px;
    background-color: var(--main-text-color);
    -webkit-mask: url(../assets/images/icons/news.svg) no-repeat center;
    mask: url(../assets/images/icons/news.svg) no-repeat center;
    width: 40px;
    height: 50px;
    transition: background-color 1s, color 1s;
}

.languageToggler {
    float: right;
    margin-right: 10px;
    margin-top: 8px;
    height: 44px;
    width: 48px;
    cursor: pointer;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.8);
}

.languageToggler:hover{
    background-color:rgba(0,0,0,0.2);
}

.languageTogglerDropdown {
    background-color: white;
    position: absolute;
    right: 10px;
    margin-top: 58px;
    width: 100px;
    height: 100px;
    box-shadow: 0px 2px 4px 1px grey;
}

.languageTogglerDropdown a {
    cursor:pointer;
    width:100%;
    text-align:center;
    margin-top:15px;
    text-align:center;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-decoration: none;
    color:black;
    display:block;
}

.languageToggler img {
    margin-top: 6px;
    margin-left: 8.5px;
    height: 32px;
    width: 32px;
}
.profileIcon {
    float: right;
    height: 45px;
    width: 45px;
    margin-top: 8px;
    margin-right: 20px;
    background-color: var(--main-text-color);
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 1s, color 1s;
}

.registerButton {
    float: right;
    margin-right: 15px;
    width: 100px;
    margin-top: 8px;
    height: 44px;
    background-color: var(--main-button-color);
    color: white;
    border: white;
    border-radius: 5px;
    padding-top: 8px;
    text-align: center;
    text-decoration: none;
    font-family: Montserrat-Bold;
    transition: background-color 1s, color 1s;
    
    font-size: 17px;
}


.signinButton {
    float: right;
    margin-right: 20px;
    margin-top: 18px;
    height: 44px;
    color: var(--main-text-color);
    text-decoration: none;
    font-family: Montserrat-Bold;
    
    font-size: 17px;
}

.createButton {
    float: right;
    margin-right: 20px;
    width: 100px;
    margin-top: 8px;
    height: 44px;
    background-color: var(--main-button-color);
    color: white;
    border: white;
    border-radius: 5px;
    padding-top: 8px;
    text-align: center;
    text-decoration: none;
    font-family: Montserrat-Bold;
    transition: background-color 1s, color 1s;
    
    font-size: 17px;
}


.profileIcon:hover {
    outline: solid 1px var(--main-button-color);
}

.profileDropDown hr {
    margin-top: 15px;
}

.profileDropDown {
    background-color: var(--main-nav-color);
    position: absolute;
    right: 10px;
    margin-top: 60px;
    width: 250px;
    padding-bottom: 20px;
    box-shadow: 0px 0px 2px 1px grey;
    border-radius: 5px;
    transition: background-color 1s, color 1s;
}


.profileUsername {
    font-size: 25px;
    margin-left: 80px;
    text-decoration: none;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display: block;
    margin-top: 10px;
    color: var(--main-text-color);
    transition: background-color 1s, color 1s;
}
.profileName {
    font-size: 20px;
    margin-left: 80px;
    text-decoration: none;
    font-family: Arial;
    display: block;
    margin-top: -5px;
    color: var(--main-text-color);
    transition: background-color 1s, color 1s;
}

.profileIcon2 {
    float: left;
    margin-left: 10px;
    height: 60px;
    width: 60px;
    margin-top: 15px;
    background-color: var(--main-text-color);
    border-radius: 30px;
    transition: background-color 1s, color 1s;
}

.profileDropDown a {
    margin-left: 10px;
    text-decoration: none;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display: block;
    margin-top: 13px;
    color: var(--main-text-color);
    cursor: pointer;
    font-size: 18px;
    transition: background-color 1s, color 1s;
}

.inboxIcon {
    float: right;
    margin-right: 20px;
    margin-top: 12px;
    cursor: pointer;    
    background-color: var(--main-text-color);
    -webkit-mask: url(/src/assets/images/icons/inbox.svg) no-repeat center;
    mask: url(/src/assets/images/icons/inbox.svg) no-repeat center;
    width: 37px;
    height: 37px;
}

.navIcon:hover .navIcon span {
    visibility: visible;
}

.navIconSpan {
    position: absolute;
    top: 60px;
    text-align: center;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: rgba(140,140,140,0.8);
    border-radius: 5px;
    z-index: 2;
    color: var(--main-text-color);
    font-family: Montserrat-Bold;

}
.searchIcon{
    position:absolute;
    left:755px;
}


.searchBar:hover {
    border-color: var(--main-text-color);
}

.compcoText {
    top: -9px;
    position: absolute;
    text-decoration: none;
    left: 75px;
    color: var(--main-text-color);
    font-size: 33px;
    font-family: Montserrat-extraBold;
}

.navLink {
    float: left;
    margin-left: 35px;
    font-size: 17px;
    font-family: Montserrat-Bold;
    cursor: pointer;
    text-decoration: none;
    color: var(--secondary-panel-color);
    transition: background-color 1s;
}
.navLink img{
    margin-top:-10px;
    width:40px;
    height:40px;
    color:var(--main-text-color);
    
    transition: background-color 1s, color 1s;
}

.navShowBar {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    font-size: 30px;
    color: var(--main-text-color);
    transition: background-color 1s, color 1s;
    cursor: pointer;
    background-color: inherit;
    text-align: center;
    outline: none;
    border: none;
    display: none;
}
.mobileNav {
    position: fixed;
    right: 0%;
    top: 0%;
    height: 100%;
    width: 60vw;
    background-color: #1F1E1E;
    z-index:2;
}


.mobileNavItem {
    font-family: Montserrat-Bold;
    font-size:25px;
    text-align:center;
    cursor:pointer;
    color:white;
    border:2px solid black;
    padding-top:10px;
    padding-bottom:10px;
}

.mobileNavItem:hover{
   background-color:red;
}
   
@media only screen and (max-width: 900px) {
    
    #pcNav{
        display: none;
    }
    .navShowBar{
        display:block;
    }
    .searchBarAreaTop {
        display: none;
    }
    .createButton{
        visibility:hidden;
    }
    .mobileNavBars {
        display: none;
    }
    .signinButton {
        visibility: hidden;
    }
    .registerButton {
        visibility: hidden;
    }
 
}


</style>

<script>
import { defineComponent } from 'vue'
import { useRouter  } from 'vue-router';
import { computed } from "vue";

export default defineComponent({
    props:["transparentNav"],
    setup() {
        
    },
    data(){
        return {
            showLanguageToggler:false,
            showProfile: false,
            showIconToolkit:-1
        }
    },
    methods:{
        
        toggleLangageToggler(input){
            this.showLanguageToggler = !this.showLanguageToggler;
        },
        toggleIcon(idx){
            this.showIconToolkit = idx;
        },
        toggleProfile(){
            this.showProfile = !this.showProfile;
            // if (this.showProfile){
            //     common.refreshSession();
            // }
        },
        goToAdminPanel(){
            let sessionID = common.readCookie("SESSIONID");
            window.location.href = common.serverAddress+"/adminPanel/"+sessionID;

        },
        changeTheme(){
            
            themes.changeColor();
            this.$forceUpdate();
        },
        changeLanguage(language){
            window.location.hash = language;
            //this.$forceUpdate();
        },
        nextLanguage(){
            
        },
        logout(){
            fetch(common.serverAddress+"/logout", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
        
                },
                body: JSON.stringify({ "SESSIONID": common.sessionID })
            })
            .then((res) => res.json()).then((data) => {
                
            })
            .catch(err => {
                // Handle error 
                console.log('Error message: ', err);
            });
            
            common.delete_cookie("SESSIONID");
            window.location.href = '/';
        }
    },
    beforeMount(){
        let that = this;
        document.addEventListener("click", (e) => {
            if (that.showProfile && !e.target.classList.contains("dontHide") ){
                that.showProfile = false;
        } });
    }
})
</script>
