const check = (mid,k,stones) =>{
    let count = 0;
    for(let i=0; i<stones.length; i++){
        if(mid <= stones[i]) count = 0;
        else count++;
        if(count >= k) return false;
    }
    return true;
}
const solution = (stones,k) =>{
    let left = 1 , right = 200000000;
    while(left < right-1){
        const mid = (left+right) /2 >> 0 ;
        if(check(mid,k,stones)) left = mid;
        else right = mid;
    }
    return left;
}