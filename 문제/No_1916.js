//const input = ['5','8','1 2 2','1 3 3','1 4 1','1 5 10','2 4 2','3 4 1','3 5 1','4 5 3','1 5']
const input = [
'7',
'12',
'1 2 7',
'1 5 3',
'1 6 10',
'5 2 2',
'2 6 6',
'2 3 4',
'2 4 10',
'5 7 5',
'5 4 11',
'3 4 2',
'6 4 9',
'7 4 4',
'1 3'
]   // '1 4' ans 11 '1 2' ans 5 '1 3' ans 9
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const N = +input[0];
const M = +input[1];
const busInfo = Array.from({length:M},(_,i)=>input[i+2].split(' ').map(Number));
const [start,end] = input[M+2].split(' ').map(Number);

const getMinCost = (start,end,edge,costMap) =>{
    costMap[start][start] = 0;
    let queue = [[start,0]], idx = 0;
    while(idx < queue.length){
        const [current,cost] = queue[idx++];
        for(let i=0; i<edge[current].length; i++){
            const [next,addCost] = edge[current][i];
            if(costMap[start][next] > cost+addCost){
                queue.push([next,cost+addCost]);
                costMap[start][next] = cost+addCost;
                costMap[next][start] = cost+addCost;
            }
        }
    }
    console.log(costMap);
    return costMap[start][end];
}
const solution = () =>{
    let costMap = Array.from({length:N+1},()=>Array(N+1).fill(Infinity));
    let edge = Array.from({length:N+1},()=>[]);
    for(let i=0; i<busInfo.length; i++){
        const [from,to,cost] = busInfo[i];
        edge[from].push([to,cost]);
        
    }
    const answer = getMinCost(start,end,edge,costMap);
    console.log(answer);
}
solution();