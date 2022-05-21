const link = (number,linked,computers) =>{
    const queue = [number];
    linked[number] = true;
    while(queue.length){
        const number = queue.shift();
        for(let nextNum=0; nextNum<computers[number].length; nextNum++){
            if(nextNum === number || linked[nextNum] || computers[number][nextNum] === 0) continue;
            linked[nextNum] = true;
            queue.push(nextNum);
        }
    }
}
const solution = (n,computers) =>{
    const linked = Array(n).fill(false);
    let answer = 0;
    linked.forEach((isLink,number) =>{
        if(isLink) return;
        link(number,linked,computers);
        answer++;
    })
    return answer;
}
console.log(solution(3,[[1, 1, 0], [1, 1, 0], [0, 0, 1]]))