<script setup>

    import footerVue from '../components/footerVue.vue'
</script>

<template>
    <main>
        <div class="sideBar">
            <button class="selectedButton">Chat Room</button>
            <button>Explore</button>
            <button>Joined</button>
            <button>Club Showcase</button>
            <button>Random</button>
            <hr />
            <div>Communities</div>
            <button># Anime Waifu</button>
            <button># Programming</button>
            <button># SHSID</button>
            <button># Tennis</button>
            <button># Cooking</button>
            <hr />
            <div>Clubs</div>
            <button>CompCo</button>
            <button>Bakeneko Studios</button>

            <div style="height:100px"></div> <!-- empty area for spacing-->
        </div>


        <router-view></router-view>
    </main>
</template>

<style scoped>
    .sideBar {
        padding: 20px;
        margin-top: 60px;
        width: 260px;
        height: calc(100vh - 60px);
        position: fixed;
        background-color: var(--main-bg-color);
        font-size: 20px;
        font-family: Montserrat-Bold;
        overflow-y: scroll;
        transition: background-color 1s,box-shadow 1s;
        /*box-shadow: 0 1px 3px -2px grey;*/
        box-shadow: 0px 0px 2px 0px var(--main-text-color);
    }
    hr{
        margin-top: 10px;
        
        margin-bottom: 10px;
    }

    .selectedButton{
        background-color:var(--main-panel-color)!important;
    }
    .navigation{
        box-shadow: 0 1px 3px -2px var(--main-text-color)!important;
        transition: box-shadow 1s,background-color 1s;
        background-color: var(--main-bg-color)!important;
    }

    .sideBar div {
        font-size: 20px;
    }

    .sideBar button {
        text-align:left;
        margin-top:3px;
        font-size: 20px;
        height:40px;
        border-radius:10px;
        cursor:pointer;
        width:100%;
        background:none;
        color:var(--main-text-color);
        border:none;
        
        transition:  color 1s;
    }
    .sideBar button:hover {
        background-color:var(--main-panel-color);
    }
</style>