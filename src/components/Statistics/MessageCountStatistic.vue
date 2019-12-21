<template>
    <div>
        <h6>Statistics</h6>
        <b-table small simple striped hover :items="stats" :fields="fields"></b-table>

    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: "StatisticsPlane",
        data: function () {
            return {
                fields: ['name', 'count']
            }
        },
                computed: {
            ...mapGetters("stats", {
                stats: "MESSAGES_STATISTICS",
            }),
        }
    }
</script>

<style scoped>

</style>