import router from '/src/js/routing/route.js'
import store from '/src/js/store/index.js'


router;
store;

store.userObject.actions.getUserInfo('ogurcov-aa')
    .then(res=>console.log(store.userObject.getters.getName()))
    .catch(rej=>console.log(rej))
