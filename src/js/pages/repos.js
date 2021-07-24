import leftMenu from '../component/leftMenu'
import reposCard from "../component/reposCard";
import store from "../store";
import {pagination, createPaginationComp} from "../component/pagination";

export default async function getHtml() {
    let html = `${leftMenu(parseURLGetName())}
                     <div class="main-field">
                        <h4 class="textLabel">Public Repositories</h4>
                            <div id="reposCard" class="reposGrid">
                                <div class="loader"></div>
                            </div>
                        <div class="navigation">
                          <div class="navigation-wrapper">
                             <div class="per_page">
                                <span>per_page</span>
                        <select name="per_page">
                            <option value="6" selected>6</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                        </select>
                            </div>
                           <div class="pagination">
                                ${pagination()}
                           </div>
                          </div>
                        </div>
                     </div>`;

    return html;
}

let per_page = Number(localStorage.getItem('per_page')) || 6;
let page = Number(localStorage.getItem('currentPage')) || 1;
let reposList = [];

if (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'repos') {
    window.onload = () => {
        let select = document.getElementsByName('per_page')[0]
        for(let i=0;i<select.options.length;i++){
                if(Number(select.options[i].value)===per_page){
                    select.options[i].selected = true
                }
        }
        select.onchange = () => {
            per_page = select.options[select.selectedIndex].value
            setFilter(Number(per_page),1)
            page=1
            createGrid(per_page)
            createPagination(page)
        }
        createGrid(per_page,page)
        createPagination(page)
    }
}

async function createGrid(size, page = 1) {
    let elem = document.getElementById('reposCard')
    while (elem?.firstChild) {
        elem.removeChild(elem?.firstChild);
    }
    let res = await getReposList(size, page)
    for (let i = 0; i < res.length; i++) {
        console.log(res[i])
        let newElem = document.createElement(`div`)
        newElem.setAttribute('class', 'cardRectangle')
        newElem.classList.add('cardRectangle')
        newElem.classList.add(`size${size}`)
        newElem.insertAdjacentHTML('afterbegin',
            `${reposCard(res[i].name, '', res[i].language, res[i].htmlUrl)}`)
        newElem.onclick = () => {
            console.log(res[i].name)
            debugger
            location.pathname = `/repos/${store.userObject.getters.getName()}/${res[i].name}`
        }
        elem.appendChild(newElem)
    }
}

async function getReposList(per_page, page) {
    let res = await getRepos(per_page, page)
    reposList = res
    return res
}

function parseURLGetName() {
    return location.pathname.substring(location.pathname.indexOf('/', 1) + 1, location.pathname.lastIndexOf('/'))
}

async function createPagination(page) {
    let count = store.userObject.getters.getReposCount()
    createPaginationComp(Number(count), per_page, page, function (per_page, page) {
        createGrid(per_page, page)
        setFilter(null,Number(page))
        createPagination(page)
    })
}

function getRepos(per_page = null, page = null) {
    store.repository.actions.getRepositoryInfo(parseURLGetName(), per_page, page)
    let timer = new Promise(function (resolve, reject) {
        setInterval(() => {
            if (store.repository.getters.getLoading() !== true && store.repository.getters.checkLoadingRepos() !== true) {
                resolve(store.repository.getters.getRepos())
            }
        }, 100)
    })
    return timer
}

function setFilter(per_page=null,page=null){
    if(page){
        localStorage.removeItem('currentPage')
        localStorage.setItem('currentPage',page)
    }
    if(per_page){
        localStorage.removeItem('per_page')
        localStorage.setItem('per_page',per_page)
    }
}
