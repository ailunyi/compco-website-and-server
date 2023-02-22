<script setup>

</script>

<template>
    <nav id="navigation" class="navigation">
        <a href="/">
            <img class="navLogo" alt="Bakeneko" src="/images/logo2.png" />
            <text class="compcoText">omp</text>
            <text class="compcoText" style="top:28px">co</text>
        </a>


        <!-- PHONE NAVIGATION -->
        <button onclick="showBar('#mobileNav')" id="mobileNavBars" class="navShowBar">☰</button>
        <div id="mobileNav" hidden class="mobileNav dontHide">

        </div>


        <!-- when not logged in -->
        <div id="notLoggedIn">
            <!--language toggler-->
            <div onclick="toggleVisibility('languageTogglerDropdown')" id="languageToggler" class="languageToggler"><img src="/images/language.png" /> </div>
            <div hidden id="languageTogglerDropdown" class="languageTogglerDropdown">
                <a lang="en" style="cursor:default; color:darkred" href="#en">English</a>
                <a lang="en" href="#cn">中文</a>

                <a lang="zh" hidden href="#en">English</a>
                <a lang="zh" hidden style="cursor:default; color:darkred">中文</a>
            </div>


            <!-- login & signin buttons -->
            <a lang="en" class="registerButton" href="/register"><p>Register</p></a>
            <a lang="en" class="signinButton" id="signin" href="/signin">Sign in</a>

            <a hidden lang="zh" class="registerButton" href="/register"><p>登记</p></a>
            <a hidden lang="zh" class="signinButton" href="/signin">登入</a>

        </div>

        <!--when logged in-->
        <div id="loggedIn" hidden>

            <img id="profileIcon" onclick="toggleVisibilityNoFade('profileDropDown')" class="profileIcon dontHide" />
            <div hidden id="profileDropDown" class="profileDropDown dontHide">
                <img id="profileIcon2" class="profileIcon2 dontHide" />
                <label id="profileUsername" class="profileUsername dontHide">Username</label>
                <label id="profileName" class="profileName dontHide">...</label>

                <hr />
                <a lang="en" href="/profile">My Profile</a>
                <a lang="en" href="/profile">Settings</a>
                <!--<a lang="en" href="/my_activities">My Activities</a>-->
                <a lang="en" target="_blank" href="http://localhost:8000/admin">Admin Panel</a>


                <a lang="zh" href="/profile">Profile</a>
                <!--<a lang="zh">我的活动</a>-->
                <a lang="zh" href="/admin">管理</a>

                <hr />
                <a lang="en" class="dontHide" onclick="changeColor()" id="themeName">Theme: Light</a>
                <a lang="en" href="#cn">Language: English</a>

                <a lang="zh" class="dontHide" onclick="changeColor()" id="themeName">Theme: Light</a>
                <a lang="zh" href="#en">语言：中文</a>

                <hr />
                <a lang="en" href="">Help</a>
                <a lang="en" href="/logout">Logout</a>

                <a lang="zh" href="">Help</a>
                <a lang="zh" href="/logout">登出</a>
            </div>


            <a onclick="toggleVisibilityNoFade('profileDropDown')" onmouseover="toggleVisibilityNoFade('inboxSpan')" onmouseout="toggleVisibilityNoFade('inboxSpan')" class="inboxIcon dontHide"></a>
            <span class="navIconSpan" style="right:40px" id="inboxSpan" hidden>Notifications</span>
            <div>

            </div>


            <a lang="en" href="/create" class="createButton">Create</a>
            <a lang="zh" href="/create" class="createButton">创建</a>
        </div>


        <!-- PC NAVIGATION -->
        <div id="pcNav" style="margin-top:27px">
            <a class="navLink" href="/news" lang="en" style="margin-left:200px">News</a>
            <a class="navLink" href="/explore" lang="en">Explore</a>
            <a id="organizations" class="navLink" href="/communities" lang="en">Communities</a>
            <a id="games" class="navLink" href="/resources" lang="en">Resources</a>

            <a class="navLink"  href="/news" hidden lang="zh" style="margin-left:250px; width:50px;">新闻</a>
            <a class="navLink" href="/explore" hidden lang="zh" onmouseover="toggleVisibility('exploreDropdown')" style="width: 50px;">探索</a>
            <a id="organizations" class="navLink" href="/communities" lang="zh" style="width: 50px;">社区</a>
            <a id="games" class="navLink" href="/resources" lang="zh" style="width: 50px;">资源</a>

        </div>

        <div id="icons" style="margin-top:27px" hidden>
            <a onmouseover="toggleVisibilityNoFade('newsSpan')" onmouseout="toggleVisibilityNoFade('newsSpan')" class="navIcon" href="/news" style="margin-left:180px; mask:url(/images/icons/news.svg) no-repeat center;-webkit-mask: url(/images/icons/news.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:170px" id="newsSpan" hidden>News</span>

            <a onmouseover="toggleVisibilityNoFade('exploreSpan')" onmouseout="toggleVisibilityNoFade('exploreSpan')" class="navIcon" href="/explore" style=" mask:url(/images/icons/explore.svg) no-repeat center;-webkit-mask: url(/images/icons/explore.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:210px" id="exploreSpan" hidden>Explore</span>

            <!--<a onmouseover="toggleVisibilityNoFade('tutorsSpan')" onmouseout="toggleVisibilityNoFade('tutorsSpan')" class="navIcon" href="/tutor" lang="en" style="mask:url(/images/icons/tutors.svg) no-repeat center;-webkit-mask: url(/images/icons/tutors.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:260px" id="tutorsSpan" hidden>Tutors</span>-->

            <a onmouseover="toggleVisibilityNoFade('communitiesSpan')" onmouseout="toggleVisibilityNoFade('communitiesSpan')" id="organizations" class="navIcon" href="/communities"  style="mask:url(/images/icons/communities.svg) no-repeat center;-webkit-mask: url(/images/icons/communities.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:230px" id="communitiesSpan" hidden>Communities</span>

            <a onmouseover="toggleVisibilityNoFade('resourcesSpan')" onmouseout="toggleVisibilityNoFade('resourcesSpan')" id="resources" class="navIcon" href="/resources" style="mask:url(/images/icons/resources.svg) no-repeat center;-webkit-mask: url(/images/icons/resources.svg) no-repeat center;"></a>
            <span class="navIconSpan" style="left:300px" id="resourcesSpan" hidden>Resources</span>
        </div>

        <form id="searchBarArea" action="/competitions/search/">
            <!--<i class="fa fa-search searchIcon"></i>-->
            <input id="searchBar" class="searchBar" type="search" name="q" placeholder="Search activities, communities, or accounts" />
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

