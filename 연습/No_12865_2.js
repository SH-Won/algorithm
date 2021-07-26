const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N,K] =input[0].split(' ').map(num => + num);
const WV = Array.from({length:N},(_,i) => input[i+1].split(' ').map(num => +num));
let dp = Array.from({length:N+1},()=>Array(K+1).fill(0));

// dp 는 무게에따라서 최대로 담을 수 있는 가치를 저장한 배열
// WV 배열에서 현재 물건의 무게가 3 이라면
// dp[i][5] = dp[i-1][2] + 무게 3의 가치 이다.
// 만약 이전의 dp[i-1][5] 의값이 dp[i-1][2] +무게3의 가치 보다 더 크면
// dp[i][5]= dp[i-1][5] 로 저장 해야한다.
// 무게가 K 이므로 K 를 넘어서는 안된다.
// 1,2,3 와 1,2,4 는 가능하지만, 1,3,4 는 불가능 하다


// 현재의 무게가 6이라면 이전의 무게 1과 더해서 7무게를 만들 수 있다.


for(let i=1; i<=N; i++){
    for(let j=1; j<=K; j++){
        const weight = WV[i-1][0];
        const value = WV[i-1][1];

        if(j < weight) { 
            //만약 무게(j) 가 현재 무게보다 작다면
            // 이전 무게(j) 의 가치를 넣어준다.
            dp[i][j] = dp[i-1][j]
        }
        else{
            //그렇지 않다면 이전 무게(j)에서의 최대값과 현재 weight 의 최대값
            // 을 비교하여 넣어준다. 
            //
            dp[i][j] =Math.max(dp[i-1][j],dp[i-1][j-weight] + value)
        }
    }
}
// dp[N] 은 마지막 물건 까지 각 무게에 대한 최대 값을 담은 배열이다

console.log(Math.max(...dp[N]));