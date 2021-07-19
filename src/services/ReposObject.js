export default class ReposObject{
    constructor(data) {
        this.list = [];
        data.forEach(item=>{
            this.list.push({
                id: item.id,
                name: item.name,
                language: item.language,
                created: item.created_at.slice(0,10),
                htmlUrl: item.html_url
            })
        })
    }
    getList(){
        return this.list
    }
}
