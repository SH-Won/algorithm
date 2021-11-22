const getParent = (parent,i) =>{
    if(parent[i] === i) return i;
    return parent[i] = getParent(parent,parent[i]);
}
const findParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a === b 
}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a > b ? parent[a] = b : parent[b] = a
}
const solution = (n,costs)=>{
    let totalCost = 0;
    let parent = Array(n).fill(0).map((v,i)=> i);
    costs.sort((a,b)=> a[2] - b[2]);
    for(let i=0; i<costs.length; i++){
        const [a,b,cost] = costs[i];
        if(!findParent(parent,a,b)){
            totalCost+=cost;
            unionParent(parent,a,b);
        }
    }
    return totalCost;
}
console.log(solution(4,[[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]));