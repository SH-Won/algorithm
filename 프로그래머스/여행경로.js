
// let array = [['ICN","SFO'],['ICN',"ATL"],["ICN","BTL"]];
// array.sort((a,b)=> a[1].localeCompare(b[1]));
// let start ;
// for(let i=0; i<array.length; i++){
//     if(array[i][0] === "ICN"){
//         start = array[i];
//         break;
//     }
// }
// console.log(start);
const tickets = [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]
//const tickets = [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]
// let start ;
//     for(let i=0; i<tickets.length; i++){
//         if(tickets[i][0] === "ICN"){
//             start = tickets[i];
//             visited[i] = true;
//             break;
//         }
//     }
console.log(solution(tickets));
function solution(tickets){
    let visited = Array(tickets.length).fill(false);
    let answer = [];
   // tickets.sort((a,b)=> a[1].localeCompare(b[1]));
   tickets.sort();
    console.log(tickets);
    let start ;
    for(let i=0; i<tickets.length; i++){
        if(tickets[i][0] === "ICN"){
            start = tickets[i];
            visited[i] = true;
            break;
        }
    }

    bfs(start);


    function bfs(start){
        let queue =[[...start]];
        answer.push(start[0]);
        while(queue.length){
            const [cur,next] = queue.shift();
            answer.push(next);
            
            for(let i=0; i<tickets.length; i++){
                if(!visited[i] && tickets[i][0] === next){
                    visited[i] = true;
                    queue.push([...tickets[i]]);
                    break;
                }
            }
            
            
        }

    }

    return answer;

}