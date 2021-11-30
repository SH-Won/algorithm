class Page{
    constructor(url){
        this.url = url;
    }
    render(data){
        return console.log(data);
    }
}

const page = new Page('test');
const data = 'http';
page.render(data);