<template>
    <div>
        <b-form-row>
            <b-col cols="3">
                <EstimationMenuView></EstimationMenuView>
            </b-col>
            <b-col cols="9">
                <GraphicsView v-bind:figures="figures"></GraphicsView>
            </b-col>
        </b-form-row>
    </div>
</template>

<script>
    import EstimationMenuView from "../View/Menus/EstimationMenuView";
    import GraphicsView from "../View/GraphicsView";
    export default {
        name: "Estimation",
        props: ['figures'],
        components: {GraphicsView, EstimationMenuView}
    }
</script>

<style scoped>

</style>