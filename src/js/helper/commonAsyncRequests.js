import store from "../store";
import leftMenu from "../component/leftMenu";

function getUser(userName){
    store.userObject.actions.getUserInfo(userName)
    let timer = new Promise(function (resolve,reject){
        let temp =  setInterval( () =>{
            if (store.userObject.getters.getLoading() !== true && store.userObject.getters.checkError() !== true) {
                resolve(store.userObject.getters.getName())
                clearInterval(temp)
            }
        }, 100)
    })
    return timer
}

async function addLeftMenu(){
    await getUser(parseURLGetName())
    document.getElementsByClassName("main-field")[0].insertAdjacentHTML('beforebegin',
        leftMenu(store.userObject.getters.getName(),store.userObject.getters.getAvatar()))
}
function parseURLGetName(){
    return location.pathname.substring(location.pathname.indexOf('/',1)+1,location.pathname.lastIndexOf('/'))
}

function getReposByYear(currentYear) {
    store.repository.actions.getReposByYear(parseURLGetName(), currentYear)
    return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
            if (store.repository.getters.checkLoadingReposByYear() !== true && store.repository.getters.checkErrorReposByYear()!==true) {
                resolve()
                clearInterval(timer)
            }else if(store.repository.getters.checkErrorReposByYear()===true){
                reject()
            }
        }, 100)
    })
}

export {addLeftMenu, parseURLGetName, getReposByYear}
