import startpage from '/src/js/pages/startPage.js'
import mainWindow from '/src/js/pages/repos.js'
import activity from '/src/js/pages/activity'
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};


const router = async () => {
    const routes = [
        { path: "/", view: startpage },
        { path: "/users/:user/repos", view: mainWindow},
        { path: "/users/:user/activity", view: activity},
    ]
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }
    document.querySelector("#app").innerHTML = await match.route.view();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});

export default router;
