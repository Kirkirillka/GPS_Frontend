<template>

    <b-container fluid>
        <b-row>
            <b-col md="3">

                <DateControl></DateControl>
                <PollingControl></PollingControl>
                <WindowSizeControl></WindowSizeControl>
                <RefreshTimeControl></RefreshTimeControl>

                <OperationControl>
                </OperationControl>

                <ClientsList></ClientsList>
                <StatisticsPlane></StatisticsPlane>

            </b-col>
            <b-col md="8">
                <div class="p-3">
                    <b-tabs content-class="mt-3" fill justified>
                        <b-tab title="UAVs Position Estimation" active>
                            <UAVPositionEstimation
                            >
                            </UAVPositionEstimation>
                        </b-tab>
                        <b-tab title="Signal Quality Heatmap">
                            <SignalQualityGeoPosition>
                            </SignalQualityGeoPosition>
                        </b-tab>
                        <b-tab title="Signal Level Changes">
                            <SignalQualityDynamics>
                            </SignalQualityDynamics>
                        </b-tab>
                        <b-tab title="Clients Movement Trajectory">
                            <ClientMovementTrajectory>
                            </ClientMovementTrajectory>
                        </b-tab>
                    </b-tabs>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>


    import ClientMovementTrajectory from "./Statistics/ClientMovementTrajectory";
    import SignalQualityDynamics from "@/components/Statistics/SignalQualityDynamics";
    import SignalQualityGeoPosition from "@/components/Statistics/SignalQualityGeoPosition";
    import UAVPositionEstimation from "./Statistics/UAVPositionEstimation";

    import ClientsList from "./ClientsList";

    import DateControl from "./Controls/DateControl";
    import PollingControl from "./Controls/PollingControl";
    import WindowSizeControl from "./Controls/WindowSizeControl";
    import RefreshTimeControl from "./Controls/RefreshTimeControl";

    import OperationControl from "./Controls/OperationControl";

    import StatisticsPlane from "./Statistics/StatisticsPlane";

    export default {
        name: "DataVisualPlane",
        components: {
            StatisticsPlane,
            ClientMovementTrajectory,
            SignalQualityDynamics,
            SignalQualityGeoPosition,
            ClientsList,
            DateControl,
            PollingControl,
            WindowSizeControl,
            OperationControl,
            RefreshTimeControl,
            UAVPositionEstimation

        },
        data: function () {
            return {}
        },
    }
</script>

<style scoped>

</style>