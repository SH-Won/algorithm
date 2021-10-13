const isUnlocked = (copyLock,size) =>{
    for(let i=size; i<2*size; i++){
        for(let j=size; j<2*size; j++){
            if(copyLock[i][j] !== 1) return false;
        }
    }
    return true;
}
const rotateKey = (key) =>{
    const size = key.length;
    let temp = Array.from({length:key.length},()=>Array(key.length));
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            temp[i][j] = key[size-j-1][i];
        }
    }
    return temp;
}
const solution = (key,lock) => {
    const n = lock.length;
    let newLock = Array.from({length:n*3},()=> Array(n*3).fill(null));
    for(let i=n; i<2*n; i++){
        for(let j=n; j<2*n; j++){
            newLock[i][j] = lock[i-n][j-n];
        }
    }
    
    for(let rotate=0; rotate<4; rotate++){
        key = rotateKey(key);
        for(let i=n-key.length; i<(n*3) - key.length ; i++){
            for(let j=n-key.length; j< (n*3) - key.length ; j++){
                let copyLock = newLock.map(row => [...row])
                // newLock.map(row => row) 는 주소 참조?
                for(let y=0; y<key.length; y++){
                    for(let x=0; x<key.length; x++){
                        if(copyLock[y+i][x+j] === 1 && key[y][x] === 1){
                            copyLock[y+i][x+j] = 2;
                        }
                        else if(copyLock[y+i][x+j] === 1 && key[y][x] === 0){
                            copyLock[y+i][x+j] = 1;
                        }
                        else {
                            copyLock[y+i][x+j] = key[y][x];
                        }
                    }
                }
                if(isUnlocked(copyLock,n)) return true;
            }

        }

    }
    return false;
}
const [key,lock] =[[[0, 0, 0], [1, 0, 0], [0, 1, 1]],[[1, 1, 1], [1, 1, 0], [1, 0, 1]]];
console.log(solution(key,lock))