const rotateKey = (key) =>{
    const length = key.length;
    const matrix = Array.from({length},()=> Array(length).fill(0));
    for(let y=0; y<length; y++){
        for(let x=0; x<length; x++) matrix[x][length-y-1] = key[y][x];
    }
    return matrix;
}
const isSolved = (copyLock) =>{
    const length = copyLock.length / 3;
    for(let y=length; y<length*2; y++){
        for(let x=length; x<length*2; x++){
            if(copyLock[y][x] !== 1) return false
        }
    } 
    return true;
}
const solution = (key,lock) =>{
    const n = lock.length;
    const m = key.length; 
    const newLock = Array.from({length:n*3},()=>Array(n*3).fill(0));
    
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++) newLock[y+n][x+n] = lock[y][x];
    }
    for(let rotate=0; rotate<4; rotate++){
        key = rotateKey(key);
        for(let i=n-m; i<2*n; i++){
            for(let j=n-m+1; j<2*n; j++){
                const copyLock = newLock.map(row => [...row]);
                for(let y=0; y<m; y++){
                    for(let x=0; x<m; x++){
                        copyLock[y+i][x+j]+= key[y][x];
                    }
                }
                if(isSolved(copyLock)) return true;
            }
        }
    }
    return false;
}