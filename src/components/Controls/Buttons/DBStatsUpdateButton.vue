<template>
    <b-button variant="outline-primary" id="update-stats-btn" size="sm" v-on:click="get_stats"> Update
        Get DB Stats
    </b-button>
</template>

<script>

    // The button component controls when to invoke an DB statistics update procedure.

    export default {
        name: "DBStatsUpdateButton",
        methods: {

            get_stats: function () {
                this.$store.dispatch("stats/GET_MESSAGES_STATISTICS");
            }
        }
    }
</script>

<style scoped>

</style>