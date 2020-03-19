<template>
    <b-button variant="outline-primary" id="update-clients-btn" size="sm"
              v-on:click="dispatch_ues_locations_updates">Get UEs Locations
    </b-button>
</template>

<script>
    // The button components control when to dispatch an event to fetch the UEs messages with applied filters.
    export default {
        name: "UELocationUpdateButton",
        methods: {
            dispatch_ues_locations_updates: function () {
                this.$store.dispatch("data/GET_UES_ALL_LOCATIONS");
            },
        }
    }
</script>

<style scoped>

</style>