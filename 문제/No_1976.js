const input = ['3','3','0 1 0','1 0 1','0 1 0','1 2 3']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getParent = (parent,x) =>{
    if (parent[x] === x) return x;
    return parent[x] = getParent(parent,parent[x]);
}
const findParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a === b;
}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a < b ? parent[b] = a : parent[a] = b;
}

const solution = input =>{
    const N = +input[0];
    const info = Array.from({length:N},(_,i) => input[i+2].split(' ').map(Number));
    const path = input[2+N].split(' ').map(num => +num - 1);
    let parent = Array(N).fill().map((v,i) => i);
    for(let i=0; i<N; i++){
        for(let j=0; j<N; j++){
            if(info[i][j]){
                if(!findParent(parent,i,j)){
                   unionParent(parent,i,j);
                }
            }
        }
    }
    for(let i=0; i<path.length-1; i++){
        if(!findParent(parent,path[i],path[i+1])) return console.log("NO");
    }
    console.log("YES");
}
solution(input);