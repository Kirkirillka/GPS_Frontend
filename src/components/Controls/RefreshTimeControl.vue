<template>
    <div class="p-3">
        <b-form-group
                label="Refresh Timeout"
                v-bind:description="'Chosen time in seconds: ' + refresh_timeout"
                label-cols-lg="5">
            <b-button v-on:click="decrease" variant="danger">-</b-button>
            <b-button v-on:click="increase" variant="success">+</b-button>
        </b-form-group>
    </div>
</template>

<script>

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
            increase: function(){
                this.updateValue(this.refresh_timeout + 1)
            },
            decrease: function() {
                this.updateValue(this.refresh_timeout - 1)
            },
            updateValue: function (data) {
                if (this.min_refresh <= data && data <= this.max_refresh) {
                    this.$store.commit("control/UPDATE_REFRESH_TIMEOUT", data)
                }
            },
            SecondsFormat(value) {
                return parseInt(value)
            },
        }
    }
</script>

<style scoped>

</style>