<template>
    <div>
        <DateControl></DateControl>
        <PollingControl></PollingControl>
        <WindowSizeControl></WindowSizeControl>
        <RefreshTimeControl></RefreshTimeControl>
        <ActionsControl></ActionsControl>

    </div>
</template>

<script>

    import DateControl from "../../Controls/DateControl";
    import PollingControl from "../../Controls/PollingControl";
    import WindowSizeControl from "../../Controls/WindowSizeControl";
    import RefreshTimeControl from "../../Controls/RefreshTimeControl";
    import ActionsControl from "../../Controls/ActionsControl";

    export default {
        name: "ControlSubMenu",
        components: {
            DateControl,
            PollingControl,
            WindowSizeControl,
            RefreshTimeControl,
            ActionsControl
        }
    }
</script>

<style scoped>

</style>