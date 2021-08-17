
console.log(solution([1,3,2,5,3],9))

function solution(d, budget) {
    d.sort((a,b)=>a-b);
    let answer = d.reduce((acc,cur)=>{
        
        if(acc[0]+cur <= budget){
            acc[0]+=cur
            acc[1]++;
            return acc;
        }
        return acc;
    },[0,0])
    console.log(answer);

    return answer[1];
}

// function solution(d, budget) {
//     d.sort((a, b) => a - b);
//     while (d.reduce((a, b) => (a + b), 0) > budget) {
//       d.pop();
//     }

//     return d.length;
// }