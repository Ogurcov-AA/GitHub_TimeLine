import reposCard from "../component/reposCard";
import store from "../store";
import {createPaginationComp, pagination} from "../component/pagination";
import {addLeftMenu, parseURLGetName} from '../helper/commonAsyncRequests'

export default async function getHtml() {

    let html = `<div class="loader" style="margin: 0 auto"></div> 
                    <div class="main-field hidden-main-field">
                        <h4 class="textLabel">Public Repositories</h4>
                            <div id="reposCard" class="reposGrid">
                            </div>
                        <nav class="navigation">
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
                        </nav>
                     </div>`;
    return html;
}

let per_page = Number(localStorage.getItem('per_page')) || 6;
let page = Number(localStorage.getItem('currentPage')) || 1;
let reposList = [];

if (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'repos') {
    window.onload = () => {
        addLeftMenu()
        addSelectPerPage()
        createGrid(per_page,page)
        createPagination(page)
        hiddenLoader()
        showHiddenElements()
    }
}

function hiddenLoader(){
    document.getElementsByClassName('loader')[0].style.display = 'none'
}

function showHiddenElements(){
    document.getElementsByClassName('hidden-main-field')[0].style.visibility = 'visible'
}


function addSelectPerPage(){
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
}

async function createGrid(size, page = 1) {
    let res = await getRepos(size, page)
    let elem = document.getElementById('reposCard')
    while (elem?.firstChild) {
        elem.removeChild(elem?.firstChild);
    }
    for (let i = 0; i < res.length; i++) {
        let newElem = document.createElement(`div`)
        newElem.setAttribute('class', 'cardRectangle')
        newElem.classList.add('cardRectangle')
        newElem.classList.add(`size${size}`)
        newElem.insertAdjacentHTML('afterbegin',
            `${reposCard(res[i].name, '', res[i].language, res[i].htmlUrl)}`)
        newElem.onclick = () => {
            location.pathname = `/repos/${store.userObject.getters.getName()}/${res[i].name}`
        }
        elem.appendChild(newElem)
    }
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
    return new Promise(function (resolve, reject) {
        setInterval(() => {
            if (store.repository.getters.getLoading() !== true && store.repository.getters.checkLoadingRepos() !== true) {
                resolve(store.repository.getters.getRepos())
            }
        }, 100)
    })
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
