const check = (stones,mid,k) =>{
    let count = 0;
    for(let i=0; i<stones.length; i++){
        if(stones[i] < mid) count++;
        else count = 0;
        if(count >= k ) return false;
    }
    return true;
}
const solution = (stones,k) => {
    let left = 1;
    let right = 200000000;
    let friends;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        if(check(stones,mid,k)){
            left = mid +1;
            friends = mid;
        }
        else right = mid -1;
    }
    return friends;
}
