export default class {
    static getUser(userName){
        return `https://api.github.com/users/${userName}`
    }
    static getRepos(userName){
        return `https://api.github.com/users/${userName}/repos`
    }
}
