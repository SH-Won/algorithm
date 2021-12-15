const connect = (computer,info,visited) =>{
    visited[computer] = true;
    let queue = [computer];
    while(queue.length){
        const com = queue.shift();
        for(let i=0; i<info[com].length; i++){
            const nextCom = info[com][i];
            if(visited[i] || !nextCom) continue;
            visited[i] = true;
            queue.push(i);
        }
    }
}
const solution = (n,computers) =>{
    let visited = Array(n).fill(false);
    let network = 0;

    for(let i=0; i<n; i++){
        if(!visited[i]){
            connect(i,computers,visited)
            network++;
        }
    }
    return network;
}
// console.log(solution(3,[[1,1,0],[1,1,0],[0,0,1]]));
console.log(solution(3,[[1, 1, 0], [1, 1, 1], [0, 1, 1]]))