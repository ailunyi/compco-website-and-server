<script setup>

</script>

<template>
    <main>
        <div class="mainContent">
            <div class="title">COMPCO Resources: Everything a student needs</div>

            <div class="resourceName">Tools</div>
            <div class="toolsArea">
                <router-link to="/resources/gpa_calculator" >GPA CALCULATOR</router-link>
                <router-link to="/resources/love_calculator">LOVE CALCULATOR</router-link>
                <a href="http://www.bakeneko.games/index.html" target="_blank">BAKENEKO GAMES</a>
                <!-- <a href="gpa_calculator">CHILL LOUNGE</a> -->
                <!--<a href="gpa_calculator">MEMES</a>-->
            </div>
            <div class="resourceName">Blog</div>

            <!--<div class="resourceName">Rooms</div>
            <div class="toolsArea">
                <a href="gpa_calculator">CHILL ROOM</a>
                <a href="gpa_calculator">STUDY ROOM</a>
                <a href="gpa_calculator">GAMING ROOM</a>
            </div>-->

            <!-- <div class="learnArea">
                <div class="resourceName">Games</div>
                <div class="toolsArea">
                    <a href="gpa_calculator">24 Points</a>
                </div>
            </div>
            <div class="learnArea">
                <div class="resourceName">Learn</div>
            </div> -->

        </div>
    </main>
</template>

<style scoped>
.mainContent {
    position:relative;
    margin-top: 100px;
    width: 1400px;
    margin-left: calc((100% - 1400px)/2);
    margin-bottom:50px;
    min-height: 100vh;
}
.title {
    font-size: 40px;
    font-family: Montserrat-Bold;
    margin-bottom:30px;
}
.toolsArea {
    height: 500px;
}
.resourceName {
    float:left;
    width:100%;
    margin-top:20px;
    font-size: 25px;
    font-family: Montserrat-Bold;
}
.toolsArea a {
    margin-top:20px;
    float: left;
    width: 400px;
    height: 300px;
    background-color: #BCBCBC;
    border-radius: 20px;
    margin-right: 20px;
    text-decoration: none;
    color: white;
    text-align:center;
}
.learnArea{
    min-height:500px;
}
</style>