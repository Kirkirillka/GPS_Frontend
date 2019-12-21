<template>
    <div id="app">
        <b-container>
            <b-row>
                <b-col>
                    <NavigationView/>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <MainMenuView/>
                </b-col>
                <b-col>
                    <GraphicsView/>
                </b-col>

            </b-row>
            <b-row>
                <b-col>
                    <StatisticsView/>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>

    import NavigationView from "./components/View/NavigationView";
    import GraphicsView from "./components/View/GraphicsView";
    import MainMenuView from "./components/View/MainMenuView";
    import StatisticsView from "./components/View/StatisticsView";

    export default {
        name: 'app',
        components: {
            GraphicsView,
            MainMenuView,
            StatisticsView,
            NavigationView,
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
