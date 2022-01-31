const isUnLock = (lock) =>{
    const n = lock.length / 3 ;
    for(let y=n; y<2*n; y++){
        for(let x=n; x<2*n; x++) 
        if(lock[y][x] !== 1) return false;
    } 
    return true;
}
const rotateKey = (key) =>{
    const n = key.length;
    let rotateKey = Array.from({length:n},()=>Array(n));
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++) rotateKey[x][n-1-y] = key[y][x];
    }
    return rotateKey
}
const solution = (key,lock) => {
   const [m,n] = [key.length, lock.length];
   let newLock = Array.from({length:n*3},()=>Array(n*3).fill(0));
   for(let y=0; y<n; y++){
       for(let x=0; x<n; x++) newLock[y+n][x+n] = lock[y][x];
   }
   for(let rotate=0; rotate<4; rotate++){
       key = rotateKey(key);
       for(let y=n-m; y<2*n; y++){
           for(let x=n-m+1; x<2*n; x++){
               let copyLock = newLock.map(row => [...row]);
               for(let i=0; i<m; i++){
                   for(let j=0; j<m; j++){
                    copyLock[y+i][x+j]+= key[i][j];
                   }
               }
               if(isUnLock(copyLock)) return true;
           }
       }
   }
   return false;
}

