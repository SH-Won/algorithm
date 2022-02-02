const solution = (n,times) =>{
    times.sort((a,b) => a-b);
    let left = 1;
    let right = n * times[times.length-1];
    let minTime = right;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        let people = 0;
        for(let i=0; i<times.length; i++){
            people += Math.floor(mid / times[i])
            if(people >= n){
                minTime = Math.min(minTime,mid);
                break;
            }
        }
        if(people >=n ) right = mid - 1;
        else left = mid + 1;
    }
    return minTime;
}