const solution = (n,stations,w)=>{
    let current = 1 , index = 0;
    let station = stations[index++];
    let answer = 0;
    while(current <= n){
        if(current < station - w){
           answer+= Math.ceil((station - w - current) / (2*w+1));
           current = station + w + 1;
        }
        else{
            current = station+w+1;
            station = index < stations.length ? stations[index++] : n+w+1;
        }
    }
    return answer;
}