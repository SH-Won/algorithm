const solution = (distance,rocks,n) =>{
    rocks = [0,...rocks.sort((a,b) => a-b),distance];
    let left = 0;
    let right = rocks[rocks.length-1];
    let answer ;
    while(left <= right){
        const mid = Math.floor((left+right)/2);
        console.log(mid);
        let count = 0 , pre =0;
        for(let i=1; i<rocks.length; i++){
            if(rocks[i] - pre  < mid) count++;
            else pre = rocks[i];
            if(count > n) break;
        }
        if(count > n) right = mid - 1;
        else left = mid + 1 , answer = mid;
    }
    return answer;
}
// console.log(solution(25,[2,14,11,21,17],2))
console.log(solution(10,[1,5],1));