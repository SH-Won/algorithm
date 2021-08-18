function solution(n)
{
    let answer = n.toString().split('').map(num =>+num).reduce((acc,cur)=>acc+=cur,0)
    
    return answer
}