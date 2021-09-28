// const input = [
// '4 2 0 0 8',
// '0 2',
// '3 4',
// '5 6',
// '7 8',
// '4 4 4 1 3 3 3 2',
// ]
// const input = [
// '3 3 1 1 9',
// '1 2 3',
// '4 0 5',
// '6 7 8',
// '1 3 2 2 4 4 1 1 3'
// ]
// const input = [
// '2 2 0 0 16',
// '0 2',
// '3 4',
// '4 4 4 4 1 1 1 1 3 3 3 3 2 2 2 2'
// ]
const input = [
'3 3 0 0 16',
'0 1 2',
'3 4 5',
'6 7 8',
'4 4 1 1 3 3 2 2 4 4 1 1 3 3 2 2',
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    let index = 0;
    let [N,M,x,y,K] = input[index++].split(' ').map(Number);
    let map = Array.from({length:N},()=>input[index++].split(' ').map(Number));
    const command = input[index].split(' ').map(Number);
    const isValidPos = (x,y)=>(y>=0 && x>=0 && x<N && y<M);
    const dx =[0,0,0,-1,1];
    const dy =[0,1,-1,0,0];
    let dice = [0,0,0,0,0,0];
    let answer = "";

    const throwing = (command) =>{
        let temp =[...dice];
        switch(command){
            case 1 : {
               [temp[1],temp[5]] =[temp[5],temp[1]];
               [temp[1],temp[2]] =[temp[2],temp[1]];
               [temp[1],temp[0]] =[temp[0],temp[1]];
                dice = [...temp];
                break;
            }
            case 2 : {
                [temp[2],temp[5]] =[temp[5],temp[2]];
                [temp[2],temp[1]] =[temp[1],temp[2]];
                [temp[2],temp[0]] =[temp[0],temp[2]];
                 dice = [...temp];
                 break;
            }
            case 3 : {
                [temp[3],temp[5]] =[temp[5],temp[3]];
                [temp[3],temp[4]] =[temp[4],temp[3]];
                [temp[3],temp[0]] =[temp[0],temp[3]];
                 dice = [...temp];
                 break;
             }
             case 4 : {
                [temp[4],temp[5]] =[temp[5],temp[4]];
                [temp[4],temp[3]] =[temp[3],temp[4]];
                [temp[4],temp[0]] =[temp[0],temp[4]];
                 dice = [...temp];
                 break;
             }
        }
    }
     let i=0; 
     while(i<K){
         const cmd = command[i];
         const [nx,ny] = [x+dx[cmd],y+dy[cmd]];
         if(!isValidPos(nx,ny)){
            //  answer+=`${dice[0]}\n`;
             i++;
             continue;
            }

         throwing(cmd);
         if(!map[nx][ny]) map[nx][ny] = dice[5];
         else{
             dice[5] = map[nx][ny];
             map[nx][ny] = 0;
         }
         answer+=`${dice[0]}\n`;
         y+=dy[cmd];
         x+=dx[cmd];
         i++;
     }
      console.log(answer.trim());
}
solution();

// 동쪽 1 서쪽 2 북쪽 3 남쪽 4
// 
// 동쪽으로 구르면 서쪽면이 윗면이됨 밑면이 동쪽면으로 됨
// 남쪽으로 구르면 북쪽면이 윗면이됨
// 주사위를 두개의방향으로 나눌수있음
// 주사위 [윗면,동쪽,서쪽,북쪽,남쪽,아랫면];
