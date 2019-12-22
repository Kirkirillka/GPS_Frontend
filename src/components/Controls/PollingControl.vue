<template>
    <div>
        <b-form-group
                description="Automatic updates"
                label="Polling Switcher"
                label-size="sm">
            <div>
                <b-checkbox size="sm" switch v-bind:oninput="is_polling" v-on:change="updateValue">
                </b-checkbox>
            </div>
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
                refresh: "REFRESH_TIMEOUT"
            }),
        },
        watch: {
            is_polling: function () {
                this.toggle_polling()
            }
        },
        methods: {
            updateValue: function (data) {
                this.$store.commit("control/TOGGLE_PULLING", data);
            },
            poll_operation: function () {
                this.$store.dispatch("data/GET_CLIENT_INFO")
                this.$store.dispatch("data/GET_LOCATION_ESTIMATIONS")
                this.$store.dispatch("stats/GET_REGISTERED_CLIENTS")
                this.$store.dispatch("stats/GET_MESSAGES_STATISTICS")

            },
            toggle_polling: function () {
                if (this.is_polling === true) {
                    this.poll_operation()
                    this.timer = setInterval(this.poll_operation, this.refresh * 1000)
                } else {
                    clearInterval(this.timer)
                }
            }

        },

    }
</script>

<style scoped>

</style>