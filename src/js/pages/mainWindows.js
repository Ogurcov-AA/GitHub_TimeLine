import navButton from "../component/navButton";
import {charts,chartSettings} from "../component/charts";

export default async function getHtml() {
    let html = `<div class="left-side">
                    <div class="user-info">
                    <img class="user-image" src="${store.userObject.getters.getAvatar()}" alt="">
                    <h4>${store.userObject.getters.getName()}</h4>
                    </div>
                        <nav class="left-menu">
                            <ul>
                            <li>${navButton("img/repository.svg", "Repository")}</li>
                            <li>${navButton("img/activity.svg", "Activity")}</li>
                            </ul>                        
                        </nav>
                </div>
                <div class="main-field">
               ${charts()}
               <div class="loading">loading</div>
               </div>
                </div>`;
    return html;
}

window.onload = function (){
store.repository.actions.getRepositoryInfo(store.userObject.getters.getName(),10,1)
    let timer = setInterval(()=>{
        if(store.repository.getters.getLoading()!==true && store.repository.getters.checkLoadingRepos()!==true){
            chartSettings();
            clearInterval(timer)
            document.getElementsByClassName('loading')[0].remove()
    }else{

        }
    },100)

}
function checkLoadingData(){

}

