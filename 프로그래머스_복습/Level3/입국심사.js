const solution = (n,times) =>{
    times.sort((a,b) => a-b);
    let minTime ;
    let left = 0;
    let right = n * times[times.length-1];
    while(left <= right){
        const time = Math.floor((left+right)/2);
        let people = 0;
        for(let i=0; i<times.length; i++){
            const count = Math.floor(time / times[i]);
            people+=count;
            if(people >= n){
                break;
            }
        }
        if(people >= n){
            right = time-1;
            minTime = time;
        }
        else left = time + 1;
    }
    return minTime;
}
console.log(solution(6,[7,10]));