
console.log(solution(16,16,2,1));

function solution(n, t, m, p) {
    let answer = '';

    //10 이상의 숫자부턴 하나씩
    let i=0;
   // let s =''
    //0 1 1 0 1 1 1 0 0
    while(answer.length < t*m){
        answer+=i.toString(n);
        i++
    }
    answer = answer.substring(0,m*t);
    
    answer = Array.prototype.filter.call(answer,(letter,index) => index % m === p-1 ).join('');
    //s.replace(/[10-15]/g,)
   
    return answer.toUpperCase();
}