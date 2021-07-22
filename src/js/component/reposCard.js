export default function reposCard(reposName,reposDescription,reposLanguage, reposURL, size){
    let html = `<div class="cardRectangle ${size}">
                    <div class="nameSize">
                    <h2><a href="${reposURL}" class="reposName">${reposName}</a></h2>
                    </div>
                    <h4 class="reposDescription">${reposDescription}</h4>
                            <div class="reposLanguage">
                            <div class="circle other ${reposLanguage.toLowerCase()}"></div>
                            <h4 class="reposLanguageText">${reposLanguage}</h4>
                            </div>
                </div>`;
    return html;
}
