const solution = (n,stations,w) =>{
    let answer = 0;
    let index = 0;
    let current = 1;
    let station = stations[index++];
    while(current <=n){
        if(current < station - w ){
            answer += Math.ceil((station - w - current ) / (w*2 +1))
            current = station+w+1;
        }
        if( current >= station - w){
            current = station+w+1;
            station = index < stations.length ? stations[index++] : n+w+1;   
        }
    //    console.log(current);
    }
    return answer;
}
console.log(solution(16,[9],2))