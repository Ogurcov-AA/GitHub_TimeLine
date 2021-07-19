import requestServices from '../../services/requestService.js'

const repository = {
    state: {
        errorLoadingRepos: false,
        isLoading: false
    },
    mutations: {
        errorRepos(state) {
            state.errorLoadingRepos = true
        },
        setLoading(state, boolean) {
            state.isLoading = boolean
        },
    },
    actions: {
        async getRepositoryInfo(userName, per_page, page) {
            try {
                store.repository.mutations.setLoading(store.repository.state, true)
                const response = await requestServices.getRepos(per_page, page)
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
            return store.userObject.state.isLoading
        }
    }
}

export default repository
