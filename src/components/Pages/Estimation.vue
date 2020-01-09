<template>
    <div>
        <b-form-row>
            <b-col cols="2">
                <ControlMenuView></ControlMenuView>
            </b-col>

            <b-col cols="8">
                <GraphicsView v-bind:figures="figures"></GraphicsView>
            </b-col>
            <b-col cols="2">
                <EstimationMenuView></EstimationMenuView>
            </b-col>
        </b-form-row>
    </div>
</template>

<script>
    import EstimationMenuView from "../View/Menus/EstimationMenuView";
    import GraphicsView from "../View/GraphicsView";
    import ControlMenuView from "../View/Menus/ControlMenuView";

    export default {
        name: "Estimation",
        props: ['figures'],
        components: {ControlMenuView, GraphicsView, EstimationMenuView}
    }
</script>

<style scoped>

</style>