import ChartsData from "../helper/ChartsData.js";

function charts() {
    let html = `<div class="activity-field">
                    <div class="charts-wrapper">
                        <div class="charts">
                            <canvas id="myChart"></canvas>
                        </div>
                        <div class="input-number">
                            <div class="input-number__minus coup">&#10162</div>
                                <input class="input-number__input" type="number" readonly min="${minYear}" max="${new Date().getFullYear()}" value="${new Date().getFullYear()}">
                            <div class="input-number__plus">&#10162</div>
                        </div>
                    </div>
                    <div class="reposList">
                        <ul id="reposChartsLink">      
                        </ul>
                    </div>
                </div>`
    return html
}

let chart
const dataObj = new ChartsData()
let minYear = 1995

function chartSettings() {
    dataObj.sortDataForCharts()
    showLoadedItems()
    chartInitialization(dataObj.dataInitialization())
    setTittleInfo(dataObj.currentYear, dataObj.reposCount)
    createReposNamesTable()
    addEventForMinus()
    addEventForPlus()
}

function showLoadedItems() {
    checkReposTableForEmpty()
    document.getElementsByClassName('input-number')[0].style.visibility = 'visible'
}

function checkReposTableForEmpty() {
    if (dataObj.reposList.length > 0)
        document.getElementsByClassName('reposList')[0].getElementsByTagName('ul')[0].style.visibility = 'visible'
    else document.getElementsByClassName('reposList')[0].getElementsByTagName('ul')[0].style.visibility = 'hidden'
}

function createReposNamesTable() {
    let ulElement = document.getElementById('reposChartsLink')
    removeAllElemChild(ulElement)
    dataObj.reposList.forEach(item => {
        let newElement = document.createElement('a')
        newElement.setAttribute('href', `/repos/${store.userObject.getters.getName()}/${item.name}`)
        newElement.textContent = item.name
        let liElement = document.createElement('li')
        liElement.appendChild(newElement)
        ulElement.appendChild(liElement)
    })
}

function removeAllElemChild(elem){
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild)
    }
}


function addEventForMinus() {
    document.getElementsByClassName('input-number__minus')[0].onclick = () => {
        plusMinusYear(false)
    }
}

function addEventForPlus() {
    document.getElementsByClassName('input-number__plus')[0].onclick = () => {
        plusMinusYear(true)
    }
}

 function plusMinusYear(isPlus) {
    let elem = document.getElementsByClassName('input-number__input')[0]
    let nextYear
    if (isPlus && elem.value < (new Date().getFullYear()))
        nextYear = Number(elem.value) + 1
    else if (!isPlus && elem.value > minYear)
        nextYear = Number(elem.value) - 1
    dataObj.changeYear(nextYear, ()=> chartsUpdate(elem))
}

function chartsUpdate(elem){
    console.log("+")
    chart.data.datasets[0].data = dataObj.startData
    chart.update()
    elem.value = dataObj.currentYear
    createReposNamesTable()
    changeYearLabel()
    checkReposTableForEmpty()
}

function changeYearLabel() {
    let elem = document.getElementsByClassName('repos-info')
    elem[0].childNodes.forEach((item, index) => {
        if (item.nodeName === "H2") {
            let tempTextContent = item.textContent
            tempTextContent = tempTextContent.replace(/\d{4}/, dataObj.currentYear)
            tempTextContent = tempTextContent.replaceAt(tempTextContent.match(/\(\d+/).index + 1,
                tempTextContent.match(/\(\d+/)[0].length - 1, dataObj.reposCount)
            item.textContent = tempTextContent
        }
    })
}


String.prototype.replaceAt = function (index, length, replacement) {
    replacement = replacement.toString()
    return this.substr(0, index) + replacement + this.substr(index + length - 1 + replacement.length);
}

function setTittleInfo(currentYear, reposCount) {
    document.getElementsByClassName('charts')[0].insertAdjacentHTML('beforebegin',
        `<div class="repos-info">
                <h2>User activity in ${currentYear} (${reposCount} repositories)</h2>
                </div>`)
}

function chartInitialization(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: {
                    grid: {
                        color: "#484848"
                    }
                },
                yAxes: {
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        },
                    },
                    grid: {
                        color: "#484848"
                    }
                }
            }
        }
    });
}

export {charts, chartSettings}
