// const fs =require('fs');
// const [input,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [input,...arr]=[
    '10 4200',
    '1',
    '5',
    '10',
    '50',
    '100','500','1000','5000','10000','50000'
]
const [N,K] = input.split(' ').map(num => +num);
const coinArr = arr.map(num => +num);

let coinNumber =0;

let k = K;

for(let i=N-1; i>=0; i--){

    let q = Math.floor(k / coinArr[i] );
    if(q === 0){
        continue;
    }
    coinNumber +=q;
    k %=coinArr[i];

    if(k === 0){
        break;
    }

}
console.log(coinNumber);