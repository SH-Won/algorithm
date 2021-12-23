const check = (queen,x,y) =>{
    for(let nth=0; nth<y; nth++){
        if(queen[nth] === x) return false;
        if(Math.abs(y - nth) === Math.abs(queen[nth] - x)) return false;
    }
    return true;
}
const solution = (n) =>{
    let queen = Array(n); // 인덱스y  값x;
    let ways = 0;
    const putQueen = (count) =>{
        if(count === n){
            ways++;
            return;
        }
        for(let i=0; i<n; i++){
            if(check(queen,i,count)){
                queen[count] = i;
                putQueen(count+1);
            }
        }
    }
    putQueen(0);
    return ways;
}
console.log(solution(8));