// const [N,K] = [1000,0];
const fs = require('fs');
const [N,K]=fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);

let sec = Array(100001).fill(-1);
let count = Array(100001).fill(0);

bfs(N);

console.log(`${sec[K]}\n${count[K]}`);

function bfs(start){
    let queue = [start];
    const isValidPos = (pos) => (pos>=0 && pos<=100000)
    sec[start] = 0;
    count[start] = 1;

    while(queue.length){
        const cPos =queue.shift();
        
        if(cPos === K) return;
    
        [cPos+1,cPos-1,cPos*2].forEach(nPos=>{
            if(!isValidPos(nPos)) return;
            // 만약 다음지점에서의 시간이 -1 이라면,
            // nPos 는 아직 queue에 추가된적이 없으므로
            // queue 에 추가해준다.
            // 현재지점의 시간 sec[cPos] 에 +1 을 해준다.

            if(sec[nPos] === -1){
                sec[nPos] = sec[cPos] + 1;
                count[nPos] = count[cPos];
                queue.push(nPos);
            }
            // 다음지점의 저장된 시간이 -1 이 아니고,
            // 현재시간+1 과 다음지점의 시간이 같다면
            // 현재 지점에서 다음지점 까지 가는 새로운 경우의수가 있으므로
            // 현재까지온 모든 경우의수인 count[cPos] 를 count[nPos] 에 추가해준다.
            // ex) 1에서 시작했을때 1에서 2까지 갈수 있는 경우는 1+1 1*2 이다
            // 즉, count[1] =1  이고 count[2] =2 이다.
            // 3 까지 도달해야 한다면 2+1 한가지 경우이고 3은 한번도 나타나지않았으니
            // 위에 조건문 에서 count[3] = count[2] 가 된다.
            else if(sec[nPos] === sec[cPos]+1){
                count[nPos]+=count[cPos];
            }
            

        })

    }

}