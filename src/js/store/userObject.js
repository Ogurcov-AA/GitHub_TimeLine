import requestServices from '../../services/requestService.js'

const userObject = {
    state: {
        userName: (JSON.parse(sessionStorage.getItem('userObject')))?.userName || null,
        userAvatarUrl: (JSON.parse(sessionStorage.getItem('userObject')))?.userAvatarUrl || null,
        userPublicRepos: (JSON.parse(sessionStorage.getItem('userObject')))?.userPublicRepos || null,
        userCreated: (JSON.parse(sessionStorage.getItem('userObject')))?.userCreated || null,
        errorLoading: false,
        isLoading: false
    },
    mutations: {
        setInfo(state, data) {
            state.userName = data.login
            state.userAvatarUrl = data.avatar_url
            state.userPublicRepos = data.public_repos
            state.userCreated = data.created_at.slice(0, 10)
            this.saveDataInStorage(state)
        },
        error(state) {
            state.errorLoading = true
        },
        setLoading(state, boolean) {
            state.isLoading = boolean
        },
        saveDataInStorage(state) {
            if (sessionStorage.getItem('userObject'))
                sessionStorage.removeItem('userObject')
            sessionStorage.setItem('userObject', JSON.stringify({
                userName: state.userName,
                userAvatarUrl: state.userAvatarUrl,
                userPublicRepos: state.userPublicRepos,
                userCreated: state.userCreated
            }))
        }
    },
    actions: {
        async getUserInfo(userName) {
            try {
                store.userObject.mutations.setLoading(store.userObject.state, true)
                const response = await requestServices.getUser(userName)
                store.userObject.mutations.setInfo(store.userObject.state, response.data)
            } catch (e) {
                store.userObject.mutations.error(window.store.userObject.state)
            } finally {
                store.userObject.mutations.setLoading(store.userObject.state, false)
            }
        }
    },
    getters: {
        getName: () => {
            return store.userObject.state.userName
        },
        getAvatar: () => {
            return store.userObject.state.userAvatarUrl
        },
        checkError: () => {
            return store.userObject.state.errorLoading
        },
        getLoading: ()=>{
            return store.userObject.state.isLoading
        },
        getReposCount: ()=>{
            return store.userObject.state.userPublicRepos
        }
    }
}

export default userObject
