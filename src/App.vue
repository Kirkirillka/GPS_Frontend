<template>
    <div id="app">
        <notifications group="main" />
        <NavigationView></NavigationView>
        <router-view name="default"></router-view>
    </div>
</template>

<script>
    // Main Vue.js entry point.

    import NavigationView from "./components/View/NavigationView";
    export default {
        name: 'app',
        components: {NavigationView},
    }
</script>

<style scoped>
</style>
