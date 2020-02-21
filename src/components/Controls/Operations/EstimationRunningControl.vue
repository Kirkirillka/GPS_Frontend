<template>
    <div>
        <b-card sub-title="Available operations">
            <b-card-text>
                <b-button-group vertical>
                    <EstimationTaskRunnerButton></EstimationTaskRunnerButton>
                </b-button-group>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    // The component is a container for control elements:
    // 1. EstimationTaskRunnerButton
    //
    // Used for convenience to place the components in the code.

    import EstimationTaskRunnerButton from "../Buttons/EstimationTaskRunnerButton";
    export default {
        name: "EstimationRunningControl",
        components: {EstimationTaskRunnerButton},
    }
</script>

<style scoped>

</style>