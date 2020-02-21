<template>
    <div>
        <b-form-group

                label="Estimation method"
                v-bind:description="'Chosen method: ' + optimization_method"
                label-size="sm">
            <b-form-input list="my-list-id" v-on:change="update_optimization_method"></b-form-input>

            <datalist id="my-list-id">
                <option v-bind:key="name" v-for="name in available_optimization_methods.map(d=>d.name)">{{ name }}
                </option>
            </datalist>

        </b-form-group>

        <div class="mt-2">
            Method Description:
        <p class="small">
            {{get_description_for_method}}
        </p> </div>

    </div>
</template>

<script>

    // The components controls which optimization method to use.
    // The methods must be registered on the backend site properly, otherwise a new optimization task using
    // an unregistered method will fail.

    import {mapGetters} from 'vuex';
    import {mapMutations} from 'vuex';

    export default {
        name: "EstimationMethodControl",
        mounted: function () {
            this.fetch_optimization_methods()
        },
        computed: {
            ...mapGetters("estimations", {
                optimization_method: "GET_CURRENT_OPTIMIZATION_METHOD",
                available_optimization_methods: "GET_OPTIMIZATION_METHODS",
            }),
            get_description_for_method: function () {
                let current_optimization_method = this.optimization_method
                let found_element = this.available_optimization_methods.find(function (element) {
                    if (element.name == current_optimization_method) {
                        return true
                    }
                })

                if (found_element === undefined) {
                    return ""
                } else {
                    return found_element.description
                }
            }
        },
        methods: {
            ...mapMutations("estimations", {
                update_optimization_method: "UPDATE_CURRENT_OPTIMIZATION_METHOD"
            }),
            fetch_optimization_methods: function () {
                this.$store.dispatch("estimations/GET_OPTIMIZATION_METHODS_LIST")
            }
        }
    }
</script>

<style scoped>

</style>