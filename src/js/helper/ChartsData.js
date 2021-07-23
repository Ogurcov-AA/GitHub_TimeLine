export default class ChartsData{
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
    currentYear = 2021;
    startData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    reposList

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
    getMinYear = ()=>{
       let min =  this.reposList.reduce((acc,item)=>{
           let year = this.parseDate(item.created)[0]
           return year>acc?acc:year
        },this.parseDate(this.reposList[0].created)[0])
    }

     sortDataForCharts = () => {
        this.reposList = store.repository.getters.getRepos();
        this.reposList.forEach(item => {
            let dateArr = this.parseDate(item.created)
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

    changeYear = (newYear) =>{
        this.currentYear = newYear;
        this.startData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.reposCount = 0
        this.sortDataForCharts()
        this.changeYearLabel()
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
