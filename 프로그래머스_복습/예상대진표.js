// 1 2 3 4 5 6 7 8
//  1   2   3   4
const solution = (N,A,B) =>{
    let round = 0;
    while(A!==B){
        A = Math.ceil(A/2);
        B = Math.ceil(B/2);
        round++;
    }
    return round
}
// console.log(solution(8,4,7))
