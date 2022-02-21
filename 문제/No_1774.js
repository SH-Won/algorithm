const input = ['4 1','1 1','3 1','2 3','4 3','1 4']
// const fs =require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const getParent = (parent,x) =>{
    if(parent[x] === x) return x;
    return parent[x] = getParent(parent,parent[x]);
}
const findParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a === b;
}
const unionParent = (parent,a,b)=>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a < b ? parent[b] = a : parent[a] = b;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const gods = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    const linked = Array.from({length:M},(_,i)=>input[i+1+N].split(' ').map(num => +num -1));
    const path = [];
    let parent = Array(N).fill().map((v,i) => i);
    for(let i=0; i<gods.length-1; i++){
        const [x1,y1] = gods[i];
        for(let j=i+1; j<gods.length; j++){
            const [x2,y2] = gods[j];
            const distance = Math.sqrt(Math.abs(x1-x2)**2 + Math.abs(y1-y2)**2);
            path.push({from:i,to:j, distance});
        }
    }
    let dist = 0;
    for(let i=0; i<linked.length; i++){
        const [god1,god2] = linked[i];
        const [x1,y1,x2,y2] = [...gods[god1],...gods[god2]];
        const distance = Math.sqrt(Math.abs(x1-x2)**2 + Math.abs(y1-y2)**2);
        unionParent(parent,god1,god2);
    }
    path.sort((a,b) => a.distance - b.distance);
    for(let i=0; i<path.length; i++){
        const {from,to,distance} = path[i];
        if(!findParent(parent,from,to)){
            unionParent(parent,from,to);
            dist += distance;
        }
    }
    console.log(dist.toFixed(2));
}
solution(input);