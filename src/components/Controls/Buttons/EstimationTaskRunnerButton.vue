<template>
    <b-button variant="outline-primary" id="run-estimation-btn" size="sm"
              v-on:click="dispatch_new_estimation_task">Run a new estimation
    </b-button>
</template>

<script>
    // The button component controls when to invoke a new optimization task registration.
    export default {
        name: "EstimationTaskRunnerButton",
        methods: {
            dispatch_new_estimation_task: function () {

                this.$store.dispatch("estimations/RUN_OPTIMIZATION",);

            },
        }
    }
</script>

<style scoped>

</style>