const solution = (n,m,x,y,queries) =>{
    let [startX,endX,startY,endY] = [x,x,y,y];
    const [LEFT,RIGHT,UP,DOWN] = [0,1,2,3];
    for(let i=queries.length-1; i>=0; i--){
        const [dir,dist] = queries[i];
        if(dir === LEFT){
            if(startY !== 0) startY = startY + dist;
            endY = endY + dist;
            if(endY > m-1) endY = m-1;
        }
        else if(dir === RIGHT){
            startY = startY - dist;
            if(startY < 0) startY = 0;
            if(endY !== m-1) endY = endY - dist;
        }
        else if(dir === UP){
            if(startX !==0) startX = startX + dist;
            endX = endX + dist;
            if(endX > n-1) endX = n-1;
        }
        else{
            startX = startX - dist;
            if(startX < 0) startX = 0;
            if(endX !== n-1) endX = endX - dist;
        }
        if(startX >=n || endX < 0 || startY >= m || endY < 0) return 0;
    }
    return (endX - startX + 1) * (endY - startY + 1);
}
// console.log(solution(2,2,0,0,[[2,1],[0,1],[1,1],[0,1],[2,1]]))
// console.log(solution(2,5,0,1,[[3,1],[2,2],[1,1],[2,3],[0,1],[2,1]]))
console.log(solution(2,2,0,1,[[1,1]]))
console.log(solution(10e9,10e9,0,10e9-1,[[1,10e9]]))
console.log(Math.pow(2,53)-1 > 10e9* 10e9)
