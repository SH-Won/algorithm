//const input =['3 6','antarctica','antahellotica','antacartica']
//const input =['9 25','antabtica','antaxtica','antadtica','antaetica','antaftica','antagtica','antahtica','antajtica','antaktica']
//const input =['2 5','antaxxxxxxxtica','antarctica'];
//const input =['2 5','antatica','antaatica'];
//const fs= require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
//const input =['5 6','antaatica','antabxbtica','antabbbbtica','antaccvtica','antabxbxbtica'];

// const array = ['abc','abcdef','abcgi'];
// let map = new Set;
// for(let i=0; i<array.length; i++){
//     for(let j=0; j<array[i].length; j++){
//        map.add(array[i][j]);
//     }
// }
// const alpha = Array.from(map);

// console.log(alpha[2].charCodeAt()-'a'.charCodeAt())

const fs= require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,K] = input[0].split(' ').map(num => +num);
const words = Array.from({length:N},(_,i)=>input[i+1].replace(/[antic]/g,""))
const teachableNumber = K - 5;
//console.log(words);
let answer = K < 5 ? 0 : K===26 ? N : teach(words);

function teach(words){
    
    // words = words.filter(string =>{
    //     if(string ==="") answer++;

    //     return string !== "";
    // })
    
    // if(teachableNumber ===0 || words.length ===0) return answer;
    
    let check = new Map();
    for(let i=0; i<words.length; i++){
        for(let j=0; j<words[i].length; j++){
            
            check.set(words[i][j],false);
        }
    }
    const letters = Array.from(check.keys());
   // console.log(letters);
    const possible = teachableNumber < letters.length ? teachableNumber :letters.length;
     // 만약에 입력으로 antic 를 모두 제거해주지않으면  anta + 어떤글자 +tica
     // 어떤글자에 a n t i c 가 포함되면 letters 의 배열에도 추가되므로,
     // teachableNumber 가 letters 의 길이보다 커진다면 dfs 에서 
     // a n t i c 는 이미 배운거로 간주하고 확인을 하기 때문에 count === possible 에 닿지 못한다.
     // letters 가 [a,b,x,i] 이고 teachableNmuber 가 20 이라면
     // possible 은 4 가 되고, a i 는 이미 배운거로 간주했으므로 
     // dfs 는 count가 최대 2까지밖에 도달하지 못한다.
    if(possible === letters.length) return words.length;
    //console.log(possible)
    let max = 0;
    //console.log(letters);
    check.set('a',true);
    check.set('c',true);
    check.set('i',true);
    check.set('n',true);
    check.set('t',true);
     //console.log(check);
     //console.log(letters);
    //console.log(words);
    dfs(0,0)
    function dfs(count,index){

        if(count === possible){
            let maxCount = 0;
            
           
            for(let i=0; i<words.length; i++){
               let flag = true;
                for(let j=0; j<words[i].length; j++){
                    
                    if(!check.get(words[i][j])){
                        flag = false;
                        break;
                      } 
                    }
                 if(flag) maxCount++;
                
            
               }
        max = Math.max(maxCount,max);
        return;
        }

        for(let i=index; i<letters.length; i++){
            
            if(!check.get(letters[i])){
                check.set(letters[i],true);
                dfs(count+1,i);
                check.set(letters[i],false);
            }

        }
    }
   
    
    return max;

}
console.log(answer);


