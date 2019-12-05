<template>
    <b-form-group
            label="Refresh Timeout"
            v-bind:description="'Chosed time in seconds: ' + refresh_timeout"
            label-cols-lg="5">
        <b-form-input type="number"
                      size="sm"
                      v-model="refresh_timeout"
                      :max="100"
                      :min="1"
                      :formatter="SecondsFormat"
                      v-on:input="updateValue"
        ></b-form-input>
    </b-form-group>
</template>

<script>
    export default {
        name: "RefreshTimeControl",
        data: function(){
            return {
                refresh_timeout: this.value
            }
        },
        props: ['value'],
        methods: {
            updateValue: function () {
                this.$emit('input', this.refresh_timeout);
            },
                        SecondsFormat(value) {
                return parseInt(value)
            },
        }
    }
</script>

<style scoped>

</style>