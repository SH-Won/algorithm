//const input = ['7 3','2 0 0 0 1 1 0','0 0 1 0 1 2 0','0 1 1 0 1 0 0','0 1 0 0 0 0 0','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 0 0 2']
//const input =['7 5','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']


//const input =['5 1','2 2 2 1 1','2 1 1 1 1','2 1 1 1 1','2 1 1 1 1','2 2 2 1 1']
//const input =['7 5','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
//const input =['7 3','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
//const input =['7 2','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
//const input =['5 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','0 2 0 2 0','1 1 1 1 1']

//const input =['4 3','1 1 1 1','1 2 2 1','1 2 2 1','1 1 1 1']

//const fs =require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N}, (_,i)=>input[i+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const isAllSpread = (visited,map) =>{
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(!visited[y][x] && map[y][x] === 0) return false;
        }
    }
    return true;
}
const spreadVirus = (selectedVirus,map) =>{
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    let queue = [] , idx = 0 , spreadTime = 0;
    for(let i=0; i<selectedVirus.length; i++){
        const [y,x] = selectedVirus[i];
        visited[y][x] = true;
        queue.push([y,x,0]);
    }
    while(idx < queue.length){
        const [y,x,time] = queue[idx++];
        if(map[y][x] !==2 ) spreadTime = Math.max(spreadTime,time);
        for(let i=0; i<4; i++){
           const [ny,nx] = [y+dy[i],x+dx[i]];
           if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] === 1) continue;
           queue.push([ny,nx,time+1]);
           visited[ny][nx] = true;
        }
    }
    if(isAllSpread(visited,map)) return spreadTime;
    return -1
}
const getMinTime = (virusPos,map) =>{
    let minTime = [] , selectedVirus = Array(M) ;
    // let visited = Array.from({length:N},()=>Array(N).fill(false));
    const selectVirus = (index,count) =>{
        if(count === M){
            const copyMap = Array.from({length:N}, (_,i) => [...map[i]]);
            const time = spreadVirus(selectedVirus,copyMap);
            if(time !==-1) minTime.push(time);
            return 
        }
        for(let i=index; i<virusPos.length; i++){
            selectedVirus[count] = virusPos[i];
            selectVirus(i+1,count+1);
        }
    }
    selectVirus(0,0);
    return minTime.length ? Math.min(...minTime) : -1 
}
const solution = (map) =>{
     let virusPos = [];
     for(let y=0; y<N; y++){
         for(let x=0; x<N; x++){
             if(map[y][x] === 2) virusPos.push([y,x]);   
         }
     }
     const answer = getMinTime(virusPos,map);
     console.log(answer);
}
solution(map);