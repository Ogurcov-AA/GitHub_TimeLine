import ChartsData from "../helper/ChartsData.js";

    function charts() {
        let html = `<div class="charts">
              <canvas id="myChart"></canvas>
            </div>
                <button id="test">2020</button>`
        return html
    }

    let chart
    const dataObj = new ChartsData()

    function chartSettings() {
        dataObj.sortDataForCharts()
        chartInitialization(dataObj.dataInitialization())
        setTittleInfo(dataObj.currentYear,dataObj.reposCount)

    }

    function setTittleInfo(currentYear,reposCount) {
        document.getElementsByClassName('charts')[0].insertAdjacentHTML('beforebegin',
            `<div class="repos-info">
                <h2>User activity in ${currentYear} (${reposCount} repositories)</h2>
                </div>`)
    }

    function chartInitialization(data){
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
