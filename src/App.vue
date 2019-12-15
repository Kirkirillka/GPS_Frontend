<template>
    <div id="app">
        <Header>
        </Header>

        <StatisticsDataPlane>
        </StatisticsDataPlane>
    </div>
</template>

<script>

    import StatisticsDataPlane from "./components/StatisticsDataPlane";
    import Header from "@/components/Header";

    export default {
        name: 'app',
        components: {
            StatisticsDataPlane,
            Header,
        },
        data: function () {
            return {
                client_last_messages: [],
                analyzer_last_estimations: []
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
