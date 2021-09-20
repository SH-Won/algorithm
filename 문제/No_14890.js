//const input = ['6 2','3 3 3 3 3 3','2 3 3 3 3 3','2 2 2 3 2 3','1 1 1 2 2 2','1 1 1 3 3 1','1 1 2 3 3 2']
// const input = [
//     '6 2',
//     '3 2 1 1 2 3',
// '3 2 2 1 2 3',
// '3 2 2 2 3 3',
// '3 3 3 3 3 3',
// '3 3 3 3 2 2',
// '3 3 3 3 2 2'
// ]
// const input =[
//     '6 3',
// '3 2 1 1 2 3',
// '3 2 2 1 2 3',
// '3 2 2 2 3 3',
// '3 3 3 3 3 3',
// '3 3 3 3 2 2',
// '3 3 3 3 2 2',
// ]
// const input = [
//     '6 1',
// '3 2 1 1 2 3',
// '3 2 2 1 2 3',
// '3 2 2 2 3 3',
// '3 3 3 3 3 3',
// '3 3 3 3 2 2',
// '3 3 3 3 2 2',
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,L] = input[0].split(' ').map(num => +num);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num => +num));
solution(map);
function solution(map){
    let count = 0;
    const isPossible = (load) =>{
        let i=0;
        let flag =0;
        while(i<load.length-1){
        
            if(load[i] === load[i+1]) i++;
            
            else if(load[i] - load[i+1] === 1 && i+L <load.length){
                for(let j=i+2; j<=i+L; j++){
                    if(load[j]+1 !==load[i]) return false;
                }
                i+=L;
                flag = i
            }
            else if(load[i] - load[i+1] === -1 && i-L+1 >=0){
                if(flag && i+1-flag <= L) return false;
                for(let j=i-1; j>= i-L+1; j--){
                    if(load[j] !==load[i]) return false;
                }
                i++;
            }
            else return false;
            
            
        }
       
        return true;
    }
    for(let i=0; i<N; i++){
        if(isPossible(map[i])) count++;
        if(isPossible(map.map(array => array[i]))) count++;
    }
   return console.log(count);
}