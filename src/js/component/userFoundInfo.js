export default function userFoundComponent(avatar, name){
    let html = `<div class="user-search-rectangle">
                    <img src="${avatar}" alt="">
                    <h4>${name}</h4>
                </div>`;
    return html;
}
