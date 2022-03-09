const getParent = (parent,i) =>{
    if(parent[i] === i) return i;
    return parent[i] = getParent(parent,parent[i]);
}
const isSameParent = (parent,a,b) => {
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a === b;
}
const unionParent = (parent,a,b)=>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a > b ? parent[a] = b : parent[b] = a;
}
const solution = (n,costs) =>{
    const parent = Array(n).fill().map((v,i) => i);
    costs.sort((a,b) => a[2] - b[2]);
    let minCosts = 0;
    for(let i=0; i<costs.length; i++){
        const [a,b,cost] = costs[i];
        if(!isSameParent(parent,a,b)){
            unionParent(parent,a,b);
            minCosts += cost;
        }
    } 
    return minCosts;
}