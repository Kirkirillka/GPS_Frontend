<template>
    <b-button variant="outline-primary" id="update-clients-btn" size="sm"
              v-on:click="dispatch_ues_locations_updates">Get UEs Locations
    </b-button>
</template>

<script>
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