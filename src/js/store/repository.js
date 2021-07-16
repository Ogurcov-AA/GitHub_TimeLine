import axios from "axios";

const repository = {
    state: {
    },
    mutations: {
    },
    actions: {
        getRepositoryInfo(userName,per_page,page) {
            return new Promise((resolve, reject) => {
                axios.get(`https://api.github.com/users/${userName}/repos?per_page=${per_page}&page=${page}`)
                    .then(response=>console.log(response))
            })
        }
    },
    getters: {

    }
}

export default repository
