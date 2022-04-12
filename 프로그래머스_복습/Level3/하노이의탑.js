const solution = n =>{
    // 제일 큰 원판을 제외한 n-1 개의 원판을 mid 에 쌓음.
    // 제일 큰 원판을 도착지로 보냄
    // 제일 큰 원판을 제외한 mid 에 있는 n-1 개의 원판을 도착지에 차곡히 쌓음
    const result = [];
    const hanoi = (num,start,mid,end) =>{
        if(num === 1){
            result.push([start,end]);
            return;
        }
        else{
            hanoi(num-1,start,end,mid);
            result.push([start,end]);
            hanoi(num-1,mid,start,end);
        }
    }
    hanoi(n,1,2,3);
    return result;
}