.navigation {
    position: fixed;
    background-color: var(--main-nav-color);
    width: 100%;
    height: 70px;
    top: 0px;
    left: 0px;
    z-index: 1;
    white-space: nowrap;
    box-shadow: 0 1px 3px -2px grey;
    transition: background-color 1s, color 1s;
}

.noTransition {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
}

.navLogo {
    position: fixed;
    top: 0.5%;
    left: 10px;
    max-height: 60px;
}
.navIcon {
    position: relative;
    float: left;
    margin-left: 10px;
    cursor: pointer;
    margin-top: -15px;
    background-color: var(--main-text-color);
    transition: background-color 1s;
    -webkit-mask: url(/images/icons/news.svg) no-repeat center;
    mask: url(/images/icons/news.svg) no-repeat center;
    width: 40px;
    height: 50px;
    transition: background-color 1s, color 1s;
}


.navIcon:hover .navIcon span {
    visibility: visible;
}

.navIconSpan {
    position: absolute;
    top: 60px;
    text-align: center;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: rgba(140,140,140,0.8);
    border-radius: 5px;
    z-index: 2;
    color: var(--main-text-color);
    font-family: Montserrat-Bold;

}
.searchBar {
    margin-left: 40px;
    width: calc(100% - 930px);
    height: 48px;
    margin-top: -15px;
    background-color: var(--main-searchbar-color);
    color: var(--searchbar-text-color);
    border-radius: 10px;
    border: solid 1px #272727;
    padding-left: 10px;
    font-size: 17px;
    transition: background-color 1s, color 1s;
}

.searchIcon{
    position:absolute;
    left:755px;
}


.searchBar:hover {
    border-color: var(--main-text-color);
}

.compcoText {
    top: 5px;
    position: absolute;
    text-decoration: none;
    left: 75px;
    color: var(--main-text-color);
    font-size: 35px;
    font-family: Montserrat-Bold;
    transition: background-color 1s, color 1s;
}

.navLink {
    float: left;
    margin-left: 30px;
    font-size: 17px;
    font-family: Montserrat-Bold;
    cursor: pointer;
    text-decoration: none;
    color: var(--main-text-color);
    transition: background-color 1s, color 1s;
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
.navShowBar{
        display:block;
    }
</style>
