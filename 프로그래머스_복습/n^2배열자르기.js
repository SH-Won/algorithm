const solution = (n,left,right) =>{
    let answer = [];
    for(let i=left; i<=right; i++){
        const [share,rest] = [i / n >>0 , i%n];
        share <= rest ? answer.push(rest+1) : answer.push(share+1);
    }
    return answer;
}
// console.log(solution(3,2,5));
console.log(solution(4,7,14))