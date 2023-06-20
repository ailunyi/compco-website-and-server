<script setup>

    import footerVue from '../../components/footerVue.vue'
</script>

<template>
    <main>
    
        <h1>Harry Potter Game</h1>
    </main> 
</template>

<style scoped>
main{
    min-height:100vw;
    width:100vw;
}
h1{
    margin-top: 90px;
    font-size: 45px;
    font-weight: 700;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    width:100%;
    text-align: center;
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
        this.$emit('absolute', true);
    },
    unmounted(){
        this.$emit('absolute', false);
    },
    methods:{
       
    }

    
})
</script>
