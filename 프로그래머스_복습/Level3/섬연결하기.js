const getParent = (parent,a) =>{
    if(parent[a] === a) return a;
    return parent[a] = getParent(parent,parent[a]);
}
const isSameParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a === b;
}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a < b ? parent[b] = a : parent[a] = b;
}
const solution = (n,costs) =>{
    const parent = Array(n).fill().map((_,i) => i);
    costs.sort((a,b) => a[2]-b[2])
    let totalCost = 0;
    costs.forEach(([a,b,cost])=>{
        if(!isSameParent(parent,a,b)){
            unionParent(parent,a,b);
            totalCost += cost;
        }
    })
    return totalCost;
}