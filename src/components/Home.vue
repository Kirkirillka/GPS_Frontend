<template>
    <div class="Home">
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

    import StatisticsView from "./View/StatisticsView";
    import NavigationView from "./View/NavigationView";
    import GraphicsView from "./View/GraphicsView";
    import MainMenuView from "./View/MainMenuView";

    export default {
        components: {
            StatisticsView,
            NavigationView,
            MainMenuView,
            GraphicsView
        },
        name: "Home"
    }
</script>

<style scoped>

</style>