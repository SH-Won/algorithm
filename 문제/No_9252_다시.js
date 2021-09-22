
//const [string1,string2] = ['ACAYKP','CAPCAK'];
// const [string1,string2] = ['CCCBBBACA','AAACCCABA'];
// const [string1,string2] = ['A','ABC'];
// const [string1,string2] =['a','aaaaaaaaaaaaaaaa'];
// const [string1,string2] = ['AAAA','AAA'];
const [string1,string2] = ['ADQWEQWDQWGFSDAHWREYERFGD','FGDGFDSGWERDSAFLSD']//ans 9 DGFSWERFD

//const fs = require('fs');
//const [string1,string2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (string1,string2) =>{
    let dp = Array.from({length:string1.length+1},()=>Array(string2.length+1).fill(0));
    let LCS = '';
    const getMaxLength = () =>{
      for (let i = 0; i < string1.length; i++) {
        for (let j = 0; j < string2.length; j++) {
          if (string1[i] === string2[j]) {
            dp[i + 1][j + 1] = dp[i][j] + 1; 
          } else {
            dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
          }
        }
      }
      return dp[string1.length][string2.length];
    }
    const getLCS = (i,j) =>{
        if(dp[i][j] === 0) return;
        if(string1[i-1] === string2[j-1]){
            getLCS(i-1,j-1);
            LCS+=string1[i-1];
        }
        else{
            dp[i][j-1] > dp[i-1][j] ? getLCS(i,j-1) : getLCS(i-1,j);
        }
    }

    const length = getMaxLength();
    if(length === 0) return console.log(length);
    getLCS(string1.length,string2.length);
    return console.log(`${length}\n${LCS}`);
}
solution(string1,string2);
