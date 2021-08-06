const array = [1, 5, 2, 6, 3, 7, 4];
const commands =[[2, 5, 3], [4, 4, 1], [1, 7, 3]]

console.log(solution(array,commands));

function solution(array,commands){
    let answer =[];

    commands.forEach(([i,j,k])=>{
        let numberK = array.slice(i-1,j).sort((a,b)=>a-b);
        answer.push(numberK[k-1])
    })

    return answer;

}