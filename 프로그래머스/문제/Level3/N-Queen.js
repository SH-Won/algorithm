const solution = (n) =>{
    let count = 0;
    let queen = Array(n); // 인덱스 x 값 y;
    //[0,0,0,0];
    const check = (cnt) =>{
        for(let i=cnt-1; i>=0; i--){
            if(queen[cnt] === queen[i]) return false;
            if(Math.abs(cnt-i) === Math.abs(queen[cnt] - queen[i])) return false;
        }
        return true;
    }
    const dfs = (cnt) =>{
        if(cnt === n){
              count++;
              return;
        }
        for(let i=0; i<n; i++){
            queen[cnt] = i;
            if(check(cnt)){
                dfs(cnt+1);
            }
        }
    }
    dfs(0);
    return count;
}