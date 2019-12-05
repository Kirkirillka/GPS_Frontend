<template>
    <div>
        <b-form-group
                label-cols-sm="4"
                label-cols-lg="5"
                description="Set the first datetime of data."
                label="Starting from:"
                label-for="start-time"
        >
            <date-picker id="start-time" v-model="start" v-on:input="updateValue"></date-picker>

        </b-form-group>

        <b-form-group
                label-cols-sm="4"
                label-cols-lg="5"
                description="Set the last datetime of data."
                label="Ending at:"
                label-for="end-time"
        >
            <date-picker id="end-time" v-model="end" v-on:input="updateValue"></date-picker>
        </b-form-group>
    </div>
</template>

<script>

    import jQuery from 'jquery'

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
            return {
                start: this.value.start,
                end: this.value.end
            };
        },
        props: ['value'],
        methods: {
            updateValue: function () {

                var message = {
                    start: this.start,
                    end: this.end
                }

                this.$emit('input', message);
            }
        },
    }
</script>

<style scoped>
</style>