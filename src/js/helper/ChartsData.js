import store from "../store";
import {getReposByYear} from './commonAsyncRequests'

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

    changeYear = async (newYear, callback) => {
        this.startData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.reposCount = 0
        if(await this.settings(newYear)) {
            this.currentYear = newYear;
            this.sortDataForCharts()
            callback()
        }
    }

    settings = async (year) =>{
        try {
            await getReposByYear(year)
            return true
        }catch (e) {
            alert("Error connection")
            return false
        }
    }

}

