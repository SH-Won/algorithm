// const input = [
// '3',
// '4 2 5 1 7',
// '3 1 9 4 5',
// '9 8 1 2 3',
// '8 1 9 3 4',
// '7 2 3 4 8',
// '1 9 2 5 7',
// '6 5 2 3 4',
// '5 1 9 2 8',
// '2 9 3 1 4'
// ]
// const input = [
// '3',
// '4 2 5 1 7',
// '2 1 9 4 5',
// '5 8 1 4 3',
// '1 2 9 3 4',
// '7 2 3 4 8',
// '9 8 4 5 7',
// '6 5 2 3 4',
// '8 4 9 2 1',
// '3 9 2 1 4',
// ]
const input = [
'3',
'7 9 3 8 2', 
'5 7 3 8 6',
'3 5 2 4 9',
'9 6 8 3 4',
'8 5 3 1 6',
'6 3 8 5 4',
'2 6 4 8 7',
'1 8 3 4 5',
'4 7 9 3 8'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const student = Array.from({length:N*N},(_,i)=>{
    const [nth,...fav] = input[i+1].split(' ').map(Number);
    return {nth,fav};
})
// console.log(student);
let favMap ;
let classroom = Array.from({length:N},()=>Array(N).fill(0));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
for(let i=0; i<student.length; i++){
    const {nth,fav} = student[i];
    favMap = Array.from({length:N},()=>Array(N).fill(0));
    let max = 0;
    let candidate = [];
    // 비어있는 칸중에 좋아하는 학생이 인접한 칸에 가장 많은 칸
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
           const sittedStudent = classroom[y][x];
           if(fav.includes(sittedStudent)){
               for(let i=0; i<4; i++){
                   const [ny,nx] = [y+dy[i],x+dx[i]];
                   if(!isValidPos(ny,nx) || classroom[ny][nx]) continue;
                   favMap[ny][nx]++;
                   favMap[ny][nx] > max  ? max=favMap[ny][nx] : max;
               }
           }
        }
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(favMap[y][x] === max && !classroom[y][x]) candidate.push({y,x,empty:0});
        }
    }
    if(candidate.length === 1){
        const {y,x} = candidate[0];
        classroom[y][x] = nth;
        continue;
    }
    
    for(let i=0; i<candidate.length; i++){
        let candi = candidate[i];
        const {y,x} = candi;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || classroom[ny][nx]) continue;
            candi.empty++;
        }
    }
    candidate.sort((can1,can2) => {
        if(can1.empty === can2.empty){
            if(can1.y === can2.y) return can1.x - can2.x;
            return can1.y - can2.y;
        }
        return can2.empty - can1.empty;
    })
    const {y,x} = candidate[0];
    classroom[y][x] = nth;
}

let sum = 0;
student.sort((a,b) => a.nth - b.nth);

for(let y=0; y<N; y++){
    for(let x=0; x<N; x++){
        let count = 0;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            const nth = classroom[y][x] - 1;
            if(isValidPos(ny,nx) && student[nth].fav.includes(classroom[ny][nx])){
                count++;
            }
        }
        if(count ===0)  continue;
        sum += 10**(count-1)
    }
}
console.log(sum);