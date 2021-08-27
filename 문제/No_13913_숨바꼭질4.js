//const [N,K] = [5,17];
const fs= require('fs');
const [N,K]=fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);

let visited = Array(100001).fill(false);
let path = Array(100001).fill(0);

const bfs = (start) =>{
    let queue = [[start,0]];
    visited[start] = true;

    while(queue.length){
        const [cPos,time] =queue.shift();
        if(cPos === K) return time;

        [cPos+1,cPos-1,cPos*2].forEach(nPos =>{
            if(nPos < 0 || nPos >100000 || visited[nPos]) return;
            visited[nPos] = true;
            queue.push([nPos,time+1]);
            // path에 다음으로 갈 지점에 현재 위치를 저장한다.
            // 만약 5에서 10으로 이동한다면 path[10] = 5 가 된다.
            path[nPos] = cPos;
        })
    }
}
let time = bfs(N);
let pathArr = [];
pathArr.push(K);
let pre = path[K]; // 18
for(let i=0; i<time; i++){
    pathArr.push(pre);
    pre = path[pre];

}
console.log(`${time}\n${pathArr.reverse().join(' ')}`);