import {charts, chartSettings} from "../component/charts";
import {addLeftMenu, getReposByYear} from '../helper/commonAsyncRequests'

export default async function getHtml() {
    let html = `<div class="main-field">
                     <div class="loader" style="margin: auto"></div>
                           ${charts()} 
                </div>`;
    return html;
}

if (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'activity') {
    window.onload = async () => {
        try {
            await getReposByYear(new Date().getFullYear())
            chartSettings();
        } catch (e) {
            alert("Error connection")
        }
        document.getElementsByClassName('loader')[0].remove()
        addLeftMenu()
    }
}


