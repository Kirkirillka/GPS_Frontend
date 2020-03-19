<template>
    <b-container>
        <b-form-row>
            <b-col>
                <StatisticsView></StatisticsView>
            </b-col>
            <b-col>
                <CurrentActionsView></CurrentActionsView>
            </b-col>
        </b-form-row>
    </b-container>
</template>

<script>
    import StatisticsView from "./StatisticsView";
    import CurrentActionsView from "./CurrentActionsView";

    export default {
        name: "FooterView",
        components: {CurrentActionsView, StatisticsView}
    }
</script>

<style scoped>

</style>