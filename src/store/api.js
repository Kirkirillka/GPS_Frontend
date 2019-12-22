import * as axios from "axios";

const baseDomain = "http://localhost:5000/"

export default {
    fetch_info_by_client: async (body) => {

        let r = await axios.post(baseDomain + "aggr/by_device_id", body)

        return r.data
    },
    fetch_estimations: async (body) => {
        let r = await axios.post(baseDomain + "estimations/all", body)

        return r.data
    },
    fetch_registered_clients_list: async (body) => {

        let r = await axios.get(baseDomain + "clients/all", body)

        return r.data
    },
    fetch_messages_statistics: async (body) => {

        let r = await axios.get(baseDomain + "stats", body)

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