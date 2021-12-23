const getRoute = (tickets) =>{
    let result = [];
    let temp = ["ICN"];
    let visited = Array(tickets.length).fill(false);
    const makeRoute = (count,current) =>{
        if(count === tickets.length){
           result.push([...temp]);
           return;
        }
        for(let i=0; i<tickets.length; i++){
            const [from,to] = tickets[i];
            if(from !== current) continue;
            if(!visited[i]){
                visited[i] = true;
                temp.push(to);
                makeRoute(count+1,to);
                temp.pop(to);
                visited[i] = false;
            }
        }
    }
    makeRoute(0,"ICN");
    return result;
}
const solution = (tickets) =>{
    let route =getRoute(tickets);
    return route.sort()[0];
}
// console.log(solution([["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]));
console.log(solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]))