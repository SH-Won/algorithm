const solution = (sticker) =>{
    let dp = Array(sticker.length+2).fill(0);
    let dp1 = Array(sticker.length+2).fill(0);
    
    if(sticker.length === 1) return sticker[0];
    for(let i=2; i<sticker.length+1; i++){
        dp[i] = Math.max(dp[i-2]+sticker[i-2],dp[i-1]);

    }
    for(let i=3; i<sticker.length+2; i++){
        dp1[i] = Math.max(dp1[i-1],dp1[i-2]+sticker[i-2]);
    }
    // console.log(dp);
    // console.log(dp1);
    return Math.max(dp[sticker.length],dp1[sticker.length+1])
}
//console.log(solution([1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2]));