const input = ['5','11 -15 -15','14 -5 -15','-1 -1 -5','10 -4 -1','19 -4 19'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getParent = (parent,i) =>{
    if(parent[i] === i) return i;
    return parent[i] = getParent(parent,parent[i]);
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
    const pos = Array.from({length:N},(_,i)=>{
        const [x,y,z] = input[i+1].split(' ').map(Number);
        return {x,y,z,number:i};
    });
    const tunnel = [];
    const parent = Array(N).fill().map((_,i) => i);
    pos.sort((a,b) => a.x - b.x);
    for(let i=0; i<pos.length-1; i++){
        const {x:x1, y:y1 , z:z1 , number : number1} = pos[i];
        const {x:x2, y:y2, z:z2, number : number2} = pos[i+1];
        const min = Math.min(Math.abs(x1-x2),Math.abs(y1-y2),Math.abs(z1-z2));
        tunnel.push({from:number1,to:number2,cost:min});
    }
    pos.sort((a,b) => a.y - b.y);
    for(let i=0; i<pos.length-1; i++){
        const {x:x1, y:y1 , z:z1 , number : number1} = pos[i];
        const {x:x2, y:y2, z:z2, number : number2} = pos[i+1];
        const min = Math.min(Math.abs(x1-x2),Math.abs(y1-y2),Math.abs(z1-z2));
        tunnel.push({from:number1,to:number2,cost:min});
    }
    pos.sort((a,b) => a.z - b.z);
    for(let i=0; i<pos.length-1; i++){
        const {x:x1, y:y1 , z:z1 , number : number1} = pos[i];
        const {x:x2, y:y2, z:z2, number : number2} = pos[i+1];
        const min = Math.min(Math.abs(x1-x2),Math.abs(y1-y2),Math.abs(z1-z2));
        tunnel.push({from:number1,to:number2,cost:min});
    }
    tunnel.sort((a,b) => a.cost - b.cost);
    let minCost = 0;
    let count = 0;
    for(let i=0; i<tunnel.length; i++){
        const {from,to,cost} = tunnel[i];
        if(!findParent(parent,from,to)){
            unionParent(parent,from,to);
            minCost += cost;
            count++;
        }
        if(count === N-1) break;
    }
    console.log(minCost);
}
solution(input)