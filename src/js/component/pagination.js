function pagination() {
    let html = `<div class="pagination-field">
                <form name="paginationRadio">     
                </form>
                </div>`;
    return html;
}

function calculatePage(allcount, per_page) {
    return Math.ceil(allcount / per_page);
}

function clearPaginationStreaks() {
    let elem = document.getElementsByName('paginationRadio')[0]
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

function createPaginationComp(allCount, per_page, pageActive, callback) {
    clearPaginationStreaks()
    let count = calculatePage(allCount, per_page)
    if (count <= 5) {
        startEndPagination(1, count, pageActive, per_page, callback)
    } else {
        if (pageActive - 2 <= 1) {
            startEndPagination(1, 5, pageActive, per_page, callback)
        } else if (pageActive - 2 > 1 && pageActive + 2 <= count) {
            startEndPagination(pageActive - 2, pageActive + 2, pageActive, per_page, callback)
        } else if (pageActive - 2 > 1 && pageActive + 2 - count === 1) {
            startEndPagination(pageActive - 3, pageActive + 1, pageActive, per_page, callback)
        } else if (pageActive - 2 > 1 && pageActive === count) {
            startEndPagination(pageActive - 4, pageActive, pageActive, per_page, callback)
        }
    }
}

function startEndPagination(start, end, pageActive, per_page, callback) {
    for (let i = start; i <= end; i++) {
        createElement(per_page, i, pageActive, callback)
    }
}

function createElement(per_page, index, pageActive, callback) {
    let newInput = document.createElement("input")
    let newLabel = document.createElement("label")

    if (index === pageActive) {
        newInput.checked = true
    }
    newInput.setAttribute('type', 'radio')
    newInput.setAttribute('id', `paginationRadio${index}`)
    newInput.setAttribute('name', 'pagination')

    newLabel.setAttribute('for', `paginationRadio${index}`)
    newLabel.textContent = index
    newLabel.onclick = () => {
        callback(per_page, Number(newLabel.textContent))
    }
    document.getElementsByName('paginationRadio')[0].appendChild(newInput)
    document.getElementsByName('paginationRadio')[0].appendChild(newLabel)
}

export {pagination, createPaginationComp}
