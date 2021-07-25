import navButton from "./navButton";
import store from "../store";

export default function leftMenu(){
    let html = `<div class="left-side">
                    <div class="user-info">
                    <img class="user-image" src="${store.userObject.getters.getAvatar()}" alt="">
                    <h4>${store.userObject.getters.getName()}</h4>
                    </div>
                        <nav class="left-menu">
                            <ul>
                            <li><a href="/users/${store.userObject.getters.getName()}/repos">
                            ${navButton("/img/repository.svg", "Repository", checkActiveButton('repos'))}
                            </a></li>
                            <li><a href="/users/${store.userObject.getters.getName()}/activity">
                            ${navButton("/img/activity.svg", "Activity",checkActiveButton('activity'))}
                            </a></li>
                             <li><a href="/">
                            ${navButton("/img/logout.svg", "Exit")}
                            </a></li>
                            </ul>                        
                        </nav>
                </div>`
    return html
}

function checkActiveButton(buttonName){
    return location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === buttonName;
}
