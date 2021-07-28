const fs =require('fs');
const input =fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input = [
//     '7','6','1 2','2 3','1 5','5 2','5 6','4 7'
// ]
const [N,V] = [+input[0],+input[1]];
const arr = Array.from({length:V},(_,i)=>input[i+2].split(' ').map(num => +num));
let graph = Array.from({length:N+1},()=>[]);
let visited =Array(N+1).fill(false);
let count =0;
arr.forEach(([num1,num2]) =>{
    insertGraph(num1,num2);
    insertGraph(num2,num1);
});
bfs(1);
console.log(count-1);

function bfs(start){
    let willVisited = [start];
    let current;
    while(willVisited.length > 0 ){
        current= willVisited.shift();

        if(visited[current]) continue;

        visited[current]=true;
        count++;
        graph[current].forEach(computer => {
            if(!visited[computer])
             willVisited.push(computer)
        })
    }


}

function insertGraph(num1,num2){
    let index;
    for(index=0; index<graph[num1].length; index++){

        if(num2 > graph[num1][index]) continue;

        if(num2 === graph[num1][index]) index=null;

        break;
    }
    if(index !==null){
        graph[num1].splice(index,0,num2);
    }
}