import http from "./http";
import axios from "axios";

export default class RequestService {
    static getUser(userName) {
        return axios.get(http.getUser(userName))
    }
    static getRepos(){
        return axios.get(http.getRepos(store.userObject.getters.getName()))
    }
}
