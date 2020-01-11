<template>
    <div>
        <b-form-row>
            <b-col lg="3" >
                <ControlMenuView></ControlMenuView>
            </b-col>
            <b-col lg="9" >
                <GraphicsView v-bind:figures="figures"></GraphicsView>
            </b-col>
        </b-form-row>
    </div>
</template>

<script>
    import ControlMenuView from "../View/Menus/ControlMenuView";
    import GraphicsView from "../View/GraphicsView";

    export default {
        name: "Visualization",
        props: ["figures"],
        components: {ControlMenuView, GraphicsView},
    }
</script>

<style scoped>

</style>