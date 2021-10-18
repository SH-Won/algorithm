const dx = [0,0,-1,1];
const dy = [-1,1,0,0];
const solution = (n,m,x,y,queries) =>{
    let [mx,my] =[0,0];
    for(let i=0; i<queries.length; i++){
        const [command,d] = queries[i];
        [mx,my] = [mx+dx[command]*d,my+dy[command]*d];
    }
    // const ax = x===0 ? x-mx > n-1 ? m; 

}