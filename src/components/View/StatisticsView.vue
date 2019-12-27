<template>
    <b-card no-body>
        <b-tabs card>
            <b-tab title="DB Statistics" active>
                <DBStatistics/>
            </b-tab>
            <b-tab title="Registered UEs">
                <RegisteredUEStatistic/>
            </b-tab>


        </b-tabs>

        <template slot="header">
            <b-button-group>
                <DBStatsUpdateButton></DBStatsUpdateButton>
                <RegisteredUEUpdateButton></RegisteredUEUpdateButton>
            </b-button-group>
        </template>
    </b-card>

</template>

<script>

    import DBStatistics from "./Statistics/MessageCountStatistic";
    import RegisteredUEStatistic from "./Statistics/RegisteredClientsStatistic";
    import DBStatsUpdateButton from "../Controls/Buttons/DBStatsUpdateButton";
    import RegisteredUEUpdateButton from "../Controls/Buttons/RegisteredUEUpdateButton";

    export default {
        name: "StatisticsView",
        components: {
            RegisteredUEUpdateButton,
            DBStatsUpdateButton,
            DBStatistics,
            RegisteredUEStatistic
        }
    }
</script>

<style scoped>

</style>