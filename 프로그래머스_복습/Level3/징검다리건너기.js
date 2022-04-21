const solution = (stones,k) =>{
    
    const isPossible = (mid) =>{
        let count = 0;
        for(let i=0; i<stones.length; i++){
            if(stones[i] < mid) count++;
            else count = 0;
            if(count >= k) return false;
        }
        return true;
    }
    let left = 0;
    let right = 200000000; 
    let friend ;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        if(isPossible(mid)){
            left = mid + 1;
            friend = mid;
        }
        else right = mid-1;
    }
    return friend;
}
console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1],3))