<template>
    <div>
        <b-form-group
                label="Window Size"
                v-bind:description="'Chosen size: ' + window_size"
                label-size="sm">

            <b-form-input type="range"
                          size="sm"
                          v-bind:input="window_size"
                          :min="window_min"
                          :max="window_max"
                          :formatter="IntegerFormat"
                          v-on:change="updateValue"
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
            updateValue: function (data) {
                this.$store.commit("control/UPDATE_WINDOW_SIZE", data)
            },
            /**
             * @return {number}
             */
            IntegerFormat(value) {
                return parseInt(value)
            },
        },
    }
</script>

<style scoped>

</style>