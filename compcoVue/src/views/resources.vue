<script setup>

    import footerVue from '../components/footerVue.vue'
</script>

<template>
    <main>
        <router-view v-bind="$attrs"></router-view>
        <footerVue></footerVue>
    </main>
</template>

<style scoped>

</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
