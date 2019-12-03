<template>
    <div id="app">
        <b-container fluid>
            <Header>

            </Header>
            <b-row>
                <b-col md="3">
                    <ClientsList></ClientsList>
                </b-col>
                <b-col md="9">
                    <StatisticsDataPlane>
                    </StatisticsDataPlane>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

    import ClientsList from "@/components/ClientsList";
    import StatisticsDataPlane from "./components/StatisticsDataPlane";
    import Header from "@/components/Header";

    export default {
        name: 'app',
        components: {
            ClientsList,
            StatisticsDataPlane,
            Header
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
