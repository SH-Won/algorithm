// A 전봇대의 어떤 번호에서 B 전봇대의 어떤 번호로 전깃줄을 이었다면
// A 전봇대의 다음 번호는 이전 번호에서 B 전봇대로 이어진 번호보다 커야한다.
// 즉 A 전봇대의 번호를 정렬하고, B전봇대의 이어진 번호가 증가 수열인 부분은 교차하지 않게된다.

const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input = [
//     '8','1 8','3 9','2 2','4 1','6 4',
//     '10 10','9 7','7 6'
// ]
const N = +input[0];
let line = Array.from({length:N}, (_,i)=>input[i+1].split(' ').map(num => +num));
let result;
line.sort((a,b)=> a[0] - b[0] );
result = line.reduce((acc,cur,index,array)=>{
    let temp=[];
    for(let i=0; i<index+1; i++){
        if(array[i][1] < cur[1]){
            temp.push(acc[i]);
        }
    }
    if(temp.length > 0){
        acc[index]+=Math.max(...temp);
    }

    return acc;
},Array(line.length).fill(1));
console.log(N-Math.max(...result))
