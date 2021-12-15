console.log(solution("4177252841",4));
function solution(number,k){
    let answer='';
    let stack =[];

    for(let i=0; i<number.length; i++){
        const num = number[i];
        while( k>0 && stack[stack.length-1] < num){
            stack.pop();
            k--;
        }
        stack.push(num);
    }
   // console.log(stack);
    stack.splice(stack.length-1,k);
    answer = stack.join('');

    return answer;
}
