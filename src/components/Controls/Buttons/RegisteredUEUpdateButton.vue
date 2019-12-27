<template>
    <b-button variant="outline-primary" id="update-stats-btn" size="sm" v-on:click="get_stats"> Update
        Get Registered Clients Stats
    </b-button>
</template>

<script>
    export default {
        name: "RegisteredUEUpdateButton",
        methods: {

            get_stats: function () {
                this.$store.dispatch("stats/GET_MESSAGES_STATISTICS");
            }
        }
    }
</script>

<style scoped>

</style>