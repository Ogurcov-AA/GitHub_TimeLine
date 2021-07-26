import navButton from "./navButton";

export default function leftMenu(userName, avatarUrl){
    let html = `<div class="left-side">
                    <div class="user-info">
                    <img class="user-image" src="${avatarUrl}" alt="">
                    <h4>${userName}</h4>
                    </div>
                        <nav class="left-menu">
                            <ul>
                            <li><a href="/users/${userName}/repos">
                            ${navButton("/img/repository.svg", "Repository", checkActiveButton('repos'))}
                            </a></li>
                            <li><a href="/users/${userName}/activity">
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
