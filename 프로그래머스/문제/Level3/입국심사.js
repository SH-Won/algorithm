const solution = (n,times) =>{
    times.sort((a,b)=> a - b);
    let left = 1;
    let right = n * times[times.length-1];
    let minTime = right;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        let count = 0;
        for(let i=0; i<times.length; i++){
            count+= Math.floor(mid/times[i]);
            if(count >= n){
                minTime = Math.min(minTime,mid);
                break;
            }
        }
        if(count >=n) right = mid - 1;
        else left = mid + 1; 
    }
    return minTime;
}
// const solution = (n,times) =>{
//     times.sort((a,b) => a-b);
//     let left = 0;
//     let right = n * times[times.length -1];
//     let mid = Math.floor((left+right) / 2);
//     while(left <= right){
//         let count = times.reduce((acc,cur) => acc+= Math.floor(mid/cur),0);
//         if(count >=n) right = mid -1;
//         else left = mid + 1;
//         mid = Math.floor((left+right) / 2);
//     }
//     return left;
// }
console.log(solution(6,[7,10]));