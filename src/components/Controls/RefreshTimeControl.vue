<template>
    <div>
        <b-form-group
                label="Refresh Timeout"
                v-bind:description="'Chosen time in seconds: ' + refresh_timeout"
                label-size="sm">

            <b-button-group>
                <b-button v-on:click="decrease" variant="danger">-</b-button>
                <b-button v-on:click="increase" variant="success">+</b-button>
            </b-button-group>
        </b-form-group>
    </div>
</template>

<script>

    // The element controls how frequent to execute polling operation.
    // Minimal time is 5 seconds. That could be reduced, but in case of huge dataset some figures, such as heatmap,
    // will consume enormous amount of resources, poor performed computers may struggle.

    import {mapGetters} from 'vuex';

    export default {
        name: "RefreshTimeControl",
        data: function () {
            return {
                min_refresh: 5,
                max_refresh: 100,
            }
        },
        computed: {
            ...mapGetters("control", {
                refresh_timeout: "REFRESH_TIMEOUT",
            }),
        },
        methods: {
            increase: function () {
                this.updateValue(this.refresh_timeout + 1)
            },
            decrease: function () {
                this.updateValue(this.refresh_timeout - 1)
            },
            updateValue: function (data) {
                if (this.min_refresh <= data && data <= this.max_refresh) {
                    this.$store.commit("control/UPDATE_REFRESH_TIMEOUT", data)
                }
            },
            IntegerFormat(value) {
                return parseInt(value)
            },
        }
    }
</script>

<style scoped>

</style>