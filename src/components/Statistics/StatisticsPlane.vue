<template>
    <div>
        <h6>Statistics</h6>
        <b-table small simple striped hover :items="stat" :fields="fields"></b-table>

    </div>
</template>

<script>

    import * as axios from 'axios'

    export default {
        name: "StatisticsPlane",
        props: {
            refresh_timeout: {
                type: Number,
                default: 1
            },
        },
        data: function () {
            return {
                stat: [],
                fields: ['name', 'count']
            }
        }
        ,
        methods: {
            fetch_msg_statistics: function () {
                axios.get("http://localhost:5000/stat")
                    .then(response => this.stat = response.data)

            }
        }
        ,
        mounted() {
            this.fetch_msg_statistics()
            this.timer = setInterval(this.fetch_msg_statistics, this.refresh_timeout * 1000)
        }
    }
</script>

<style scoped>

</style>