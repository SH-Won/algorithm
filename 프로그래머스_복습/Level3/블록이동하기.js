const solution = board => {
    const N = board.length;
    const end = `${N-1},${N-1}`;
    const visit = new Set();
    const [y,x] = [0,1];
    const [dy,dx] = [[0,0,-1,1],[-1,1,0,0]];
    const [LEFT,RIGHT,UP,DOWN] = [0,1,2,3];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    const getNextPos = (left,right) =>{
        const next = [];
        for(let i=0; i<4; i++){
            const [y1,x1,y2,x2] = [left[y]+dy[i],left[x]+dx[i],right[y]+dy[i],right[x]+dx[i]];
            if(!isValidPos(y1,x1) || !isValidPos(y2,x2) || board[y1][x1] || board[y2][x2] ) continue;
            next.push([[y1,x1],[y2,x2]]);
            if(( left[y] === right[y] && (i === UP || i === DOWN) ) || (left[x] === right[x] && (i === LEFT || i === RIGHT) )){
                next.push([right,[y2,x2]],[left,[y1,x1]])
            }
        }
        return next;
    }
    const [left,right,time] = [[0,0],[0,1],0];
    visit.add(`0,0,0,1`);
    let queue = [[left,right,time]];
    while(queue.length){
        const [left,right,time] = queue.shift();
        if(left.join(',') === end || right.join(',') === end) return time;
        const nextPos = getNextPos(left,right);
        for(let i=0; i<nextPos.length; i++){
            const [nextLeft,nextRight] = nextPos[i];
            const nextVisit = `${nextLeft.join(',')},${nextRight.join(',')}`;
            if(!visit.has(nextVisit)){
                visit.add(nextVisit);
                queue.push([nextLeft,nextRight,time+1]);
            }
        }
    }
}
console.log(solution([[0, 0, 0, 1, 1],[0, 0, 0, 1, 0],[0, 1, 0, 1, 1],[1, 1, 0, 0, 1],[0, 0, 0, 0, 0]]))