
const solution = (begin,target,words) =>{

    const isTransable = (word1,word2) =>{
         let count = 0;
         for(let i=0; i<word2.length; i++){
             if(word1[i] !== word2[i]) count++;
             if(count >= 2) return false;
         }
         return true;
    }
    const visited = Array(words.length).fill(false);
    const queue = [[begin,0]];
    while(queue.length){
        const [word,count] = queue.shift();
        if(word === target) return count;
        for(let i=0; i<words.length; i++){
            if(visited[i] || !isTransable(word,words[i])) continue;
            queue.push([words[i],count+1]);
            visited[i] = true;
        }
    }
}
console.log(solution('hit','cog',["hot", "dot", "dog", "lot", "log", "cog"]))