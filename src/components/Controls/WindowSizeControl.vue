<template>
    <div class="p-3">
        <b-form-group
                label="Window Size"
                v-bind:description="'Chosed size: ' + window_size"
                label-cols-lg="5">
            <b-form-input type="range"
                          size="sm"
                          v-model="window_size"
                          :min="window_min"
                          :max="window_max"
                          :formatter="IntegerFormat"
                          v-on:input="updateValue"
            ></b-form-input>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "WindowSizeControl",
        data: function () {
            return {
                window_size: this.value,
                window_min: 10,
                window_max: 100,
            }
        },
        props: ['value'],
        methods: {
            updateValue: function () {
                this.$emit('input', this.window_size);
            },
            IntegerFormat(value) {
                return parseInt(value)
            },
        },
    }
</script>

<style scoped>

</style>