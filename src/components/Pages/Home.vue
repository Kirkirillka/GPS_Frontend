<template>
    <div class="Home">
        <b-container fluid>
            <router-view name="header"></router-view>
            <router-view></router-view>
            <router-view name="footer"></router-view>
        </b-container>
    </div>
</template>

<script>

    // The default page to route "/".

    export default {
        components: {},
        name: "Home"
    }
</script>

<style scoped>

</style>