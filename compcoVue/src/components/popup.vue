<template>
    <main>
        <div @click="closeOverlay()" class="overlay"></div>
        <div class="popup">
            <h1>Create Club</h1>
        </div>
    </main>
    
</template>
    
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props:["caption","username","images","communities"],
    setup() {
    
    },
    methods:{
        closeOverlay(){
            this.$emit('popupStatus', 'close');
        }
    }
})
</script>
    
  
<style scoped>
main{
    position: fixed;
    z-index: 3;
    display: flex;
    width:100vw;
    height:100vh;
    align-items: center;
    justify-content: center;
}

.popup{
    width:1000px;
    height:800px;
    border-radius: 10px;
    background-color:var(--main-bg-color);
}

.overlay{
    position: fixed;
    height:100vh;
    width:100vw;
    background-color: rgba(0,0,0,0.5);

}
/* Post styles here */
</style>