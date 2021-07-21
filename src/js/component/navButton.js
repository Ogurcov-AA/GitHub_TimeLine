export default function navButton(img, text, activeFlag = false){
    let html = `<div class="rectangle-button ${checkActive(activeFlag)}">
                    <img src="${img}" alt="">
                    <h4>${text}</h4>
                </div>`;
    return html;
}

function checkActive(flag){
    if(flag)
        return 'active'
    else
        return ''
}
