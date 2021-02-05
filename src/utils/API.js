import axios from "axios";

const BASEURL = "https://randomuser.me/api/?results=100&nat=US&exc=login,gender,location,registered,nat";

export default {
    search: function () {
        return axios.get(BASEURL);
    }
}