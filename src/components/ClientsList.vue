<template>
    <div>
        <h6>Registered Clients</h6>
        <b-table small simple striped hover :items="get_clients.sort" :fields="fields"></b-table>
    </div>
</template>

<script>

    import * as axios from "axios";
    //import * as d3 from "d3";

    export default {
        name: "ClientsList",
        props: {
            refresh_timeout: {
                type: Number,
                default: 1
            },
        },
        data: function () {
            return {
                fields: [
                    {
                        key: "id",
                        label: "Unique IDs",
                        sortable: true
                    }
                ],
                clients: [],
            }
        },
        methods: {
            fetch_clients: function () {
                axios.get("http://localhost:5000/clients/all")
                    .then(response => this.clients = response.data);
            }
        },
        computed: {
            get_clients: function () {
                return this.clients.map(r => r.device)
            }
        },
        mounted: function () {
            this.timer = setInterval(this.fetch_clients, this.refresh_timeout * 1000)
        }
    }
</script>

<style scoped>

</style>