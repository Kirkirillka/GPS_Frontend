<template>
    <div class="my-1">

        <b-card
                title="Estimation Menu">
            <b-card-text>
                <b-form-row>
                    <b-col>
                        <ClusterNumberControl/>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <EstimationMethodControl/>
                    </b-col>
                </b-form-row>
            </b-card-text>

            <template slot="footer">
                <b-button-group>
                    <UAVEstimationUpdateButton></UAVEstimationUpdateButton>
                    <EstimationTaskRunnerButton></EstimationTaskRunnerButton>
                </b-button-group>
            </template>
        </b-card>
    </div>
</template>

<script>
    import ClusterNumberControl from "../../Controls/Estimations/ClusterNumberControl";
    import EstimationMethodControl from "../../Controls/Estimations/EstimationMethodControl";
    import UAVEstimationUpdateButton from "../../Controls/Buttons/UAVEstimationUpdateButton";
    import EstimationTaskRunnerButton from "../../Controls/Buttons/EstimationTaskRunnerButton";

    export default {
        name: "EstimationMenuView",
        components: {
            EstimationTaskRunnerButton,
            UAVEstimationUpdateButton, EstimationMethodControl, ClusterNumberControl
        }
    }
</script>

<style scoped>

</style>