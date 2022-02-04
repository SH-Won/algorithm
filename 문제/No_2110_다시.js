const input = ['5 3','1','2','8','4','9']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const binarySearch = (C,house) =>{
    let left = 1;
    let right = house[house.length-1] - house[0];
    let distance ;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        let router = 1 , preNum = house[0];
        for(let i=1; i<house.length; i++){
            if(house[i] - preNum >= mid){
                preNum = house[i];
                router++;
            }
            if(router >=C) break;
        }
        if(router >=C) left = mid + 1 , distance = mid;
        else right = mid -1;
    }
    return distance;
}
const solution = input =>{
    const [N,C] = input[0].split(' ').map(Number);
    const house = Array.from({length:N},(_,i)=> +input[i+1]);
    house.sort((a,b)=> a-b);
    const answer = binarySearch(C,house);
    console.log(answer);
}
solution(input);