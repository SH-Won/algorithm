// binary search;
const solution = (n,times) =>{
    times.sort((a,b) => a-b);
    let left = 0;
    let right = times[times.length-1] * n;
    let answer ;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        let count = 0;
        for(let i=0; i<times.length; i++){
            const people = Math.floor(mid / times[i]);
            count +=people ;
            if(count >= n) break;
        }
        if(count >= n){
            right = mid - 1;
            answer = mid;
        }
        else left = mid + 1;
    }
    return answer;
}
console.log(solution(6,[7,10]));