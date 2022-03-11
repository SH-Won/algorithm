const solution = (N,stations,W) =>{
    let idx = 0;
    let current = 1;
    let station = stations[0];
    let answer = 0;
    while(current <= N){
        if(current < station - W){
            const addStations = Math.ceil((station-W-current) / (2*W+1));
            answer += addStations;
            current = station + W + 1;
        }
        if(current >= station - W){
            current = station + W + 1
            station = ++idx < stations.length ? stations[idx] : N+W+1;
        }
    }
    return answer;
}
console.log(solution(11,[4,11],1))
// console.log(solution(16,[9],2))