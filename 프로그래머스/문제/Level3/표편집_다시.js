let visited ;
let removeArr = [];
let answer ;
let linkedList ;
const up = (k,count) =>{
    for(let i=0; i<count; i++){
        k = linkedList[k][0];
    }
    return k;
}
const down = (k,count) =>{
     for(let i=0; i<count; i++){
         k = linkedList[k][1];
     }
     return k;
}
const remove = (k) =>{
    removeArr.push([k,linkedList[k][0],linkedList[k][1]]);
    const next = linkedList[k][1];
    const prev = linkedList[k][0];
    visited[k] = false;
    if(next === -1){
       if(prev !== -1) linkedList[prev][1] = next;
       k =prev;
    }
    else{
        if(next !==-1) linkedList[next][0] = prev;
        if(prev !==-1) linkedList[prev][1] = next;
        k= next;
    }
   return k;
}
const recover = () =>{
    const [k,prev,next] = removeArr.pop();
    if(prev !==-1) linkedList[prev][1] = k;
    if(next !==-1) linkedList[next][0] = k;
    visited[k] = true;
}


const solution = (n, k, cmd) =>{
 // 양방향 연결리스트 
  visited = Array(n).fill(true);
  linkedList = Array.from({length:n},(_,i)=>[i-1,i+1]);
  linkedList[n-1][1] = -1;
  let i=0;
  while(i < cmd.length){
      const command = cmd[i].split(' ');
      switch(command[0]){
          case 'U' : {
              k = up(k,command[1]);
              break;
          }
          case 'D' : {
              k = down(k,command[1]);
              break;
          }
          case 'C' : {
              k=remove(k);
              break;
          }
          case 'Z' : {
              recover(k);
              break;
          }
      }
      i++;
  }
  answer = visited.reduce((acc,cur)=>{
      return cur ? acc+='O' : acc+='X';
  },"")
  return answer;
}
const [n,k,cmd] = [8,2,["D 2","C","U 3","C","D 4","C","U 2","Z","Z"]]
console.log(solution(n,k,cmd));
