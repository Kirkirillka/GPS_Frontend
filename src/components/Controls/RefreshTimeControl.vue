<template>
    <div class="p-3">
    <b-form-group
            label="Refresh Timeout"
            v-bind:description="'Chosed time in seconds: ' + refresh_timeout"
            label-cols-lg="5">
        <b-form-input type="number"
                      size="sm"
                      v-model="refresh_timeout"
                      :max="max_refresh"
                      :min="min_refresh"
                      :formatter="SecondsFormat"
                      v-on:input="updateValue"
        ></b-form-input>
    </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "RefreshTimeControl",
        data: function(){
            return {
                refresh_timeout: this.value,
                min_refresh: 5,
                max_refresh: 100
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