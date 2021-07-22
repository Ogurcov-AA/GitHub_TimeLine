import http from "./http";
import axios from "axios";

export default class RequestService {
    static getUser(userName) {
        return axios.get(http.getUser(userName))
    }
    static getRepos(per_page,page){
        return axios.get(http.getRepos(store.userObject.getters.getName(),per_page,page))
    }
}
