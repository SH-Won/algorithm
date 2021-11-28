//const input = ['8 7','5 2 3 14 9 2 11 8'];
//const input = ['8 4','5 2 3 14 9 2 11 8']
//const input = ['8 3','5 2 3 14 9 2 11 8']
//const input = ['8 2','5 2 3 14 9 2 11 8'];
//const input = ['8 1','5 2 3 4 14 9 2 11 8']
//const input = ['8 0','5 2 3 14 9 2 11 8']
//const input = ['4 0','1 10000 1 10000']
//const input = ['16 0','1 1 10000 1 2 3 10000 9999 10 9 8 10000 5 4 3 1']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,K] = input[0].split(' ').map(Number);
const fishBowl = input[1].split(' ').map(Number);
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const control = (map) =>{
    let newMap = Array.from({length:N+2},()=>Array(N+1).fill(0));

    for(let y=1; y<=N; y++){
        for(let x=0; x<N; x++){
            if(!map[y][x]) continue;
            let totalReduce = 0;
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || !map[ny][nx] || map[y][x] <= map[ny][nx]) continue;
                const reduce = Math.floor((map[y][x] - map[ny][nx]) / 5);
                totalReduce+=reduce;
                newMap[ny][nx] +=reduce;
            }
            newMap[y][x] +=(map[y][x] - totalReduce);
        }
    }
    let column = N-1;
    let linear = [];
    while(newMap[N][column]){
        let row = N;
        let array = [];
        while(newMap[row][column]){
            array.push(newMap[row][column]);
            newMap[row][column] = 0;
            row--;
        }
        column--;
        array.reverse();
        linear.push(...array);
    }
    for(let x=0; x<=N; x++){
        newMap[N][x] = linear.pop();
    }
    //  console.log(newMap.map(row => row.join(' ')).join('\n'))
    return newMap;
}

let answer = 0;
const solution = (fishBowl) =>{
    let map = Array.from({length:N+2},()=>Array(N+1).fill(0));
    for(let i=0; i<fishBowl.length; i++){
       map[N][i] = fishBowl[i];
    }
    
    while(true){
        let min = Math.min(...map[N].slice(0,-1));
        for(let i=0; i<map[N].length; i++){
            if(map[N][i]  === min) map[N][i]++;
        }
        [map[N][0],map[N-1][1]] = [map[N-1][1],map[N][0]];
        
        let start = 2;
        let acc = 2;
        while(start+acc <=N){
            let row = N;
            let column = start - 1;
            let count = 0;
            let array = [];
            while(map[N][column]){
                let r = N;
                let length = acc;
                while(length--){
                    array.push(map[r][column]);
                    map[r][column] = 0;
                    r--;
                }
                count++;
                column--;
                array.reverse();
                for(let x=start; x<start+acc; x++){
                    map[row-count][x] = array.pop();
                }
                
            }
            start+=(acc);
            acc = 1+count;
        }

        map = control(map);
        
        start = 0;
        let end = 0;
        let row = 1;
        let n = N;
        let rowCount = 0;
        let count =2 ;
        while(count--){
            end += (n /= 2);
            let array = [];
            for(let y=N; y>N-row; y--){
                for(let x=end-1; x>=start; x--){
                   array.push(map[y][x]);
                   map[y][x] = 0;
                }
            }
            array.reverse();
            for(let y=N-row-rowCount; y<N-rowCount; y++){
                for(let x=end; x<N; x++){
                    map[y][x] = array.pop();
                }
            }
            start = end;
            row++;
            rowCount++;
        }
        map = control(map);

        const bowls = map[N].slice(0,-1);
        const minBowl = Math.min(...bowls);
        const maxBowl = Math.max(...bowls);
        answer++;
        if(maxBowl - minBowl <= K) return console.log(answer);
    }
}
solution(fishBowl);