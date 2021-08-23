const input = [
    '5 6',
    '1',
    '5 1 1',
    '1 2 2',
    '1 3 3',
    '2 3 4',
    '2 4 5',
    '3 4 6'
]

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const stringToArr = (string) =>{
    return string.length > 0 ?
           string.split(' ').map(num =>+num) :
           parseInt(string);
}

const [V,E] = stringToArr(input[0]);
const start = stringToArr(input[1]);
let distance = Array(V+1).fill(Infinity);
let edge = Array.from({length:V+1},()=>[]);

for(let i=2; i<input.length; i++){
    const [from,to,weight] = stringToArr(input[i]);
    edge[from].push({to,weight});
    // edge[to].push({to:from,weight});
}
distance[start] = 0;

let queue = [{to:start,weight:0}];

while(queue.length) {
    const current = queue.pop();
    for(let i=0; i<edge[current.to].length; i++){
        const next = edge[current.to][i];
        if(distance[next.to] <= distance[current.to] + next.weight) continue;

        distance[next.to] = distance[current.to]+next.weight
        queue.push(next);
    }
    // edge[current.to].forEach(next =>{
    //     if(distance[next.to] > distance[current.to] + next.weight){
    //         distance[next.to] = distance[current.to]+next.weight
    //         queue.push(next);
    //     }
       
    // })
}
let answer =''
for(let i=1; i<distance.length; i++){
    if(distance[i] === Infinity) answer+='INF\n';
    else answer+=""+distance[i]+"\n"
}
console.log(answer.trim());
