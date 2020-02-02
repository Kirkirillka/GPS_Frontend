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
        </b-card>
    </div>
</template>

<script>
    import ClusterNumberControl from "../../Controls/Estimations/ClusterNumberControl";
    import EstimationMethodControl from "../../Controls/Estimations/EstimationMethodControl";

    export default {
        name: "EstimationSubMenu",
        components: {EstimationMethodControl, ClusterNumberControl}
    }
</script>

<style scoped>

</style>