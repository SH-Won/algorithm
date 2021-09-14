// const input = [
//     '4',
// '1',
// 'L-',
// '2',
// 'F+ B+',
// '4',
// 'U- D- L+ R+',
// '10',
// 'L- U- L+ U- L- U- U- L+ U+ U+'
// ]

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const T = +input[0];
solution(T);
function solution(T){
    let index = 1;
    let str =""
    while(T--){
        let U = Array.from({length:3},()=>Array(3));
        let D = Array.from({length:3},()=>Array(3));
        let F = Array.from({length:3},()=>Array(3));
        let B = Array.from({length:3},()=>Array(3));
        let L = Array.from({length:3},()=>Array(3));
        let R = Array.from({length:3},()=>Array(3));
        for(let y=0; y<3; y++){
            for(let x=0; x<3; x++){
                U[y][x] ='w';
                D[y][x] ='y';
                F[y][x] ='r';
                B[y][x] ='o';
                L[y][x] ='g';
                R[y][x] ='b';
            }
        }
        const rotate = (method) =>{
            let array = [];
            switch(method){
                case 'U+' : {
                    for(let x=2; x>=0; x--){
                        array.push(L[0][x]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(B[0][x]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(R[0][x]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(F[0][x]);
                    }
                    for(let x=2; x>=0; x--){
                        B[0][x] = array.shift();
                    }
                    for(let x=2; x>=0; x--){
                        R[0][x]  =array.shift();
                    }
                    for(let x=2; x>=0; x--){
                        F[0][x] =array.shift()
                    }
                    for(let x=2; x>=0; x--){
                        L[0][x] = array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> U.map(array=> array[i]).reverse());
                    U = [...temp];  
                    break;
                }
                case 'U-' : {
                    for(let x=0; x<=2; x++){
                         array.push(R[0][x]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(B[0][x]);
                    }
                    for(let x=0; x<=2; x++){
                         array.push(L[0][x]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(F[0][x]);
                    }
                    for(let x=0; x<=2; x++){
                        B[0][x] =array.shift();
                    }
                    for(let x=0; x<=2; x++){
                        L[0][x] =array.shift();
                    }
                    for(let x=0; x<=2; x++){
                        F[0][x] =array.shift();
                    }
                    for(let x=0; x<=2; x++){
                        R[0][x] =array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> U.map(array => array[i]));
                    U = [...temp.reverse()];
                    break;
                }
                case 'D+' : {
                    for(let x=0; x<=2; x++){
                        array.push(R[2][x]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(B[2][x]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(L[2][x]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(F[2][x]);
                    }
                    
                    for(let x=0; x<=2; x++){
                        B[2][x]=array.shift();
                    }
                    for(let x=0; x<=2; x++){
                        L[2][x]=array.shift();
                    }
                    for(let x=0; x<=2; x++){
                        F[2][x]=array.shift();
                    }
                    for(let x=0; x<=2; x++){
                        R[2][x]=array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> D.map(array=> array[i]).reverse());
                    D = [...temp];  
                    break;

                }
                case 'D-' :{
                    for(let x=2; x>=0; x--){
                        array.push(L[2][x]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(B[2][x]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(R[2][x]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(F[2][x]);
                    }
                    for(let x=2; x>=0; x--){
                        B[2][x] =array.shift();
                    }
                    for(let x=2; x>=0; x--){
                        R[2][x] =array.shift();
                    }
                    for(let x=2; x>=0; x--){
                        F[2][x] =array.shift();
                    }
                    for(let x=2; x>=0; x--){
                        L[2][x] =array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> D.map(array => array[i]));
                    D = [...temp.reverse()];
                    break;

                }
                case 'F+' :{
                    for(let y=2; y>=0; y--){
                        array.push(L[y][2]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(U[2][x]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(R[y][0]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(D[2][x]);
                    }
                    for(let x=0; x<=2; x++){
                        U[2][x] = array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        R[y][0] = array.shift();
                    }
                    for(let x=0; x<=2; x++){
                        D[2][x] = array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        L[y][2] =array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> F.map(array=> array[i]).reverse());
                    F = [...temp];  
                    break;

                }
                case 'F-' :{
                    for(let y=2; y>=0; y--){
                        array.push(R[y][0]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(U[2][x]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(L[y][2]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(D[2][x]);
                    }

                    for(let x=2; x>=0; x--){
                        U[2][x] = array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        L[y][2] =array.shift();
                    }
                    for(let x=2; x>=0; x--){
                        D[2][x] = array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        R[y][0] =array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> F.map(array => array[i]));
                    F = [...temp.reverse()];
                    break;

                }
                case 'B+' :{
                    for(let y=2; y>=0; y--){
                        array.push(R[y][2]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(U[0][x]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(L[y][0]);
                    }
                    for(let x=2; x>=0; x--){
                        array.push(D[0][x]);
                    }

                    for(let x=2; x>=0; x--){
                        U[0][x] = array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        L[y][0] =array.shift();
                    }
                    for(let x=2; x>=0; x--){
                        D[0][x] =array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        R[y][2] = array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> B.map(array=> array[i]).reverse());
                    B = [...temp];  
                    break;

                }
                case 'B-' :{
                    for(let y=2; y>=0; y--){
                        array.push(L[y][0]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(U[0][x]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(R[y][2]);
                    }
                    for(let x=0; x<=2; x++){
                        array.push(D[0][x]);
                    }

                    for(let x=0; x<=2; x++){
                        U[0][x] = array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        R[y][2] = array.shift();
                    }
                    for(let x=0; x<=2; x++){
                        D[0][x] =array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        L[y][0] =array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> B.map(array => array[i]));
                    B = [...temp.reverse()];
                    break;

                }
                case 'L+' :{
                    for(let y=2; y>=0; y--){
                        array.push(B[y][2]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(U[y][0]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(F[y][0]);
                    }
                    for(let y=2; y>=0; y--){
                        array.push(D[y][2]);
                    }

                    for(let y=0; y<=2; y++){
                        U[y][0] = array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        F[y][0] =array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        D[y][2] =array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        B[y][2] =array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> L.map(array=> array[i]).reverse());
                    L = [...temp];  
                    break;

                }
                case 'L-' :{
                    for(let y=2; y>=0; y--){
                        array.push(F[y][0]);
                    }
                    for(let y=2; y>=0; y--){
                        array.push(U[y][0]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(B[y][2]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(D[y][2]);
                    }
                    for(let y=2; y>=0; y--){
                        U[y][0] = array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        B[y][2] =array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        D[y][2] =array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        F[y][0] =array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> L.map(array => array[i]));
                    L = [...temp.reverse()];
                    break;

                }
                case 'R+' :{
                    for(let y=2; y>=0; y--){
                        array.push(F[y][2]);
                    }
                    for(let y=2; y>=0; y--){
                        array.push(U[y][2]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(B[y][0]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(D[y][0]);
                    }

                    for(let y=2; y>=0; y--){
                        U[y][2] =array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        B[y][0] =array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        D[y][0] = array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        F[y][2] = array.shift();
                    }

                    let temp = Array.from({length:3},(_,i)=> R.map(array=> array[i]).reverse());
                    R = [...temp];  
                    break;

                }
                case 'R-' :{
                    for(let y=2; y>=0; y--){
                        array.push(B[y][0]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(U[y][2]);
                    }
                    for(let y=0; y<=2; y++){
                        array.push(F[y][2]);
                    }
                    for(let y=2; y>=0; y--){
                        array.push(D[y][0]);
                    }

                    for(let y=0; y<=2; y++){
                        U[y][2] =array.shift();
                    }
                    for(let y=0; y<=2; y++){
                        F[y][2] =array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        D[y][0] =array.shift();
                    }
                    for(let y=2; y>=0; y--){
                        B[y][0] =array.shift();
                    }
                    let temp = Array.from({length:3},(_,i)=> R.map(array => array[i]));
                    R = [...temp.reverse()];
                    break;

                }
            }
        }
        
        
        const n = +input[index++];
        const method = input[index++].split(' ');
        for(let i=0; i<n; i++){
            rotate(method[i]);
        }
        str+=`${U.map(row => row.join('')).join('\n')}\n`

    }
   return console.log(str.trim());
}
