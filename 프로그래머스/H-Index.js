
const citations = [1,3,5,20,40,80,100,200,300]; 
// [ 0,1,3,5,6];
console.log(solution(citations));

function solution(citations){
    let answer =0;
    citations.sort((a,b)=>b-a);
    
    while(answer+1 <= citations[answer]){
        
        answer++;
       
    }
    return answer;
    
}
// function solution(citations){
//     let answer = citations.sort((a,b)=> b-a)[0];

//     while(true){
//         if(answer <= citations.filter(c => c >=answer).length
//            && answer >= citations.length - citations.filter(c => c>=answer).length){
//                return answer;
//            }
//         else{
//             answer--;
//         }
//     }
// }