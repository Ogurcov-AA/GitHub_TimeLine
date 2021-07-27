import requestServices from '../../services/requestService.js'
import ReposObject from "../../services/ReposObject";

const repository = {
    state: {
        repos: '',
        reposInfo: '',
        reposLang: [],
        reposByYear: [],
        isLoadingByYear: false,
        errorLoadingByYear: false,
        errorLoadingRepos: false,
        isLoading: false
    },
    mutations: {
        setRepos(state,data){
            state.repos = new ReposObject(data).getList()
        },
        setReposInfo(state,data){
            state.reposInfo = data
        },
        setReposLang(state,data){
            state.reposLang = data
        },
        setReposByYear(state,data){
            state.reposByYear = data.items
        },
        errorRepos(state,boolean) {
            state.errorLoadingRepos = boolean
        },
        errorReposByYear(state, boolean) {
            state.errorLoadingByYear = boolean
        },
        setLoading(state, boolean) {
            state.isLoading = boolean
        },
        setLoadingByYear(state, boolean) {
            state.isLoadingByYear = boolean
        },
    },
    actions: {
        async getRepositoryInfo(userName,per_page=null, page=null) {
            try {
                store.repository.mutations.errorRepos(store.repository.state, false)
                store.repository.mutations.setLoading(store.repository.state, true)
                const response = await requestServices.getRepos(userName,per_page,page)
                store.repository.mutations.setRepos(store.repository.state,response.data)
            } catch (e) {
                store.repository.mutations.errorRepos(store.repository.state, true)
            } finally {
                store.repository.mutations.setLoading(store.repository.state, false)
            }
        },
        async getRepository(userName,reposName) {
            try {

                store.repository.mutations.errorRepos(store.repository.state,false)
                store.repository.mutations.setLoading(store.repository.state, true)
                const response = await requestServices.getReposInfo(userName,reposName)
                store.repository.mutations.setReposInfo(store.repository.state,response.data)
            } catch (e) {
                store.repository.mutations.errorRepos(store.repository.state,true)
            } finally {
                store.repository.mutations.setLoading(store.repository.state, false)
            }
        },
        async getReposLang(userName,reposName) {
            try {

                store.repository.mutations.errorRepos(store.repository.state,false)
                store.repository.mutations.setLoading(store.repository.state, true)
                const response = await requestServices.getReposLang(userName,reposName)
                store.repository.mutations.setReposLang(store.repository.state,response.data)
            } catch (e) {
                store.repository.mutations.errorRepos(store.repository.state,true)
            } finally {
                store.repository.mutations.setLoading(store.repository.state, false)
            }
        },
        async getReposByYear(userName,date) {
            try {
                store.repository.mutations.errorReposByYear(store.repository.state,false)
                store.repository.mutations.setLoadingByYear(store.repository.state, true)
                const response = await requestServices.getReposByYear(userName,date)
                store.repository.mutations.setReposByYear(store.repository.state,response.data)
            } catch (e) {
                store.repository.mutations.errorReposByYear(store.repository.state,true)
            } finally {
                store.repository.mutations.setLoadingByYear(store.repository.state, false)
            }
        }
    },
    getters: {
        checkLoadingRepos: () => {
            return store.repository.state.errorLoadingRepos
        },
        checkLoadingReposByYear: () => {
            return store.repository.state.isLoadingByYear
        },
        checkErrorReposByYear: () => {
            return store.repository.state.errorLoadingByYear
        },
        getLoading: () => {
            return store.repository.state.isLoading
        },
        getRepos: () => {
            return store.repository.state.repos
        },
        getReposInfo: () => {
            return store.repository.state.reposInfo
        },
        getReposLang: () => {
            return store.repository.state.reposLang
        },
        getReposByYearByYear: ()=> {
            return store.repository.state.reposByYear
        }
    }
}

export default repository
