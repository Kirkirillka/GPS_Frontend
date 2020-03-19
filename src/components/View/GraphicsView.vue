<template>
    <div class="my-1">
        <b-card title="Card Title" no-body>
            <b-card-header header-tag="nav">
                <b-nav card-header tabs fill>
                    <b-nav-item exact exact-active-class="active" v-bind:key="figure.path" v-for="figure in figures" :to="{name: figure.path }">{{figure.description}} </b-nav-item>
                </b-nav>
            </b-card-header>
            <b-card-body style="height: 650px; ">
                <router-view></router-view>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>

    export default {
        name: "GraphicsView",
        components: {},
        props: ["figures"],
        data: function () {
            return {}
        },
    }
</script>

<style scoped>

</style>