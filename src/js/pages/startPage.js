import userFoundComponent from '/src/js/component/userFoundInfo'

export default async function getHtml() {
    let html = `<div class="startPage">
                        <h1>GitHub TimeLine</h1>
                        <div class="search-field">
                                <h2>Enter UserName</h2>
                                <input type="text" placeholder="Username"/>
                        </div>
                </div>`;
    return html
}

addEventListener('keydown', () => {
    let elem = document.getElementsByTagName('input')[0]
    elem.oninput = function () {
        store.userObject.actions.getUserInfo(elem.value)
            .then(res => {
                removeComponentFoundUser(elem)
                addComponentFoundUser(elem)
            })
            .catch(rej => {
                removeComponentFoundUser(elem)
            })
    }
})

function addComponentFoundUser(elem) {
    document.getElementsByClassName('startPage')[0].insertAdjacentHTML("beforeend",
        `<div class="search-user">
                            ${userFoundComponent(store.userObject.getters.getAvatar(), store.userObject.getters.getName())}
                        </div>`)

    document.getElementsByClassName('user-search-rectangle')[0].onclick = function () {
        location.pathname = `/${store.userObject.getters.getName()}`
    }
}

function removeComponentFoundUser(elem) {
    if (document.getElementsByClassName('search-user').length > 0 || elem.value === "")
        document.getElementsByClassName('search-user')[0].remove()
}

