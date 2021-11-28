const isTransable = (word,nextWord) =>{
    let count = 0;
    for(let i=0; i<word.length; i++){
        if(word[i] !== nextWord[i]) count++;
        if(count === 2) return false;
    }
    return true;
}
const solution = (begin,target,words) =>{
    let visited = Array(words.length).fill(false);
    let queue = [[begin,0]];
    while(queue.length){
        const [word,count] = queue.shift();
        if(word === target) return count
        for(let i=0; i<words.length; i++){
            const nextWord = words[i];
            if(!visited[i] && isTransable(word,nextWord)){
               queue.push([nextWord,count+1]);
               visited[i] = true;
            }
        }
    }
    return 0;
}
const [begin,target,words] =["hit","cog",["hot", "dot", "dog", "lot", "log", "cog"]]
//const [begin,target,words] =["hit","cog",["hot", "dot", "dog", "lot", "log"]]

console.log(solution(begin,target,words));