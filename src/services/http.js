export default class {
    static getUser(userName){
        return `https://api.github.com/users/${userName}`
    }
    static getRepos(userName,per_page,page){
        return `https://api.github.com/users/${userName}/repos?per_page=${per_page}&page=${page}`
    }
    static getReposInfo(userName, reposName){
        return `https://api.github.com/repos/${userName}/${reposName}`
    }
    static getLangRepos(userName,reposName){
        return `https://api.github.com/repos/${userName}/${reposName}/languages`
    }
}
