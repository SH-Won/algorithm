// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input =[
    '1 1 1',
    '2 2 2',
    '10 4 6',
    '50 50 50',
    '-1 7 18',
    '-1 -1 -1'
]
 let arr = [];
let memory = new Array(21);

for(let i=0; i<input.length; i++){
    arr.push(input[i].split(' ').map(num => +num));
}

function w(a,b,c){
    if(a<=0 || b<=0 || c<=0) return 1;

    if(a>20 || b>20 || c>20) return w(20,20,20);

    if(memory[a][b][c] !== 0) return memory[a][b][c]

    if(a<b && b<c){
        // let t1 = memory[a][b][c-1] = w(a,b,c-1);
        // let t2 = memory[a][b-1][c-1]=w(a,b-1,c-1);
        // let t3 = memory[a][b-1][c] =w(a,b-1,c);

        return memory[a][b][c] = w(a,b,c-1) + w(a,b-1,c-1) - w(a,b-1,c)
       
       // return memory[a][b][c] = t1+t2-t3;
    }

    // let t1 = memory[a-1][b][c] = w(a-1,b,c);
    // let t2 = memory[a-1][b-1][c] =w(a-1,b-1,c);
    // let t3 = memory[a-1][b][c-1]=w(a-1,b,c-1);
    // let t4 = memory[a-1][b-1][c-1]=w(a-1,b-1,c-1);

    return memory[a][b][c] = w(a-1,b,c) + w(a-1,b-1,c) + w(a-1,b,c-1) -w(a-1,b-1,c-1)
   // return memory[a][b][c]=t1+t2+t3-t4;

}



for(let i=0; i<21; i++){
     memory[i] = new Array(21);
    for(let j=0; j<21; j++){
        memory[i][j] = Array(21).fill(0);
    }
}
w(15,15,15);
console.log(memory);
// let i=0;
// while(true){
//     let [a,b,c] = arr[i];

//     if(a===-1 && b===-1  && c ===-1) break;

//     console.log(`w(${a}, ${b}, ${c}) = ${w(a,b,c)}`);
//     i++;
// }