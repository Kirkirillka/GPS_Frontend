<template>
    <b-button variant="outline-primary" id="update-stats-btn" size="sm" v-on:click="get_stats"> Update
        Get DB Stats
    </b-button>
</template>

<script>
    export default {
        name: "DBStatsUpdateButton",
        methods: {

            get_stats: function () {
                this.$store.dispatch("stats/GET_REGISTERED_CLIENTS");
            }
        }
    }
</script>

<style scoped>

</style>