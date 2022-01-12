const solution = (s) =>{
    let answer = [0,0];
    while(true){
        const count = s.length;
        s = s.replace(/0/g,"");
        answer[0]++;
        answer[1]+= (count-s.length);
        if(s === '1') return answer;
        s = Number(s.length).toString(2);
    }
}
console.log(solution('1111111'))