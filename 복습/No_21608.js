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
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const locateStudent = (student,classroom,isValidPos) =>{
    const n = classroom.length;
    const [nth,...fav] = student;
    let favMap = Array.from({length:n},()=>Array(n).fill(0));
    let max = 0;
    let candi = [];
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++){
            const sittedStudent = classroom[y][x];
            if(fav.includes(sittedStudent)){
                for(let i=0; i<4; i++){
                    const [ny,nx] = [y+dy[i],x+dx[i]];
                    if(!isValidPos(ny,nx) || classroom[ny][nx] ) continue;
                    favMap[ny][nx]++;
                    if(favMap[ny][nx] > max){
                        max = favMap[ny][nx];
                    }
                }
            }
        }
    }
    
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++){
            if(favMap[y][x] === max && !classroom[y][x]) candi.push({y,x,empty:0})
        }
    }
    if(candi.length === 1){
        const {y,x} = candi[0];
        classroom[y][x] = nth;
        return;
    }
    for(let i=0; i<candi.length; i++){
        let student = candi[i];
        for(let i=0; i<4; i++){
            const [ny,nx] = [student.y+dy[i],student.x+dx[i]];
            if(!isValidPos(ny,nx) || classroom[ny][nx]) continue;
            student.empty++;
        }
    }
    candi.sort((a,b)=>{
        if(a.empty === b.empty){
           if(a.y === b.y) return a.x - b.x;
           return a.y - b.y;
        }
        return b.empty - a.empty;
    })
    const {y,x} = candi[0];
    classroom[y][x] = nth;
    
}
const solution = (input) =>{
    const N = +input[0];
    const students = Array.from({length:N**2},(_,i)=>input[i+1].split(' ').map(Number));
    let classroom = Array.from({length:N},()=>Array(N).fill(0));
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);
    students.forEach(student => locateStudent(student,classroom,isValidPos));
    students.sort((a,b)=> a[0] - b[0]);
    let sum = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            const nth = classroom[y][x] - 1;
            let count = 0;
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || !students[nth].includes(classroom[ny][nx],1)) continue;
                count++;
            }
            if(count === 0) continue;
            sum+= 10**(count-1);
        }
    }
    console.log(sum);
}
solution(input);