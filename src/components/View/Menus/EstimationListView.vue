<template>
    <div>
        <b-form-row>
            <b-col>
                <b-table  small sticky-header :items="uavs_estimated_locations" :fields="fields"
                              head-variant="light"
                              v-on:row-clicked="set_current_estimation"
                              :tbody-transition-props="transProps">
                    List of estimations
                </b-table>
            </b-col>
        </b-form-row>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: "EstimationListView",
        data: function () {
            return {
                transProps: {
                    // Transition name
                    name: 'flip-list'
                },
                fields: [
                    {
                        label: "Estimation time",
                        key: "time.value",
                        sortable: true
                    },
                    {
                        key: "payload.method",
                        label: "Method"
                    },
                    {
                        label: "UAVs",
                        key: "payload.suggested",
                        formatter: (value,) => {
                            return value.length
                        }
                    },
                    {
                        label: "UEs",
                        key: "payload.ues_location",
                        formatter: (value,) => {
                            return value.length
                        }
                    }
                ]
            }
        },
        computed: {
            ...mapGetters("data", {
                uavs_estimated_locations: "GET_UAVS_ESTIMATED_LOCATIONS",
                current_estimation: "GET_CURRENT_ESTIMATION",
            }),
        },
        methods: {
            ...mapActions("data", {
                set_current_estimation: "SET_CURRENT_ESTIMATION"
            })
        }
    }
</script>

<style scoped>

</style>