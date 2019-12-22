<template>
    <div class="Home">
        <NavigationView/>
        <b-container fluid>
            <b-form-row>
                <b-col cols="2">
                    <MainMenuView/>
                </b-col>
                <b-col cols="8">
                    <GraphicsView/>
                </b-col>
                <b-col cols="2">
                    <EstimationSubMenu/>
                </b-col>
            </b-form-row>
            <b-form-row>
                <b-col>
                    <StatisticsView/>
                </b-col>
                <b-col>
                    <CurrentActionsView/>
                </b-col>
            </b-form-row>
        </b-container>
    </div>
</template>

<script>

    import StatisticsView from "./View/StatisticsView";
    import NavigationView from "./View/NavigationView";
    import GraphicsView from "./View/GraphicsView";
    import MainMenuView from "./View/Menus/MainMenuView";
    import EstimationSubMenu from "./View/Menus/EstimationMenuView";
    import CurrentActionsView from "./View/CurrentActionsView";

    export default {
        components: {
            CurrentActionsView,
            EstimationSubMenu,
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