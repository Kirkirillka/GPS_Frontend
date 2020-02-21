<template>
    <b-button variant="outline-primary" id="update-estimations-btn" size="sm"
              v-on:click="dispatch_uavs_locations_updates">Get UAVs Estimated Locations
    </b-button>

</template>

<script>
    // The button components control when to dispatch an event to update the UAVs estimation data.
    export default {
        name: "UAVEstimationUpdateButton",
        methods: {
            dispatch_uavs_locations_updates: function () {
                this.$store.dispatch("data/GET_UAVS_ALL_ESTIMATED_LOCATIONS");
            },
        }
    }
</script>

<style scoped>

</style>