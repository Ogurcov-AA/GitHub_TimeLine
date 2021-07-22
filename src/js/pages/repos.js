import leftMenu from '../component/leftMenu'
import reposCard from "../component/reposCard";
import store from "../store";

export default async function getHtml() {
    settings()
    let html = `${leftMenu()}
                     <div class="main-field">
                     <h4 class="textLabel">Public Repositories</h4>
                     <div id="reposCard" class="reposGrid">
                     <div class="loader"></div>
                     </div>
                     <div class="navigation">
                     <div class="per_page">
                     <span>per_page</span>
                    <select name="per_page">
                        <option value="6" selected>6</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                    
                    </div>
                    <div class="pagination">
                        <!--pagination-->
                    </div>
                    </div>
                     </div>`;
    createGrid()
    return html;
}

let reposCount = 0;
let reposList = [];

function settings() {

    getReposCount()
}

if(location.pathname.substring(location.pathname.lastIndexOf('/')+1)==='repos'){
    window.onload = () =>{
        let select = document.getElementsByName('per_page')[0]
        select.onchange = () => {
            createGrid(select.options[select.selectedIndex].value)
        }
        createGrid(select.options[select.selectedIndex].value)
    }

}

async function createGrid(size,page=1) {
let elem = document.getElementById('reposCard')
    while(elem?.firstChild){
        elem.removeChild(elem?.firstChild);
    }
    let res = await getReposList(size,page)
     for(let i =0;i<res.length;i++){
        elem?.insertAdjacentHTML('afterbegin',
            `${reposCard(res[i].name,'', res[i].language, res[i].htmlUrl, 'size' + size)}`)
    }
}

async function getReposList(per_page,page) {
let res = await getRepos(per_page,page)
    reposList = res
    return res
}

async function getReposCount() {
   let res = await getRepos();
   reposCount = res.length
}

function getRepos(per_page=null, page=null){
    store.repository.actions.getRepositoryInfo(per_page,page)
    let timer = new Promise(function (resolve,reject){
    setInterval( () =>{
        if (store.repository.getters.getLoading() !== true && store.repository.getters.checkLoadingRepos() !== true) {
            resolve(store.repository.getters.getRepos())
        }
    }, 100)
    })
    return timer
}
