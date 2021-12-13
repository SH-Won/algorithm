const solution = (n) =>{
    const count = n.toString(2).split('').filter(el => el === '1').length;
    while(n++){
        const nextCount = n.toString(2).split('').filter(el => el==='1').length;
        if(nextCount === count) return n;
    }
}
console.log(solution(78))