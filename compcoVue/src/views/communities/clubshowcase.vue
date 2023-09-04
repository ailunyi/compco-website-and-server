<script setup>

    import common from "../../assets/common"
</script>

<template>
    <main>
        <div class="posterDisplay">

        </div>
        <div class="options"></div>
    </main>
</template>

<style scoped>

.posterDisplay{
    width:90%;
    height:80%;
    background-color:rgba(156, 106, 65, 0.9);
}

.options{
    height:10%;
    width:90%;
    margin-top: 20px;
    background-color:rgba(156, 106, 65, 0.9);
}

main{
    margin-left:260px;
    width:calc(100vw - 260px);
    height: calc(100vh - 60px); 
    margin-top: 60px;
    overflow-y:scroll;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background:url(/clubshowcaseBG3.png);
}

</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    
    setup() {
    },
    data(){
        return {
        }
    },
    mounted(){
        this.$emit('page', 'clubshowcase');
    },
    methods:{
        
    }

    
})
</script>
