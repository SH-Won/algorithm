//console.log(solution(6,[[1,2,1],[1,3,2],[2,3,2],[3,4,3],[3,5,2],[3,5,3],[5,6,1]],4))
console.log(solution(5,[[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]],3))
function solution(N,road,K){
   let answer = 0;
   let distance =Array(N+1).fill(Infinity);
   let edge = Array.from({length:N+1},()=>[])

   road.forEach(([from,to,time])=>{
       edge[from].push({ to,time});
       edge[to].push({to:from,time});
   })
   distance[1] = 0;
   //console.log(edge);
   let queue = [ {to:1 , time:0}];
   while(queue.length){
       const current = queue.shift();
       edge[current.to].forEach(next =>{
           if(distance[next.to] > distance[current.to] + next.time){
               distance[next.to] = distance[current.to] +next.time;
               queue.push(next);
           }
       })
   }
   //console.log(distance);

   
   distance.forEach(el => el<=K ? answer++ :answer);
   return answer;
   
}