//const input = ['7 3','2 0 0 0 1 1 0','0 0 1 0 1 2 0','0 1 1 0 1 0 0','0 1 0 0 0 0 0','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 0 0 2'];
// const input =[
//     '7 3',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 2 1 0 0',
// '2 1 0 0 0 0 2',
// '0 0 0 2 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input =[
//     '7 4',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 2 1 0 0',
// '2 1 0 0 0 0 2',
// '0 0 0 2 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input = [
//     '7 5',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 2 1 0 0',
// '2 1 0 0 0 0 2',
// '0 0 0 2 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input =[
//     '7 3',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 0 0',
// '0 1 1 1 1 0 0',
// '2 1 0 0 0 0 2',
// '1 0 0 0 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input =[
//     '7 2',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 0 0',
// '0 1 1 1 1 0 0',
// '2 1 0 0 0 0 2',
// '1 0 0 0 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input = [
//     '5 1',
// '2 2 2 1 1',
// '2 1 1 1 1',
// '2 1 1 1 1',
// '2 1 1 1 1',
// '2 2 2 1 1',
// ]

const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] =input[0].split(' ').map(Number);
const lab = Array.from({length:N},(_,i)=>input[i+1].split(' '));
solution(lab);
function solution(lab){
    let virusPos = [];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    const distance =[[-1,0],[1,0],[0,-1],[0,1]];
    let minTime = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(lab[y][x] ==='2'){
                const time = 0;
                lab[y][x] ==='0';
                virusPos.push([y,x,time]);
            }
        }
    }
    
    const isSafe = (lab) =>{
        for(let i=0; i<N; i++){
            let index = lab[i].indexOf('0');
            if(index !==-1) return true;
        }
       return false;
    }
    const spreadVirus = (start,lab) =>{
        for(let i=0; i<start.length; i++){
            const [y,x] = start[i];
            lab[y][x] ='1';
        }
        let time ;
        let queue=[...start];
        while(queue.length){
            const [cy,cx,ct] = queue.shift();
            time = ct;
            
            distance.forEach(([my,mx])=>{
                const [ny,nx] = [cy+my,cx+mx];
                if(!isValidPos(ny,nx) || lab[ny][nx] ==='1') return;
                lab[ny][nx] ='1'
                queue.push([ny,nx,ct+1]);
            })
        }
        if(isSafe(lab)) return -1;
        return time;
    }

    const putVirus = (index,count,vPos) =>{
        if(count === M){
          
            const copyLab = Array.from({length:N},(_,i)=>[...lab[i]]);
            const time = spreadVirus(vPos,copyLab);
            time !==-1 ? minTime.push(time) : minTime;
            return;
        }
        for(let i=index; i<virusPos.length; i++){
             let temp = [...vPos];
             temp.push(virusPos[i]);
             putVirus(i+1,count+1,temp);
        }
    }
    putVirus(0,0,[])
    return minTime.length === 0 ? console.log(-1) : console.log(Math.min(...minTime));
}
