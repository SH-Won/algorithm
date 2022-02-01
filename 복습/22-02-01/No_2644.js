// const input = ['9','7 3','7','1 2','1 3','2 7','2 8','2 9','4 5','4 6']
const input = ['9','8 6','7','1 2','1 3','2 7','2 8','2 9','4 5','4 6']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getVillager = (relation,edge) =>{
    let count = Array(edge.length).fill(Infinity);
    count[relation[0]] = 0;
    let queue = [relation[0]];
    while(queue.length){
        const cur = queue.shift();
        if(cur === relation[1]) return console.log(count[cur]);
        for(let i=0; i<edge[cur].length; i++){
            const next = edge[cur][i];
            if(count[next] <= count[cur] + 1) continue;
            queue.push(next);
            count[next] = count[cur] + 1;
        }
    }
    console.log(-1);
}
const solution = (input) =>{
    const n = +input[0];
    const relation = input[1].split(' ').map(Number);
    const m = +input[2];
    const edge = Array.from({length:n+1},()=>[]);
    for(let i=3; i<3+m; i++){
        const [parent,child] = input[i].split(' ').map(Number);
        edge[parent].push(child);
        edge[child].push(parent); 
    }
    return getVillager(relation,edge);
}
solution(input);