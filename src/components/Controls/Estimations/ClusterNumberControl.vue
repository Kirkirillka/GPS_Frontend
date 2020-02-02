<template>
    <div>
        <b-form-group
                label="Number of clusters"
                v-bind:description="'Chosen number: ' + num_clients"
                label-size="sm">

            <b-form-input
                    id="cluster-num-range"
                    type="range"
                    v-bind:min="get_min_cluster_num"
                    v-bind:max="get_max_cluster_num"
                    v-bind:value="num_clients"
                    :formatter="IntegerFormat"
                    v-on:change="exec_cluster_num_updates"
            ></b-form-input>

        </b-form-group>
        <div class="mt-2">
            <p>Minimum: {{ get_min_cluster_num }}</p>
            <p>Maximum: {{ get_max_cluster_num }}</p>
            <b-alert v-bind:show="get_max_cluster_num <=0">No data available!</b-alert>
        </div>
    </div>

</template>

<script>

    import {mapGetters} from 'vuex';


    export default {
        name: "ClusterNumberControl",
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters("estimations", {
                num_clients: "GET_CURRENT_CLUSTERS_NUM",
                get_min_cluster_num: "GET_MIN_CLUSTERS_NUM",
                get_max_cluster_num: "GET_MAX_CLUSTERS_NUM"
            }),
        },
        methods: {
            exec_cluster_num_updates: function (data) {
                this.$store.commit("estimations/UPDATE_CURRENT_CLUSTERS_NUM", data)
            },
            IntegerFormat(value) {
                return parseInt(value)
            },
        }
    }
</script>

<style scoped>

</style>