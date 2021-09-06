const [subin,sister] = [5,17];
//const fs = require('fs');
//const [subin,sister] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);

let sec = Array(100001).fill(-1);
let count = Array(100001).fill(0);

const bfs = (subin) => {
    count[subin] = 1;
    sec[subin] = 0;
    let queue = [subin];
    while(queue.length){
        const cPos = queue.shift();
        if(cPos === sister){
            const str = `${sec[sister]}\n${count[sister]}`
            return str
        }

        [cPos+1,cPos-1,cPos*2]
        .forEach(nPos =>{
            if(nPos < 0 || nPos > 100000) return;

            if(sec[nPos] === -1){
                sec[nPos]  = sec[cPos] + 1;
                count[nPos] = count[cPos];
                queue.push(nPos);
            }
            else if(sec[nPos] === sec[cPos] + 1){
                count[nPos] += count[cPos];
            }
        })
    }

}
const answer = bfs(subin);
console.log(answer);