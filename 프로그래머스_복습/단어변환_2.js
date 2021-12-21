const isPossible = (word1,word2) =>{
    let count = 0;
    for(let i=0; i<word2.length; i++){
        if(word1[i] === word2[i]) continue;
        else{
            count++;
            if(count >=2) return false;
        }
    }
    return true;
}
const getMinStep = (begin,target,words) =>{
    let visited = Array(words.length).fill(false);
    let queue = [[begin,0]];
    while(queue.length){
        const [word,time] = queue.shift();
        if(word === target) return time;
        for(let i=0; i<words.length; i++){
            if(visited[i]) continue;

            if(isPossible(word,words[i])){
                queue.push([words[i],time+1]);
                visited[i] = true;
            }
        }
    }
}
const solution = (begin,target,words) =>{
    if(!words.includes(target)) return 0;
    return getMinStep(begin,target,words);
}