import navButton from "../component/navButton";

export default async function getHtml() {
    let html = `<div class="left-side">
                    <div class="user-info">
                    <img class="user-image" src="data:image/jpeg;base64,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" alt="">
                    <h4>Name SurnName</h4>
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
