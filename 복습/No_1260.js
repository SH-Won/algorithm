// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// dfs 는 재귀를 이용 bfs 는 재귀 x
// dfs 는 최단거리를 보장해주지 않는다.
// dfs 는 말그대로 깊이 우선 탐색
// dfs 의 경우 1 -> 2 , 1 -> 3 , 1 -> 4 로  갈 수 있다면,
// 처음 1 -> 2 로 간후에 2 의 경우에서 계속 깊숙히 들어간다.
// bfs 의 경우 1 -> 2 , 1 -> 3 , 1 -> 4 라면,
// 2의 경우가 queue 뒤에 추가되고, 3의 경우가 queue 뒤에 추가된다.
// dfs 처럼  2에서 계속 깊어지는 것이 아니라, 1 에서 갈수 있는 가능한 경우를 모두 탐색하고 다음으로 넘어간다.

const input =[
    '4 5 1',
    '1 2',
    '1 3',
    '1 4',
    '2 4',
    '3 4'
]
const [N,M,V] = stringToNumberArr(input[0]);
const arr = Array.from({length:M},(_,i)=>stringToNumberArr(input[i+1]));
let graph = Array.from({length:N+1},()=>[]);
let visited = Array.from(N+1).fill(false);
let result =[];

for(let i=0; i<arr.length; i++){
    insertGrape(arr[i][0],arr[i][1]);
    insertGrape(arr[i][1],arr[i][0]);
}
dfs(V);
console.log(result.join(' ').trim());
result = [];
visited.fill(false);

bfs(V);
console.log(result.join(' ').trim());




function dfs(V){
    if(visited[V]) return;

    visited[V] =true;
    result.push(V);
    for(let i=0; i<graph[V].length; i++){
        dfs(graph[V][i]);
    }

}
function bfs(V){
    let queue = [V];
    let endPoint;

    while(queue.length){
        
        endPoint =queue.shift();
        
        if(visited[endPoint]){
            continue;
        }

        visited[endPoint]= true;
        result.push(endPoint);

        for(let i=0; i<graph[endPoint].length; i++){
           if(!visited[graph[endPoint][i]])
            queue.push(graph[endPoint][i]);
        }

    }
}



function stringToNumberArr(arr){
    return arr.split(' ').map(num => +num);
}

function insertGrape(num1,num2){
    let index ;
    for(index=0; index<graph[num1].length; index++){
        if(num2 > graph[num1][index])
          continue;
        if(num2 === graphp[num1][index])
          index = null;

    }
    if(index !==null){
        graph[num1].splice(index,0,num2);
    }

}