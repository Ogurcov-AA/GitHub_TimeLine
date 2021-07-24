export default function reposCard(reposName,reposDescription,reposLanguage, reposURL){
    let html = `<div class="nameSize">
                    <h2 class="reposName">${reposName}<a href="${reposURL}" class="reposName">🔗</a></h2>
                    </div>
                            <div class="reposLanguage">
                            <div class="circle other ${reposLanguage?.toLowerCase()}"></div>
                            <h4 class="reposLanguageText">${reposLanguage}</h4>
                            </div>
                `;
    return html;
}
