const input = ['3 3','1 2 2','3 1 3','2 3 2','1 3'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMaxWeight = (start,end,maxDist,edge) =>{
    let left = 1;
    let right = maxDist;
    let dist = Array(edge.length).fill(Infinity);
    let answer = 0;
    while(left <= right){
        const mid = Math.floor((left+right)/2);
        let flag = false;
        dist.fill(Infinity);
        dist[start] = 0;
        let queue = [start];
        while(queue.length){
            const node = queue.shift();
            if(node === end){
                flag = true;
                break;
            }
            for(let i=0; i<edge[node].length; i++){
                const [next,d] = edge[node][i];
                if(d < mid || dist[next] <= d) continue;
                queue.push(next);
                dist[next] = d;
            }
        }
        if(flag) left = mid+1 , answer = mid;
        else right = mid-1;
    }
    return answer;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    const [start,end] = input[M+1].split(' ').map(Number);
    let maxDist = 0;
    for(let i=1; i<M+1; i++){
        const [from,to,dist] = input[i].split(' ').map(Number);
        edge[from].push([to,dist]);
        edge[to].push([from,dist]);
        if(dist > maxDist) maxDist = dist;
    }
    const answer = getMaxWeight(start,end,maxDist,edge);
    console.log(answer);
}
solution(input);