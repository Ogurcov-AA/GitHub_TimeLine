import leftMenu from '../component/leftMenu'
import {charts, chartSettings} from "../component/charts";
import store from '../store/index'

export default async function getHtml() {
    let html = `${leftMenu()}
                    <div class="main-field">
                ${charts()}
                    </div>`;
    settings()
    return html;
}

function settings(){
    store.repository.actions.getRepositoryInfo(store.userObject.getters.getName())
    let timer = setInterval(() => {
        if (store.repository.getters.getLoading() !== true && store.repository.getters.checkLoadingRepos() !== true) {
            chartSettings();
            clearInterval(timer)
            document.getElementsByClassName('loading')[0].remove()
        } else {

        }
    }, 100)
}
