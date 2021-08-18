console.log(solution(9))

function solution(n){
    let answer ='';
    let ternary = ['4','1','2'];
    while(n){
        
        answer = ternary[n%3] + answer ;

        n = n % 3 === 0 ? n/3 -1 : Math.floor(n/3)

    }
    return answer
}