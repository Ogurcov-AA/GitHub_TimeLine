import store from "../store";

export default class ChartsData {
    MONTHS = [
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

    reposCount = 0;
    currentYear = new Date().getFullYear();
    startData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    reposList = []

    dataInitialization = () => {
        const data = {
            labels: this.MONTHS,
            datasets: [{
                label: 'Activity',
                data: this.startData,
                fill: true,
                borderColor: '#f25a7b',
                backgroundColor: '#783040',
            }]
        };
        return data
    }

    sortDataForCharts = () => {
        this.reposList = store.repository.getters.getReposByYearByYear();
        this.reposList.forEach(item => {
            let dateArr = this.parseDate(item.created_at.slice(0,10))
            if (this.checkYear(dateArr)) {
                this.reposCount++
                this.startData[Number(dateArr[1]) - 1]++
            }
        })
    }

    parseDate(date) {
        return date.split('-')
    }

    checkYear(date) {
        return Number(this.currentYear) === Number(date[0]);
    }

    changeYear = (newYear,callback) => {
        this.currentYear = newYear;
        this.startData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.reposCount = 0
        this.settings(newYear,callback)
    }

    settings = (year, callback) =>{
        store.repository.actions.getReposByYear(store.userObject.getters.getName(), year)
        let timer = setInterval(() => {
            if (store.repository.getters.checkLoadingReposByYear() !== true) {
                this.sortDataForCharts()
                this.changeYearLabel()
                callback()
                clearInterval(timer)
            }
        }, 100)
    }


    changeYearLabel() {
        let elem = document.getElementsByClassName('repos-info')
        elem[0].childNodes.forEach((item, index) => {
            if (item.nodeName === "H2") {
                let tempTextContent = item.textContent
                tempTextContent = tempTextContent.replace(/\d{4}/, this.currentYear)
                tempTextContent = tempTextContent.replaceAt(tempTextContent.match(/\(\d+/).index + 1,
                    tempTextContent.match(/\(\d+/)[0].length - 1, this.reposCount)
                item.textContent = tempTextContent
            }
        })
    }
}

String.prototype.replaceAt = function (index, length, replacement) {
    replacement = replacement.toString()
    return this.substr(0, index) + replacement + this.substr(index + length - 1 + replacement.length);
}
