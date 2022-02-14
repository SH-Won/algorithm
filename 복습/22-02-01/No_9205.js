// const input = ['2','2','0 0','1000 0','1000 1000','2000 1000','2','0 0','1000 0','2000 1000','2000 2000'];
// const input = ['1','2','0 0','-450 -250','-600 500','-600 1000'];
// const input = ['1','2','0 0','1000 5','2000 10','3000 15']; //ans sad
// const input = ['3','0','1000 1000','1000 1001','1','0 0','1000 0','0 2000','2','0 0','10000 0','0 1000','0 2000'] //ans happy sad happy
// const input = ['1','1','0 0','9999 9999','0 1'] //ans happy;

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getDistance = (a,b) =>{
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
const isPossible = (house,store,destination) =>{
   let visited = Array(store.length).fill(false);
   let queue = [house];
   while(queue.length){
       const curPos = queue.shift();
       if(getDistance(curPos,destination) <=1000) return true;
       for(let i=0; i<store.length; i++){
           if(visited[i] || getDistance(curPos,store[i]) > 1000) continue;
           queue.push(store[i]);
           visited[i] = true;
       }
   }
   return false;
}
const solution = (input) =>{
    let answer = '';
    let t = +input[0];
    let idx = 1;
    while(t--){
        const n = +input[idx++];
        const house = input[idx++].split(' ').map(Number);
        const store = Array.from({length:n},()=>input[idx++].split(' ').map(Number));
        const destination = input[idx++].split(' ').map(Number);
        if(getDistance(house,destination) <= 1000){
            answer+='happy\n';
            continue;
        }
        if(getDistance(house,destination) > (n+1) * 1000){
            answer+='sad\n';
            continue;
        }
        answer += isPossible(house,store,destination) ? 'happy\n' : 'sad\n';   
    }
    console.log(answer.trim());
}
solution(input);