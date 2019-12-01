<template>
    <div>
        <b-table striped hover :items="get_clients"></b-table>
    </div>
</template>

<script>

    import * as axios from "axios";
    //import * as d3 from "d3";

    export default {
        name: "ClientsList",
        data: function () {
            return {
                clients: []
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
        }
    }
</script>

<style scoped>

</style>