import navButton from "../component/navButton";

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
                </div>`;
    return html;
}
