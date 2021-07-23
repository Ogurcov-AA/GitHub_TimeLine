import ChartsData from "../helper/ChartsData.js";

function charts() {
    let html = `<div class="charts">
              <canvas id="myChart"></canvas>
            </div>
                            <div class="input-number">
                                <div class="input-number__minus coup">&#10162</div>
                                    <input class="input-number__input" type="number" readonly min="1995" max="${new Date().getFullYear()}" value="${new Date().getFullYear()}">
                                <div class="input-number__plus">&#10162</div>
                            </div>`
    return html
}

let chart
const dataObj = new ChartsData()

function chartSettings() {
    dataObj.sortDataForCharts()
    chartInitialization(dataObj.dataInitialization())
    setTittleInfo(dataObj.currentYear, dataObj.reposCount)
    addEventForMinus()
    addEventForPlus()

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
            if (isPlus && elem.value<(new Date().getFullYear()))
                elem.value++
            else if(!isPlus && elem.value>1995)
                elem.value--
    dataObj.changeYear(Number(elem.value))
    chart.data.datasets[0].data = dataObj.startData
    console.log(chart.data.datasets[0].data)
    chart.update()
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
