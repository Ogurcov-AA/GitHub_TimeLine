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

export {addLeftMenu, parseURLGetName}
