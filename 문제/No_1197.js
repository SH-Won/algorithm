const input = ['3 3','1 2 1','2 3 2','1 3 3'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [V,E] = input[0].split(' ').map(Number);
const path = Array.from({length:E},(_,i)=>{
    const [from,to,weight] = input[i+1].split(' ').map(Number);
    return {from,to,weight};
}).sort((a,b)=>a.weight -b.weight);
let parent = Array(V+1).fill(0).map((num,index)=>num=index);
let sum = 0;
const getParent = (parent,i) =>{
    if(parent[i] === i) return i;
    return parent[i] =getParent(parent,parent[i]);

}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    if(a < b) parent[b] = a;
    else parent[a] = b
}
const findParent = (a,b)=>{
    a=getParent(parent,a);
    b=getParent(parent,b);
    return a===b ? true : false;
}
for(let i=0; i<path.length; i++){
    const {from,to,weight} = path[i];
    if(!findParent(from,to)){
        sum+=weight;
        unionParent(parent,from,to);
    }
}
console.log(sum);