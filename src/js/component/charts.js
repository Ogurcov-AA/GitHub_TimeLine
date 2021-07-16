function charts() {
    let html = `<div class="charts">
            <div>
            <h4>User activity in 2021</h4>
</div>
          <canvas id="myChart"></canvas>
        </div>`
    return html
}

function chartSettings() {
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
            data: [5, 3, 0, 4, 3, 2, 1, 3, 2, 0, 0, 0, 5, 0, 0],
            fill: true,
            borderColor: '#f25a7b',
            backgroundColor: '#783040',
        }]
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    console.log("ctx", ctx)
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
                    grid: {
                        color: "#484848"
                    }
                }
            }
        }
    });
}

export {charts, chartSettings}
