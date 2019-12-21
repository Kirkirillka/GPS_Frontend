<template>
    <div>
        <h6>Registered Clients</h6>
        <b-table small simple striped hover :items="stats" :fields="fields"></b-table>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: "ClientsList",
        data: function () {
            return {
                fields: [
                    {
                        key: "device.id",
                        label: "Unique IDs",
                        sortable: true
                    }
                ],
            }
        },
        computed: {
            ...mapGetters("stats", {
                stats: "REGISTERED_CLIENTS",
            }),
        }
    }
</script>

<style scoped>

</style>