const 입력 = [
'5 7',
'0 0 0 0 0 0 0',
'0 2 4 5 3 0 0',
'0 3 0 2 5 2 0',
'0 7 6 2 4 0 0',
'0 0 0 0 0 0 0'
]
//const fs =require('fs');
//const 입력 = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [세로,가로] = 입력[0].split(' ').map(Number);
const 빙산 = Array.from({length:세로},(_,i)=>입력[i+1].split(' ').map(Number));

const 정답 = (빙산) =>{
    let 방문 = Array.from({length:세로},()=>Array(가로).fill(false));
    let 녹은빙산 = Array.from({length:세로},()=>Array(가로).fill(0));
    // const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);
    const 세로이동=[1,-1,0,0];
    const 가로이동=[0,0,1,-1];
    const 내년빙산 = () =>{
        const 내년빙산 = 녹은빙산;
        녹은빙산 = Array.from({length:세로},()=>Array(가로).fill(0));
        //console.log(next.map(array=>array.join(' ')).join('\n'));
        return 내년빙산;
    }
    const 빙산녹이기 = () =>{
        for(let y=1; y<세로-1; y++){
            for(let x=1; x<가로-1; x++){
                    let 주위바닷물 = 0;
                    if(빙산[y][x]){
                    for(let 방향=0; 방향<4; 방향++){
                        const [ny,nx] = [y+세로이동[방향],x+가로이동[방향]];
                        if(빙산[ny][nx]) continue;
                        주위바닷물++;
                    }
                    빙산[y][x] - 주위바닷물 < 0 ? 녹은빙산[y][x] = 0 : 녹은빙산[y][x]=빙산[y][x] - 주위바닷물
                   }
                    
            }
        }
    }
    const 빙산덩어리 = (y,x) =>{
        방문[y][x] = true;
        let 큐= [[y,x]];
        while(큐.length){
            const [cy,cx] = 큐.shift();
            for(let 방향=0; 방향<4; 방향++){
                const [ny,nx] =[cy+세로이동[방향],cx+가로이동[방향]];
                if(방문[ny][nx] || !빙산[ny][nx] ) continue;
                큐.push([ny,nx]);
                방문[ny][nx]=true;
            }
        }
    }
    let 년수 = 0;
    
    while(true){
        let 빙산덩어리갯수 = 0;
        빙산녹이기();
        빙산 = 내년빙산();
        년수++;
        for(let y=1; y<세로-1; y++){
            for(let x=1; x<가로-1; x++){
                if(!방문[y][x] && 빙산[y][x]){
                    빙산덩어리갯수++;
                    빙산덩어리(y,x);
                }
            }
        }
        if(빙산덩어리갯수 === 0 ) return console.log(0);
        if(빙산덩어리갯수 >= 2) return console.log(년수);
        방문.forEach(가로 => 가로.fill(false));
        // console.log(빙산.map(가로 => 가로.join(' ')).join('\n'));
    }

}
정답(빙산);