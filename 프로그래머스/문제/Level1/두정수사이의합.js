function solution(a, b) {
    let answer = 0;
    let array = [a,b];
    array.sort((a,b)=>a-b);
    for(let i=array[0]; i<=array[1]; i++){
        answer+=i;
    }
    return answer;
}