<template>
    <div class="p-3">
        <b-form-group
                label="Window Size"
                v-bind:description="'Chosed size: ' + window_size"
                label-cols-lg="5">
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
            IntegerFormat(value) {
                return parseInt(value)
            },
        },
    }
</script>

<style scoped>

</style>