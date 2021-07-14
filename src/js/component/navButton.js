export default function navButton(img, text){
    let html = `<div class="rectangle-button">
                    <img src="${img}" alt="">
                    <h4>${text}</h4>
                </div>`;
    return html;
}
