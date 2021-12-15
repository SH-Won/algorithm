const isPossible =(friends,stones,k) =>{
    let count = 0;
    for(let i=0; i<stones.length; i++){
        if(friends > stones[i]) count++;
        else count = 0;
        
        if(count >=k) return false;
    }
    return true;
}
const solution = (stones,k) =>{
     let left = 1;
     let right = 200000000;
     while(left < right-1){
         let mid = Math.floor((left+right) / 2);
         if(isPossible(mid,stones,k)) left = mid;
         else right = mid;
     }
     return left;
}
console.log(solution([2,4,5,3,2,1,4,2,5,1],3))