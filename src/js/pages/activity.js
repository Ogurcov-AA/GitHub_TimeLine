import {charts, chartSettings} from "../component/charts";
import store from '../store/index'
import {addLeftMenu, parseURLGetName} from '../helper/commonAsyncRequests'

export default async function getHtml() {
    let html = `<div class="main-field">
                     <div class="loader" style="margin: auto"></div>
                           ${charts()} 
                </div>`;
    return html;
}

let cyrrentYear = new Date().getFullYear()

if (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'activity') {
    window.onload = () => {
        settings()
        addLeftMenu()
    }
}

function settings(){
    store.repository.actions.getReposByYear(parseURLGetName(), cyrrentYear)
    let timer = setInterval(() => {
        if (store.repository.getters.checkLoadingReposByYear() !== true) {
            chartSettings();
            document.getElementsByClassName('loader')[0].remove()
            clearInterval(timer)
        }
    }, 100)
}
