import requestServices from '../../services/requestService.js'
import ReposObject from "../../services/ReposObject";

const repository = {
    state: {
        repos: '',
        errorLoadingRepos: false,
        isLoading: false
    },
    mutations: {
        setRepos(state,data){
            state.repos = new ReposObject(data).getList()
        },
        errorRepos(state) {
            state.errorLoadingRepos = true
        },
        setLoading(state, boolean) {
            state.isLoading = boolean
        },
    },
    actions: {
        async getRepositoryInfo() {
            try {
                store.repository.mutations.setLoading(store.repository.state, true)
                const response = await requestServices.getRepos()
                store.repository.mutations.setRepos(store.repository.state,response.data)
            } catch (e) {
                store.repository.mutations.errorRepos(store.userObject.state)
            } finally {
                store.repository.mutations.setLoading(store.repository.state, false)
            }
        }
    },
    getters: {
        checkLoadingRepos: () => {
            return store.repository.state.errorLoadingRepos
        },
        getLoading: () => {
            return store.repository.state.isLoading
        },
        getRepos: () => {
            return store.repository.state.repos
        }
    }
}

export default repository
