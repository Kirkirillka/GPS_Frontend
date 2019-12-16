<template>
    <b-container>
        <b-row>
            <b-table striped hover :items="get_clients" :fields="fields"></b-table>
        </b-row>
    </b-container>
</template>

<script>

    import * as axios from "axios";
    //import * as d3 from "d3";

    export default {
        name: "ClientsList",
        data: function () {
            return {
                fields: [
                    {
                        key: "id",
                        label: "Registered Clients",
                        sortable: true
                    }
                ],
                clients: [],
                refresh_timeout: 4
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
            this.fetch_clients()
            //this.timer = setInterval(this.fetch_clients, this.refresh_timeout * 1000)
        }
    }
</script>

<style scoped>

</style>