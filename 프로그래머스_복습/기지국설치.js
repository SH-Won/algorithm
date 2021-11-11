const solution = (N,stations,W) =>{
    let answer = 0;
    let current = 1;
    let i = 0;
    let station = stations[i++];
    while(current <= N){
        if(current <= station - W - 1){
            const baseStation = Math.ceil((station-W-current) / (2*W + 1));
            answer+=baseStation;
            current = station+W+1;
        }
        if( current >= station - W){
            current = station+W+1;
            station = i < stations.length ? stations[i++] : N+W+1;
        }
        
    }
    return answer;
}
//const [N,stations,W] = [11,[4,11],1];
const [N,stations,W] = [16,[9],2];
console.log(solution(N,stations,W));