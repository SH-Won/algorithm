//const input =['3 6','antarctica','antahellotica','antacartica'];
//const input = ['2 3','antaxxxxxxxtica','antarctica'];
const input =['5 6','antaatica','antabxbtica','antabbbbtica','antaccvtica','antabxbxbtica'];
//let string = 'antarctica';
// console.log(string.replace(/[antic]/g,""));
// console.log(string.replace(/[^a|^n]/g,""))
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,K] = input[0].split(' ').map(num =>+num);
const words = Array.from({length:N},(_,i)=>input[i+1].replace(/[antic]/g,""));
const teachable = K-5;

const teach = (words) =>{
    let unTeached = [];
    let teached = new Set(['a','n','t','i','c']);
    let maxLearnalbe = 0;
    for(let i=0; i<words.length; i++){
        for(let j=0; j<words[i].length; j++){
            if(unTeached.indexOf(words[i][j]) === -1){
                unTeached.push(words[i][j]);
            }
        }
    }
    if(unTeached.length === 0 || teachable >= unTeached.length) return words.length;
    
    const dfs = (count,idx) =>{
        if(count === teachable){
            let learnable = 0;
            for(let i=0; i<words.length; i++){
                let flag = false;
                for(let j=0; j<words[i].length; j++){
                    if(!teached.has(words[i][j])){
                        flag = true;
                        break;
                    }
                }
                flag ? learnable : learnable++;
            }
            maxLearnalbe = Math.max(maxLearnalbe,learnable);
            return
        }

        for(let i=idx; i<unTeached.length; i++){
            teached.add(unTeached[i]);
            dfs(count+1,i+1);
            teached.delete(unTeached[i]);
        }

    }
    dfs(0,0);
   
    return maxLearnalbe

}

const answer = K < 5 ? 0 : K<26 ? teach(words) : words.length;
console.log(answer);
