<template>
    <div>
        <b-row no-gutters>
            <b-col>
                <DateControl/>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col>
                <PollingControl/>
            </b-col>
            <b-col>
                <RefreshTimeControl/>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col>
                <WindowSizeControl/>
            </b-col>
        </b-row>
    </div>
</template>

<script>

    import DateControl from "../../Controls/DateControl";
    import PollingControl from "../../Controls/PollingControl";
    import WindowSizeControl from "../../Controls/WindowSizeControl";
    import RefreshTimeControl from "../../Controls/RefreshTimeControl";

    export default {
        name: "ControlSubMenu",
        components: {
            DateControl,
            PollingControl,
            WindowSizeControl,
            RefreshTimeControl,
        }
    }
</script>

<style scoped>

</style>