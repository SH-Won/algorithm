// 1 2 3 4 5 6 7 8
//  1   2   3   4
//    1       2
//        1

console.log(solution(8,4,7))
function solution(n,a,b) {
    //let answer = 1;

    // while(Math.abs(a-b) !== 1 && Math.min(a,b) % 2 !==1){

        
    //     a = Math.ceil(a/2);
    //     b = Math.ceil(b/2);
    //     answer++;
    // }
    let answer = 0;
    while(a!==b){
        a = Math.ceil(a/2);
        b = Math.ceil(b/2);
        answer++;

    }
    return answer;

}