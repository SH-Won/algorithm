let p =["mislav", "stanko", "mislav", "ana"];
let c =["stanko", "ana", "mislav"];
console.log(solution(p,c));
function solution(participant, completion) {
   let answer ;
   participant.sort();
   completion.sort();
   
   answer = participant.filter((player,index) => player !== completion[index])[0];

   return answer;
}