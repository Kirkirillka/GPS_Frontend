<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand :to="{name: 'home'}">GPS Tracker</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{name: 'visualization' }">Visualization</b-nav-item>
                    <b-nav-item :to="{name: 'estimation' }">Estimation</b-nav-item>
                </b-navbar-nav>


                <!-- Right aligned nav items -->
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "NavigationView"
    }
</script>

<style scoped>

</style>