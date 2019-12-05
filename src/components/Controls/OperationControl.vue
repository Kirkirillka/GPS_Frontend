<template>
    <b-form-group
    label="Available operations"
    description="Choose all available operations"
    >
        <b-button v-on:click="$emit('data-fetch')">Fetch new data</b-button>
    </b-form-group>
</template>

<script>
    export default {
        name: "OperationControl"
    }
</script>

<style scoped>

</style>