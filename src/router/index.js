import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from "../components/Pages/Home";
import Visualization from "../components/Pages/Visualization";
import Estimation from "../components/Pages/Estimation";
import SignalQualityChangingFigure from "../components/View/Figures/SignalQualityChangingFigure";
import MovementTrajectoryFigure from "../components/View/Figures/MovementTrajectoryFigure";
const SignalQualityHeatmapFigure = () => import('../components/View/Figures/SignalQualityHeatmapFigure')
const LinkMeasurementFigure = () => import('../components/View/Figures/LinkMeasurementFigure')
import UAVPositionEstimationsFigure from "../components/View/Figures/UAVPositionEstimationsFigure";
import RecentUEsPositionsFigure from "../components/View/Figures/RecentUEsPositionsFigure";
import EstimationListView from "../components/View/Menus/EstimationListView";
import StatisticsView from "../components/View/StatisticsView";
import NavigationView from "../components/View/NavigationView";

Vue.use(VueRouter)


const routes = [
        {
            path: '/',
            name: 'home',
            redirect: { name: "visualization"},
            components: {
                header: NavigationView,
                default: Home,
            },
            children: [
                {
                    path: 'visualize',
                    name: 'visualization',
                    redirect: { name: "signal_view"},
                    components: {
                        default: Visualization,
                        footer: StatisticsView,
                    },
                    props: {
                        default: {
                            figures: [
                                {
                                    path: "signal_view",
                                    description: "Signal Quality Changes"
                                },
                                {
                                    path: "signal_heatmap",
                                    description: "Signal Quality Heatmap"
                                },
                                {
                                    path: "client_view",
                                    description: "Client Movement Trajectory"
                                },
                                {
                                    path: "link_view",
                                    description: "Link Measurement"
                                }
                            ]
                        }
                    },
                    children: [
                        {
                            path: 'signal',
                            name: 'signal_view',
                            component: SignalQualityChangingFigure,
                        },
                        {
                            path: 'signal/heatmap',
                            name: 'signal_heatmap',
                            component: SignalQualityHeatmapFigure
                        },
                        {
                            path: 'clients',
                            name: 'client_view',
                            component: MovementTrajectoryFigure
                        },
                        {
                            path: "link_measurements",
                            name: "link_view",
                            component: LinkMeasurementFigure
                        }
                    ]
                },
                {
                    path: 'estimate',
                    name: 'estimation',
                    redirect: { name: "ues_last_position"},
                    components: {
                        default: Estimation,
                        footer: EstimationListView,
                    },
                    props: {
                        default: {
                            figures: [
                                {
                                    path: "ues_last_position",
                                    description: "Recent UEs Location"
                                },
                                {
                                    path: "estimation_view",
                                    description: "Estimated UAVs Locations"
                                },
                            ]
                        }
                    },
                    children: [
                        {
                            path: 'view',
                            name: 'estimation_view',
                            component: UAVPositionEstimationsFigure
                        },
                        {
                            path: 'ues/last',
                            name: 'ues_last_position',
                            component: RecentUEsPositionsFigure
                        }
                    ]
                }
            ]
        },
    ]
;

export default new VueRouter({routes})