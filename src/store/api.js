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
}