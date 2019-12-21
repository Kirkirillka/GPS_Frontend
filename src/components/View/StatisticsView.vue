<template>
<div>
    <MessageCountStatistic/>
    <RegisteredClientsStatistic/>
</div>

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