const solution = s => {
    let answer = [0,0];
    while(s !== '1'){
        const prev = s.length;
        const next = s.replace(/0/g,"").length;
        answer[0]++;
        answer[1] += (prev - next);
        s = next.toString(2);
    }
    return answer;
}
// console.log(solution("110010101001"))
// console.log(solution("01110"))
console.log(solution("1111111"))

