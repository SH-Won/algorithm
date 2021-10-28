const input = [
'7 6',
'8',
'1 2 1 2 2',
'2 1 1 5 1',
'6 7 3 7 6',
'7 2 1 2 6',
'3 3 2 6 2',
'4 5 6 5 1',
'5 1 5 7 5',
'8 3 5 6 5',
'2 1 7 4'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Bus {
    constructor(x1,y1,x2,y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}
const bfs = (sx,sy,dx,dy,bus) =>{
    let visited = Array(bus.length).fill(0);
    let queue = [];
    for(let i=0; i<bus.length; i++){
        if(bus[i].isArrival(sx,sy)){
            queue.push(i);
            visited[i] = 1;
        }
    }
    while(queue.length){
        const index = queue.shift();
        if(bus[index].isArrival(dx,dy)) return visited[index];
        for(let i=0; i<bus.length; i++){
            if(visited[i]) continue;
            if(bus[index].isTransferable(bus[i])){
                visited[i] = visited[index] +1
                queue.push(i);
            }
        }
    }
}

const solution = () =>{
    let index = 0;
    const [x,y] = input[index++].split(' ').map(Number);
    const busCount = +input[index++];
    const busInfo = Array.from({length:busCount},()=>{
        let [num,x1,y1,x2,y2] = input[index++].split(' ').map(Number);
        let temp ;
        if(x1 > x2){
            temp = x1;
            x1 = x2;
            x2 = temp;
        }
        if(y1 > y2){
            temp = y1;
            y1 = y2;
            y2 = temp;
        }
        return new Bus(x1,y1,x2,y2);
    })
    Bus.prototype.isTransferable =function(bus){ return (bus.x1 <=this.x2 && bus.x2 >= this.x1 && bus.y1 <= this.y2 && bus.y2 >= this.y1)};
    Bus.prototype.isArrival =function(dx,dy) { return( dx >=this.x1 && dx <=this.x2 && dy >=this.y1 && dy <=this.y2)};
    
    const [sx,sy,dx,dy] = input[index].split(' ').map(Number);
    const answer = bfs(sx,sy,dx,dy,busInfo);
    console.log(answer);
}
solution();