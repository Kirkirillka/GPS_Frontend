<template>
    <div class="my-1">

        <b-card no-body>
            <b-tabs card>
                <b-tab title="Control" active>
                    <b-card-text>
                        <ControlSubMenu></ControlSubMenu>
                    </b-card-text>
                </b-tab>
                <b-tab title="Operations">
                    <b-card-text>
                        <OperationSubMenu/>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>

    </div>
</template>

<script>


   import ControlSubMenu from "./ControlMenuView";
   import OperationSubMenu from "./OperationSubMenu";

    export default {
        name: "MenuView",
        components: {
            OperationSubMenu,
            ControlSubMenu,

        }
    }
</script>

<style scoped>

</style>