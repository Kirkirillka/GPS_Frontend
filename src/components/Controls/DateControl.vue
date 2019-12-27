<template>
    <div>
        <b-form-group
                description="Beginning datetime of the dataset"
                label-for="start-time"
                label-size="sm">
            <date-picker size="sm" id="start-time" v-bind:value="start" v-on:input="update_start_date"></date-picker>

        </b-form-group>

        <b-form-group
                description="Ending datetime of the dataset"
                label-for="end-time"
                label-size="sm">
            <date-picker id="end-time" v-bind:value="end" v-on:input="update_end_date"></date-picker>
        </b-form-group>
    </div>
</template>

<script>

    import jQuery from 'jquery'
    import {mapGetters} from 'vuex';

    // Using font-awesome 5 icons
    import '@fortawesome/fontawesome-free/css/fontawesome.css';
    import '@fortawesome/fontawesome-free/css/regular.css';
    import '@fortawesome/fontawesome-free/css/solid.css';
    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    // app.js
    jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
        icons: {
            time: 'far fa-clock',
            date: 'far fa-calendar',
            up: 'fas fa-arrow-up',
            down: 'fas fa-arrow-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'fas fa-calendar-check',
            clear: 'far fa-trash-alt',
            close: 'far fa-times-circle'
        }
    });

    export default {
        name: "DateControl",
        components: {
            datePicker
        },
        data() {
            return {}

        },
        computed: {
            ...mapGetters("control", {
                start: "START_DATETIME_FILTER",
                end: "END_DATETIME_FILTER",
            }),

        },
        methods: {
            update_start_date: function (data) {
                this.$store.commit("control/UPDATE_START_DATETIME_FILTER", data)
            },
            update_end_date: function (data) {

                this.$store.commit("control/UPDATE_END_DATETIME_FILTER", data)
            }
        },
    }
</script>

<style scoped>
</style>