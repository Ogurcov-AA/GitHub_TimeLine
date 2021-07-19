function charts() {
    let html = `<div class="charts">
          <canvas id="myChart"></canvas>
        </div>
            <div class="repos-info">
            <h4>User activity in ${currentYear}</h4>
            </div>
<button id="test">2020</button>`
    return html
}

let currentYear = 2021;
let startData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


function chartSettings() {
    document.getElementById('test').addEventListener('click', () => {
        changeYear(2020)
        chart.data.datasets[0].data = startData
        chart.update()
    })
    sortDataForCharts()
    const MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const labels = MONTHS
    const data = {
        labels: labels,
        datasets: [{
            label: 'Activity',
            data: startData,
            fill: true,
            borderColor: '#f25a7b',
            backgroundColor: '#783040',
        }]
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
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

function sortDataForCharts() {
    let reposList = store.repository.getters.getRepos()
    reposList.forEach(item => {
        let dateArr = parseDate(item.created)
        if (checkYear(dateArr)) {
            startData[Number(dateArr[1]) - 1]++
        }
    })
}

function parseDate(date) {
    return date.split('-')
}

function checkYear(date) {
    return Number(currentYear) === Number(date[0]);

}

function changeYear(newYear) {
    currentYear = newYear;
    startData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    sortDataForCharts()
    changeYearLabel()
}
function changeYearLabel(){
    let text;
    let elem = document.getElementsByClassName('repos-info')
    elem[0].childNodes.forEach((item,index)=>{
      if(item.nodeName === "H4") {
          item.textContent = item.textContent.match(/\D+/) + currentYear
      }
    })
}

export {charts, chartSettings}
