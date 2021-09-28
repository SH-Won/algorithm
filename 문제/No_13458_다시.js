// const input = ['1','1','1 1'];
// const input = ['3','3 4 5','2 2'];
// const input = ['5','1000000 1000000 1000000 1000000 1000000','5 7'];
// const input = ['5','10 9 10 9 10','7 20'];
//const input = ['5','10 9 10 9 10','7 2'];
// const input = ['2','3 2','2 2'];
// const input = ['1','2','2 3'];
const input = ['1','1','1000000 1'];
// let input =[];
// input[0] = '1000000';
// input[1] = '1000000 '.repeat(1000000).trim();
// input[2] ='1 1';
//console.log(BigInt(100000000000).toString());
// console.log(BigInt(Math.ceil(-1/5)));

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const exam = input[1].split(' ').map(Number);
const [B,C] = input[2].split(' ').map(Number);
const solution = () =>{
    let veiwer = BigInt(0);
    for(let i=0; i<N; i++){
        let v = 1;
        const candidates = exam[i];
        v+= (candidates-B) > 0 ? Math.ceil( (candidates-B) / C) : 0;
        veiwer+=BigInt(v);
    }
    console.log(BigInt(veiwer).toString());
}
solution();