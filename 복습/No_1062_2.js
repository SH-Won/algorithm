// const input =['3 6','antarctica','antahellotica','antacartica'];
// const input = ['2 3','antaxxxxxxxtica','antarctica'];
const input = ['9 8','antabtica','antaxtica','antadtica','antaetica','antaftica','antagtica','antahtica','antajtica','antaktica']
// const input =['5 6','antaatica','antabxbtica','antabbbbtica','antaccvtica','antabxbxbtica'];

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMaxLearnWords = (learnCount,words) =>{
    let letters = new Set();
    for(let i=0; i<words.length; i++){
        if(words[i] === '') continue;
        for(let j=0; j<words[i].length; j++){
            letters.add(words[i][j]);
        }
    }
    const unLearned = Array.from(letters);
    if( learnCount >=unLearned.length ) return words.length;
    let max = 0, learned = Array(learnCount);
    const learnLetter = (index,count) =>{
        if(count === learnCount){
            let readableCount = 0;
        loop:for(let i=0; i<words.length; i++){
                if(words[i] === ''){
                    readableCount++;
                    continue;
                }
                for(let j=0; j<words[i].length; j++){
                    if(!learned.includes(words[i][j])) continue loop;
                }
                readableCount++;
            }
            max = Math.max(max,readableCount);
            return;
        }
        for(let i=index; i<unLearned.length; i++){
            learned[count] = unLearned[i];
            learnLetter(i+1,count+1);
        }
    }
    learnLetter(0,0);
    return max;
}
const solution = (input) =>{
    const [N,K] = input[0].split(' ').map(Number);
    if(K < 5) return console.log(0);
    if(K >= 26) return console.log(N);
    const words = Array.from({length:N},(_,i)=>input[i+1].replace(/[antic]/g,""));
    return console.log(getMaxLearnWords(K-5,words));
}
solution(input);