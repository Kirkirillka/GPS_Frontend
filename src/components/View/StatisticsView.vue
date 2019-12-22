<template>
    <b-card no-body>
        <b-tabs card>
       <b-tab title="DB Statistics" active>
            <MessageCountStatistic/>
       </b-tab>
            <b-tab title="Registered UEs">
                <RegisteredClientsStatistic/>
            </b-tab>

        </b-tabs>
    </b-card>

</template>

<script>

    import MessageCountStatistic from "../Statistics/MessageCountStatistic";
    import RegisteredClientsStatistic from "../Statistics/RegisteredClientsStatistic";

    export default {
        name: "StatisticsView",
        components: {
            MessageCountStatistic,
            RegisteredClientsStatistic
        }
    }
</script>

<style scoped>

</style>