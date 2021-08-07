console.log(solution(5000));

function solution(n){
    // K 만큼 점프하면 K 만큼 배터리가 들고
    // 순간이동을 하면 여태 온거리 x2 를 배터리 소모없이 갈수 있다.
    
    // let dp =Array(n+1).fill(0);
    // dp[0] = 0;
    
    // for(let i=1; i<dp.length; i++){
    //     if(i % 2 !== 0 ){
    //         dp[i] = dp[i-1]+1
    //     }
    //     else{
    //         dp[i] = dp[i/2];
    //     }


    // }
    // return dp[n];
    let answer =0;
    let number = n;
    while(number){
        if(number % 2 ===1){
            answer++;
        }
        number = number % 2 ===1 ? Math.floor(number/2) : number/2;
    }
    return answer;

}