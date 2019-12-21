<template>
    <div>
        <MovementTrajectoryFigure></MovementTrajectoryFigure>
        <SignalQualityChangingFigure></SignalQualityChangingFigure>
        <SignalQualityGPSFigure></SignalQualityGPSFigure>
        <UAVPositionEstimationsFigure></UAVPositionEstimationsFigure>
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