<template>
    <div>
        <b-row>
            <b-col>
                <ActionsControl/>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <EstimationRunningControl/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import ActionsControl from "../../Controls/DataRetrievalControl";
    import EstimationRunningControl from "../../Controls/EstimationRunningControl";

    export default {
        name: "OperationSubMenu",
        components: {
            EstimationRunningControl,
            ActionsControl
        }
    }
</script>

<style scoped>

</style>