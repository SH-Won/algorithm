const array = [1,2,3,4,5];

let solution = [];
solution.push(Math.max(...array));
solution.push(Math.min(...array));

console.log(solution.join(' '));

console.log('a'.charCodeAt());
console.log(String.fromCharCode(97));
console.log(Array.from({length:122-97+1}, (_,i) => String.fromCharCode(i+97)))

let char = {
    'a':4,
    'b':3,
    'c':1,
}
console.log(Object.values(char));
console.log(Math.max(...Object.values(char)));

let string = " my name is SH"


console.log(string.trim().split(' '));

let stringA = "";
console.log(stringA.split(' '));
console.log(string.split(' ').reverse().join(' '));

let str = '345';
let strArray = str.split('');
let s ="";
for(let i=0; i<strArray.length; i++){
    s += strArray[i].repeat(3);
}
console.log(s);
console.log(string.trim());


let arr = ['2','3 ABC','5 /HTP']



for(let i=1; i<=Number(arr[0]); i++){
    let solutionArray = arr[i].split(' '); //[5,ABC]
    let solution = solutionArray[1].split('');//[A,B,C]
    
    let s="";
    
    for(let j=0; j<solution.length; j++){
         
         s += solution[j].repeat(Number(solutionArray[0]))
    }
    console.log(s);

}
console.log(Array.prototype.some.call('ABC', v=> v==='A'));



let input = 'WA'.split('');
let check ={
    'ABC':2,
    'DEF':3,
    'GHI':4,
    'JKL':5,
    'MNO':6,
    'PQRS':7,
    'TUV':8,
    'WXYZ':9
}
let sol = Array.from({length:input.length}).fill(0);
console.log(sol);

for(let i=0; i<input.length; i++){
    
    for(let key in check){
        sol[i] =
        Array.prototype.some.call(key, v => v===input[i]) ? check[key] : sol[i];
    }
}
let sum = sol.reduce((acc,pre)=> acc=acc+pre+1 ,0);
console.log(sum);

console.log('----------------');

let strr = 'ljes=njak';


const croatia = ['c=','c-','dz=','d-','lj','nj','s=','z='];

for(let i=0; i<croatia.length; i++){
   strr = strr.split(croatia[i]).join('A');
  
}
console.log(strr.length);




let inp =['3','happy','new','year'];
let c = 0;

for(let i=1; i<=Number(inp[0]); i++){
    let word = inp[i].split('');
    let letter = [];
    let isGroup = true;
    
   for(let j=0; j<word.length; j++){
        
    if(letter.indexOf(word[j]) === -1){
        letter.push(word[j])
    }
    else{
        if(letter.indexOf(word[j]) !== letter.length-1){
            isGroup=false;
            break;
        }
    }
     
   }
   if(isGroup) c+=1;

}
console.log(c);

let innp =['10 500','93 181 245 214 315 36 185 138 216 295'];


let NM = innp[0].split(' ');
let N = Number(NM[0]); //카드갯수
let M = Number(NM[1]); //카드3장 합
let card = innp[1].split(' ').map(num => parseInt(num));
let cardSum = [];
// [1,2,3,4,5];
for(let i=0; i<card.length-2; i++){
    for(let j=i+1; j<card.length; j++){
        for(let z=j+1; z<card.length; z++){
            let sum = card[i]+card[j]+card[z];
            if(sum <= M) cardSum.push(sum);
            
        }
    }
}
console.log(Math.max(...cardSum));


let inputStr = '216';
let constructorArr = [];

function sum1(n){
    const N = n.split('').reduce((acc,pre) => acc=acc+Number(pre),0);
    return N;
}
console.log(Number(inputStr));
for(let i=0; i<=Number(inputStr); i++){
    if(Number(inputStr) === sum1(String(i))+i){
        console.log(i);
        constructorArr.push(Number(i));
    }

}
console.log(constructorArr);
console.log(Math.min(...constructorArr))


const test =['5','55 185','58 183','88 186','60 175','46 155'];

const NN = Number(test[0]);
const dunchiArr = test.slice(1);
const rank = [];


for(let i=0; i<dunchiArr.length; i++){
    let count=0;
    let [x,y]=dunchiArr[i].split(' ').map(num => parseInt(num));
    console.log('x',x,'y',y);

    for(let j=0; j<dunchiArr.length; j++){
        if(j===i) continue;
    
       let [x1,y1]=dunchiArr[j].split(' ').map(num => parseInt(num));
       console.log('x1',x1,'y1',y1);
       if(x<x1 && y<y1) count+=1

    }
    rank.push(count+1);
}
console.log(rank.join(' '));

