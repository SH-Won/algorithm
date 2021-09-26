//const input = ['2','2','0 0','1000 0','1000 1000','2000 1000','2','0 0','1000 0','2000 1000','2000 2000'];
// const input = ['1','2','0 0','-450 -250','-600 500','-600 1000'];
// const input = ['1','2','0 0','1000 5','2000 10','3000 15']; //ans sad
//const input = ['3','0','1000 1000','1000 1001','1','0 0','1000 0','0 2000','2','0 0','10000 0','0 1000','0 2000'] //ans happy sad happy
//const input = ['1','1','0 0','9999 9999','0 1'] //ans happy;
//const fs = require('fs');
//const input= fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
let T = +input[index++];
const isValidPos = (x,y) => (x>=-32768 && x<=32767 && y>=-32768 && y<=32768);

let answer = "";
while(T--){
    const storeCount = +input[index++];
    const home = input[index++].split(' ').map(Number);
    const store = Array.from({length:storeCount},()=>input[index++].split(' ').map(Number));
    const festival = input[index++].split(' ').map(Number);
    const distance = Math.abs(home[0]-festival[0]) + Math.abs(home[1]-festival[1]);
    let visited =Array(store.length).fill(false);
    if(distance <= 1000){
        answer+="happy\n"
        continue;
    }
    if(distance > (store+1) * 1000){
        answer+="sad\n";
        continue;
    }
    
    const bfs = (start) =>{
        let queue = [start];
        while(queue.length){
            const [cx,cy] = queue.shift();
            if(Math.abs(cx-festival[0]) + Math.abs(cy-festival[1]) <=1000){
                answer+="happy\n";
                return;
            }
            for(let i=0; i<store.length; i++){
                const [sx,sy] = store[i];
                if(visited[i]) continue;
                const distance = Math.abs(cx-sx) + Math.abs(cy-sy);
                if(distance <= 1000){
                    visited[i] = true;
                    queue.push([sx,sy]);
                }
                
            }
        }
        answer+="sad\n";
        return;
    }
    bfs(home);
}
console.log(answer.trim());