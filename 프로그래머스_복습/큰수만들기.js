
const solution = (number,k) =>{
    let answer = '';
    const length = number.length - k;
    let stack = [];
    for(let i=0; i<number.length; i++){
        const num = number[i];
        while( k > 0 && stack[stack.length-1] < num){
            stack.pop();
            k--;
        }
        stack.push(num);
    }
    answer = stack.slice(0,length).join('');
    return answer;
}