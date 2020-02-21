<template>
    <b-button variant="outline-primary" id="update-stats-btn" size="sm" v-on:click="get_stats"> Update
        Get Registered Clients Stats
    </b-button>
</template>

<script>
    // The button component controls when to dispatch a new task to update the registered clients information.
    export default {
        name: "RegisteredUEUpdateButton",
        methods: {

            get_stats: function () {
                this.$store.dispatch("stats/GET_REGISTERED_CLIENTS");
            }
        }
    }
</script>

<style scoped>

</style>