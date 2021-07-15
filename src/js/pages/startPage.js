export default async function getHtml() {
    let html = `<div class="startPage">
                        <h1>GitHub TimeLine</h1>
                        <div class="search-field">
                                <h2>Enter UserName</h2>
                                <input type="text" class="search-user" placeholder="Username"/>
                        </div>
                </div>`;
    return html
}

addEventListener('keydown',()=> {
    let elem = document.getElementsByTagName('input')[0]
    elem.oninput = function (){
        window.store.userObject.actions.getUserInfo(elem.value).then(res=>{}).catch(rej=>{})
    }
})


