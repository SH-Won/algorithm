const [subin,sister] = [5,17];
//const fs = require('fs');
//const [subin,sister] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num =>+num);
let visited = Array(100001).fill(false);
let path = Array(100001).fill(0);

const bfs = (subin) =>{
    visited[subin] = true;
    let queue =[[subin,0]];
    while(queue.length) {
        const [cPos,time] = queue.shift();
        if(cPos === sister){
            let str =`${time}\n`
            let current = path[cPos];
            let allPath = [cPos];
            for(let i=0; i<time; i++){
                allPath.push(current);
                current = path[current];
            }
            str+=allPath.reverse().join(' ');
            return console.log(str);
        }
        [cPos+1,cPos-1,cPos*2]
        .forEach(nPos =>{
            if(nPos <0 || nPos >100000 || visited[nPos]) return;

            visited[nPos] = true;
            queue.push([nPos,time+1]);
            path[nPos] = cPos;

        })
    }
}
bfs(subin);
