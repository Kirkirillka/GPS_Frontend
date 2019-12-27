<template>
    <div class="Home">
        <b-container>
            <router-view name="header"></router-view>
            <router-view></router-view>
            <router-view name="footer"></router-view>
        </b-container>
    </div>
</template>

<script>

    export default {
        components: {},
        name: "Home"
    }
</script>

<style scoped>

</style>