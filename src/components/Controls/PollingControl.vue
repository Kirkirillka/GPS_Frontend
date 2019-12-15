<template>
    <div class="p-3">
        <b-form-group
                description="Set to start continuous pooling data"
                label="Polling Switcher"
                label-cols-lg="5">
            <b-checkbox switch v-model="is_polling" v-on:input="updateValue">
            </b-checkbox>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "PollingControl",
        data: function () {
            return {
                is_polling: this.value
            }
        },
        props: ['value'],
        methods: {
            updateValue: function () {
                this.$emit('input', this.is_polling);
            },

        },

    }
</script>

<style scoped>

</style>