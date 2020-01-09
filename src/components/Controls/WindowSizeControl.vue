<template>
    <div>
        <b-form-group
                label="Window Size"
                v-bind:description="'Chosen size: ' + window_size"
                label-size="sm">

            <b-form-input type="range"
                          size="sm"
                          v-bind:value="window_size"
                          :min="window_min"
                          :max="window_max"
                          :formatter="IntegerFormat"
                          v-on:change="update_window_size"
            ></b-form-input>
        </b-form-group>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: "WindowSizeControl",
        data: function () {
            return {
                window_min: 5,
                window_max: 100,
            }
        },
        computed: {
            ...mapGetters("control", {
                window_size: "WINDOW_SIZE",
            }),
        },
        methods: {
            update_window_size: function (data) {
                this.$store.commit("control/UPDATE_WINDOW_SIZE", data)
            },
            /**
             * @return {number}
             */
            IntegerFormat: function (value) {
                return parseInt(value)
            },
        },
    }
</script>

<style scoped>

</style>