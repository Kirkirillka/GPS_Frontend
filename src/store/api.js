import * as axios from "axios";

const baseDomain = "api/"

export default {
    fetch_info_by_client: async (body) => {
4
        let r = await axios.post(baseDomain + "aggr/by_device_id", body)

        return r.data
    },
    fetch_all_estimations: async (body) => {
        let r = await axios.post(baseDomain + "estimations/all", body)

        return r.data
    },
    fetch_recent_estimation: async () => {
        let r = await axios.post(baseDomain + "estimations/recent",)

        return r.data
    },
    fetch_registered_clients_list: async (body) => {

        let r = await axios.get(baseDomain + "clients/all", body)

        return r.data
    },
    fetch_db_messages_stats: async (body) => {

        let r = await axios.get(baseDomain + "db/stats", body)

        return r.data
    },
    fetch_available_optimization_methods: async () => {

        //TODO: change it when the API method in backend would be done!


        return [
            {
                name: "clustering",
                description: "K-Means"
            },
            {
                name: "simplex",
                description: "K-Means + Optimization"
            }
        ]

        // let r = await axios.get(baseDomain + "estimations/methods")

        //return r.data
    },
    run_estimation_task: async (body) => {
        let r = await axios.post(baseDomain + "estimations/new", body)

        return r.data
    }
}