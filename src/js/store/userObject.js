import axios from "axios";

const userObject = {
    state: {
        userName: (JSON.parse(sessionStorage.getItem('userObject')))?.userName || null,
        userAvatarUrl: (JSON.parse(sessionStorage.getItem('userObject')))?.userAvatarUrl || null,
        userPublicRepos: (JSON.parse(sessionStorage.getItem('userObject')))?.userPublicRepos || null,
        userCreated: (JSON.parse(sessionStorage.getItem('userObject')))?.userCreated || null,
    },
    mutations: {
        setInfo(state, data) {
            console.log(data)

            state.userName = data.userName
            state.userAvatarUrl = data.userAvatarUrl
            state.userPublicRepos = data.userPublicRepos
            state.userCreated = data.userCreated
        }
    },
    actions: {
        getUserInfo(userName) {
            return new Promise((resolve, reject) => {
                axios.get(`https://api.github.com/users/${userName}`)
                    .then(response => {
                        window.store.userObject.mutations.setInfo(window.store.userObject.state,
                            {
                                userName: response.data.login,
                                userAvatarUrl: response.data.avatar_url,
                                userPublicRepos: response.data.public_repos,
                                userCreated: response.data.created_at.slice(0, 10)
                            })
                        if (sessionStorage.getItem('userObject'))
                            sessionStorage.removeItem('userObject')
                        sessionStorage.setItem('userObject', JSON.stringify({
                            userName: response.data.login,
                            userAvatarUrl: response.data.avatar_url,
                            userPublicRepos: response.data.public_repos,
                            userCreated: response.data.created_at.slice(0, 10)
                        }))
                        resolve()
                    })
                    .catch(rej => {
                        reject('not found')
                    })
            })
        }
    },
    getters: {
        getName: () => {
            return window.store.userObject.state.userName
        },
        getAvatar: () => {
            return window.store.userObject.state.userAvatarUrl
        }
    }
}

export default userObject
