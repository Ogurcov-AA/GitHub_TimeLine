import http from "./http";
import axios from "axios";

export default class RequestService {
    static getUser(userName) {
        return axios.get(http.getUser(userName))
    }
    static getRepos(userName,per_page,page){
        return axios.get(http.getRepos(userName,per_page,page))
    }
    static getReposInfo(userName,reposName){
        return axios.get(http.getReposInfo(userName,reposName))
    }
    static getReposLang(userName,reposName){
        return axios.get(http.getLangRepos(userName,reposName))
    }
    static getReposByYear(userName,date){
        return axios.get(http.getReposByYear(userName,date))
    }
}
