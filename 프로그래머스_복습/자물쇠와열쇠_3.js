const isUnLock = (lock) =>{
    const n = lock.length / 3;
    for(let y=n; y<2*n; y++){
        for(let x=n; x<2*n; x++){
            if(lock[y][x] !== 1) return false
        }
    }
    return true;
}
const rotateKey = (key) =>{
    const n = key.length;
    let newKey = Array.from({length:n},()=>Array(n));
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++){
            newKey[x][n-y-1] = key[y][x];
        }
    }
    return newKey;
}
const solution = (key,lock) =>{
    const [n,m] = [lock.length, key.length];
    let newLock = Array.from({length:n*3},()=>Array(n*3).fill(0));
    for(let y=n; y<2*n; y++){
        for(let x=n; x<2*n; x++){
            newLock[y][x] = lock[y-n][x-n];
        }
    }

    for(let rotate=0; rotate<4; rotate++){
        key = rotateKey(key);
        for(let i=n-m; i<2*n; i++){
           for(let j=n-m+1; j<2*n; j++){
               let copyLock = newLock.map(row => [...row]);
               for(let y=0; y<m; y++){
                   for(let x=0; x<m; x++){
                       copyLock[i+y][j+x] += key[y][x];
                   }
               }
               const unLock = isUnLock(copyLock);
               if(unLock) return true;
           }
        }
    }
    return false;
}