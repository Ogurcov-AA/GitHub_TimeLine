import leftMenu from '../component/leftMenu'

export default async function getHtml() {
    let html = `${leftMenu()}
                    <div class="main-field">
                        <div class="loading">loading</div>
                        <button onclick="location.pathname = location.pathname + '/start'">click</button>
                    </div>`;
    return html;
}

function checkLoadingData() {

}

