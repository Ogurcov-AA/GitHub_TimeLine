import store from '../store/index'
import {addLeftMenu,parseURLGetName} from '../helper/commonAsyncRequests'

export default async function getHtml() {
    let html
   try {
       let res = await getRepos()
       createReposInfo(res)
    html = `<div class="main-field">
                    <div class="about-repos">
                    <h1 class="back-button">⮰</h1>
                       <div  class="repos-info">
                        <div class="repos-mainInfo">
                            <h1><a href="/users/${reposInfo.ownerLogin}/repos">${reposInfo.ownerLogin}</a>/${reposInfo.name}
                            <a href="${reposInfo.htmlUrl}">🔗</a></h1>
                                <div class="about-repos-description">
                                    <h3>description: ${reposInfo.description}</h3>
                                </div>
                                <div class="service-info">
                                    <p>watchers: ${reposInfo.watchers}</p>
                                    <p>default_branch: ${reposInfo.defaultBranch}</p>
                                    <p>created: ${reposInfo.created}</p>
                                    <p>updated_at: ${reposInfo.updated}</p>
                                    <p>pushed_at: ${reposInfo.pushed}</p>
                                </div>
                        </div>
                        <div class="repos-lang">
                          <p>main language: ${reposInfo.lang}</p>
                               <p class="secLang">secondary languages:</p>
                              <ul name="reposLanguages">
                              
                               </ul>
                        </div>
                       </div>
                    </div>    
               </div>`;
       addLeftMenu()
    }
   catch (e){
       html = `<div class="error-loading"><h1>Erorr UserName or RepositoryName</h1>
               </div>`
   }
    return html;
}
if(location.pathname === location.pathname.match('\/repos/[a-zA-z0-9-_.*+?^${}()|[\\]\\\\]+/[a-zA-z0-9-_.*+?^${}()|[\\]\\\\]+')?.[0])
{
    window.onload = () => {
        setSecondaryLangHTML()
    }
}

let reposInfo = {
    ownerLogin: null,
    name: null,
    description: null,
    watchers: null,
    defaultBranch: null,
    created: null,
    updated: null,
    pushed: null,
    lang: null,
    htmlUrl: null,
    language: [{
        lang: null
    }]

}

function getRepos() {
    store.repository.actions.getRepository(parseURLGetName(), location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
    let promise = new Promise(function (resolve, reject) {
        let timer = setInterval(() => {
            if (store.repository.getters.getLoading() !== true && store.repository.getters.checkLoadingRepos() !== true) {
                resolve(store.repository.getters.getReposInfo())
                clearInterval(timer)
            }
            else if(store.repository.getters.checkLoadingRepos()){
                reject("error userName or Repository")
                clearInterval(timer)
            }
        }, 100)
    })
    return promise
}

function createReposInfo(res) {
    console.log(res)
    reposInfo.ownerLogin = res.owner.login
    reposInfo.name = res.name
    reposInfo.description = res.description
    reposInfo.created = res.created_at.slice(0, 10)
    reposInfo.updated = res.updated_at.slice(0, 10)
    reposInfo.pushed = res.pushed_at.slice(0, 10)
    reposInfo.watchers = res.watchers
    reposInfo.defaultBranch = res.default_branch
    reposInfo.lang = res.language
    reposInfo.htmlUrl = res.html_url
}

function createReposInfoLang(res) {
    reposInfo.language = res
}

function getLang() {
    store.repository.actions.getReposLang(parseURLGetName(), location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
    let timer = new Promise(function (resolve, reject) {
        setInterval(() => {
            if (store.repository.getters.getLoading() !== true && store.repository.getters.checkLoadingRepos() !== true) {
                resolve(store.repository.getters.getReposLang())
            }
        }, 100)
    })
    return timer
}

async function setSecondaryLangHTML(){
    await getLang().then(res => createReposInfoLang(res))
    let elem = document.getElementsByName('reposLanguages')
    for (let item in reposInfo.language) {
        elem[0]?.insertAdjacentHTML('beforebegin',
            `<li><div class="circle other ${item.toLowerCase()}"></div>${item}</li>`)
    }
    clickBackButton()
}

function clickBackButton(){
    document.getElementsByClassName('back-button')[0].onclick= () => {
        history.back()
    }
}
