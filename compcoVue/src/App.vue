<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navBar from './components/navBar.vue'
import common from "./assets/common"
import themes from "./assets/themes"

</script>

<template>
    <main>

        <vue-progress-bar></vue-progress-bar>
        <link rel="stylesheet" 
        href="node_modules/@fortawesome/fontawesome-free/css/all.css">
        <navBar v-if="renderComponent" :transparentNav="transparentNav" />


        <RouterView v-if="renderComponent"  @toggleNav="toggleNav"/>
    </main>
</template>

<style scoped>

/*background: linear-gradient( to bottom, var(--main-panel-color) 80%, rgba(0, 0, 0, 0)) ;*/
main::v-deep .mainContent {
    position:relative;
    margin-top: 100px;
    width: 1400px;
    margin-left: calc((100% - 1400px)/2);
    margin-bottom:50px;
}
main::v-deep .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
    opacity:0.7;
}
main {
    overflow-x: hidden;

    background-color: var(--main-bg-color);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: var(--main-text-color);
    transition: background-color 1s, color 1s;

}
main{
    width: 100vw;
    overflow: none;
}
#nav-placeholder {
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

.skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
    opacity:0.7;
}

@keyframes skeleton-loading{
    0%{
        background-color:hsl(200,20%,70%);
    }
    100% {
        background-color: hsl(200,20%,95%);
    }
}


@keyframes animate {

    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }
}

@viewport{
    zoom:1.0;
    width: auto;
}
@-ms-viewport {
    zoom: 1.0;
    width: auto;
}


@media only screen and (max-width: 1500px) {
    main::v-deep .mainContent {
        width: 1000px;
        margin-left: calc((100% - 1000px)/2);
    }
}

@media only screen and (max-width: 1100px) {
    /*.searchBar{
        display:none;
    }*/
    main::v-deep .mainContent {
        width: calc(100% - 40px);
        margin-left: 20px;
    }

}


</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    data() {
        return {
            renderComponent: true,
            transparentNav:false
        };
    },
    methods: {
        forceRerender() {
            this.renderComponent = false;

            this.$nextTick(() => {
                // Adding the component back in
                this.renderComponent = true;
            });
        },
        toggleNav(visible){
            this.transparentNav = !visible;
        },
        refreshLanguage(){
            if (window.location.hash == "#cn") {
                common.changeLanguage("cn");
                localStorage["language"] = "cn";
            }
            else if (window.location.hash == "#en"){
                common.changeLanguage("en");
                localStorage["language"] = "en";
            }else if (window.location.hash == "#kor"){
                common.changeLanguage("kor");
                localStorage["language"] = "kor";
            }else if (localStorage["language"] != null){
                common.changeLanguage(localStorage["language"]);
            }

            this.forceRerender();
        }
    },
    mounted(){
        this.$Progress.finish();
    },
    beforeMount(){
        common.refreshSession().then((data)=>{
            this.forceRerender();
        });
        let that = this;
        
        this.refreshLanguage();
        window.onhashchange = function () {
            that.refreshLanguage();
        }
        
        themes.setColors();
    },
    created(){
        this.$Progress.start();
        let that = this;
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
            //  does the page we want to go to have a meta.progress object
            if (to.meta.progress !== undefined) {
            let meta = to.meta.progress;
            // parse meta tags
            this.$Progress.parseMeta(meta);
            }
            //  start the progress bar
            this.$Progress.start();
            //  continue to next page
            next();
        });
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
            this.$Progress.finish();
        });
    }
})
</script>
