const rotateKey = (key) =>{
    const length = key.length;
    let temp = Array.from({length},()=>Array(length));
    for(let i=0; i<length; i++){
        for(let j=0; j<length; j++){
            temp[j][length-1-i] = key[i][j]
        }
    }
    return temp
}
const checkUnLock = (copyLock,length) =>{
    for(let i=length; i<2*length; i++){
        for(let j=length; j<2*length; j++){
            if(copyLock[i][j] !==1) return false;
        }
    }
    return true;
}

const solution = (key,lock) =>{
    const N = lock.length;
    const M = key.length;
    let newLock = Array.from({length:N*3},()=>Array(N*3).fill(0));
    for(let i=N; i<2*N; i++){
        for(let j=N; j<2*N; j++){
            newLock[i][j] = lock[i-N][j-N];
        }
    }
    for(let rotate=0; rotate<4; rotate++){
        key = rotateKey(key);
        for(let i=N-M; i<2*N; i++){
            for(let j=N-M+1; j<2*N; j++){
               let copyLock = newLock.map(row => [...row]);
               for(let y=0; y<M; y++){
                   for(let x=0; x<M; x++){
                       if(copyLock[i+y][j+x] ===1 && key[y][x] === 0){
                           copyLock[i+y][j+x] = 1;
                       }
                       else if(copyLock[i+y][j+x] === 0 && key[y][x] ===1){
                           copyLock[i+y][j+x] = 1;
                       }
                       else copyLock[i+y][j+x] = 2;
                   }
               }
               const isUnLock =checkUnLock(copyLock,N);
               if(isUnLock) return true;
            }
        }

    }
    return false;
}
console.log(solution([[0, 0, 0], [1, 0, 0], [0, 1, 1]],[[1, 1, 1], [1, 1, 0], [1, 0, 1]]));