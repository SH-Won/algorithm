console.log(solution(15))

// function solution(n){
//     let answer ;
//     const getOneCount = (number) =>{
//         return Array.prototype.filter.call(number.toString(2), num => +num === 1 ).length;
//     }
//     const oneCount = getOneCount(n);
//     let i = n+1;
    
//     while(true){
//         if(getOneCount(i) === oneCount){
//             answer = i;
//             break;
//         }
//         i++;
//     }
    
//     return answer;
// }

function solution(n){
    
    let oneCount = n.toString(2).match(/1/g).length;
    
    while(n++){
        if(oneCount === n.toString(2).match(/1/g).length) return n
    }

    
}