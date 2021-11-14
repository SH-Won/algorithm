const input = ['4 6','a t c i s w']


//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [L,C] = input[0].split(' ').map(Number);
const alphabet = input[1].split(' ').join('');
const solution = (alphabet) =>{
    let answer = [];
    let password = Array(L).fill(false);
    const combination = (index,count,max) =>{
        if(count === L){
            const consonant = password.join('').replace(/[aeiou]/g,"").length;
            const vowels = password.join('').replace(/[^aeiou]/g,"").length;
            if(consonant < 2 || vowels < 1) return;
            answer.push([...password].sort().join(''));
            return;
        }
        for(let i=index; i<alphabet.length; i++){
            password[count] = alphabet[i];
            combination(i+1,count+1,max);
        }
    }
    combination(0,0,L)
    console.log(answer.sort().join('\n').trim());
}
solution(alphabet);
// //const fs = require('fs');
// //const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const [L,C] = input[0].split(' ').map(Number);
// const alphbet = input[1].split(' ').join('');
// // 서로다른 알파벳 L개 최소 모음 한개 // 최소 자음 두개;

// const solution = (alphbet) =>{
//     let answer = [];
//     const consonant = alphbet.replace(/[aeiou]/g,"");
//     const vowels = alphbet.replace(/[^aeiou]/g,"");
//     if(vowels)
//     let password = Array(L);

//     const combinationC = (index,count,vMax,max) =>{
//         if(count === max){
//             const pass = [...password].sort().join('');
//             answer.push(pass);
//             return;
//         }
//         for(let i=index; i<consonant.length; i++){
//             password[count+vMax] = consonant[i];
//             combinationC(i+1,count+1,vMax,max);
//         }

//     }
//     const combinationV = (index,count,max) =>{
//         if(count === max){
//             combinationC(0,0,max,L-max);
//             return;
//         }

//         for(let i=index; i<vowels.length; i++){
//             password[count] = vowels[i];
//             combinationV(i+1,count+1,max);
//         }
//     }
//     for(let vMax = 1; vMax <=L-2; vMax++){
//         combinationV(0,0,vMax);
//     }
//     console.log(answer.sort().join('\n').trim());
// }
// solution(alphbet);

// const alphbet = "abcedfgiou";
// const consonant = alphbet.replace(/[aeiou]/g,"");
// const vowels = alphbet.replace(/[^aeiou]/g,"");
// console.log(consonant,vowels);