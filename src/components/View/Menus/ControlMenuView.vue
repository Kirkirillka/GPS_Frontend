<template>
    <div class="my-1">
        <b-card title="Control Menu">
            <b-card-text>
                <b-form-row>
                    <b-col>
                        <DateControl/>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <PollingControl/>
                    </b-col>
                    <b-col>
                        <RefreshTimeControl/>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <WindowSizeControl/>
                    </b-col>
                </b-form-row>
            </b-card-text>
            <template slot="footer">
                <b-button-group>
                    <UELocationUpdateButton></UELocationUpdateButton>
                </b-button-group>
            </template>
        </b-card>

    </div>
</template>

<script>

    import DateControl from "../../Controls/DateControl";
    import PollingControl from "../../Controls/PollingControl";
    import WindowSizeControl from "../../Controls/WindowSizeControl";
    import RefreshTimeControl from "../../Controls/RefreshTimeControl";
    import UELocationUpdateButton from "../../Controls/Buttons/UELocationUpdateButton";

    export default {
        name: "ControlMenuView",
        components: {
            UELocationUpdateButton,
            DateControl,
            PollingControl,
            WindowSizeControl,
            RefreshTimeControl,
        }
    }
</script>

<style scoped>

</style>