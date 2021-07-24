import leftMenu from '../component/leftMenu'
import {charts, chartSettings} from "../component/charts";
import store from '../store/index'

export default async function getHtml() {
    let html = `${leftMenu(parseURLGetName())}
                    <div class="main-field">
                     <div class="loader" style="margin: auto"></div>
                           ${charts()} 
                    </div>`;
    settings()
    return html;
}

function settings(){
    store.repository.actions.getReposByYear(store.userObject.getters.getName(), 2021)
    let timer = setInterval(() => {
        if (store.repository.getters.checkLoadingReposByYear() !== true) {
            chartSettings();
            document.getElementsByClassName('loader')[0].remove()
            clearInterval(timer)
        } else {

        }
    }, 100)
}

function parseURLGetName(){
    return location.pathname.substring(location.pathname.indexOf('/',1)+1,location.pathname.lastIndexOf('/'))
}

