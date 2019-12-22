<template>
    <div class="my-1">
        <b-tabs content-class="mt-3" fill>
            <b-tab title="Client Trajectory" active>
                <MovementTrajectoryFigure/>
            </b-tab>
            <b-tab title="Signal Changing">
                <SignalQualityChangingFigure/>
            </b-tab>
            <b-tab title="Signal Heatmap">
                <SignalQualityGPSFigure/>
            </b-tab>
            <b-tab title="UAVs Locations">
                <UAVPositionEstimationsFigure/>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>

    import MovementTrajectoryFigure from "./Figures/MovementTrajectoryFigure";
    import SignalQualityChangingFigure from "./Figures/SignalQualityChangingFigure";
    import SignalQualityGPSFigure from "./Figures/SignalQualityGPSFigure";
    import UAVPositionEstimationsFigure from "./Figures/UAVPositionEstimationsFigure";


    export default {
        name: "DataVisualPlane",
        components: {
            MovementTrajectoryFigure,
            SignalQualityChangingFigure,
            SignalQualityGPSFigure,
            UAVPositionEstimationsFigure

        },
        data: function () {
            return {}
        },
    }
</script>

<style scoped>

</style>