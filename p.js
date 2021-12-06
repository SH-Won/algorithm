// class Page{
//     constructor(url){
//         this.url = url;
//     }
//     render(data){
//         return console.log(data);
//     }
// }

// const page = new Page('test');
// const data = 'http';
// page.render(data);
const solution = (lines) =>{
    let logPoints = [];
    let startEndPoints = [];
    for(let i=0; i<lines.length; i++){
        const line = lines[i].split(' ');
        const [hour,minute,second] = line[1].split(':');
        const processTime = line[2].slice(0,-1);
        const end = 3600*hour + 60*minute + 1*second;
        const start = +(end - (1*processTime) + 0.001).toFixed(3)
        console.log(start,end);
        logPoints.push(start,end);
        startEndPoints.push([start,end]);
    }

}
solution([
    "2016-09-15 01:00:04.001 2.0s",
    "2016-09-15 01:00:07.000 2s"
    ])