<template>
    <div>
        <b-card sub-title="Available operations">
            <b-card-text>
                <b-button-group vertical>
                    <UELocationUpdateButton></UELocationUpdateButton>
                    <UAVEstimationUpdateButton></UAVEstimationUpdateButton>
                </b-button-group>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    // The component is a container for control elements:
    // 1. UELocationUpdateButton
    // 2. UAVEstimationUpdateButton
    //
    // Used for convenience to place the components in the code.

    import UAVEstimationUpdateButton from "../Buttons/UAVEstimationUpdateButton";
    import UELocationUpdateButton from "../Buttons/UELocationUpdateButton";

    export default {
        name: "DataRetrievalControl",
        components: {UELocationUpdateButton, UAVEstimationUpdateButton},
    }
</script>

<style scoped>

</style>