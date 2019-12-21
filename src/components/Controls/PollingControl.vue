<template>
    <div class="p-3">
        <b-form-group
                description="Set to start continuous pooling data"
                label="Polling Switcher"
                label-cols-lg="5">
            <b-checkbox switch v-bind:oninput="is_polling" v-on:change="updateValue">
            </b-checkbox>
        </b-form-group>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: "PollingControl",
        computed: {
            ...mapGetters("control", {
                is_polling: "POLLING",
            }),
        },
        methods: {
            updateValue: function (data) {
                this.$store.commit("control/TOGGLE_PULLING", data);
            },

        },

    }
</script>

<style scoped>

</style>