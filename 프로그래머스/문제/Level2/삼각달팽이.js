const solution = n =>{
    let tri = Array.from({length:n},(_,i)=>Array(i+1));
    let [y,x,num,dir] = [0,0,1,0];
    while(n--){
        if(dir === 0){
           let count = n+1;
           while(count--) tri[y++][x] = num++;
           dir++;
           y--;
           x++;
        }
        else if(dir === 1){
            let count = n+1;
            while(count--) tri[y][x++] =num++;
            dir++;
            x-=2;
            y--;

        }else{
            let count = n+1;
            console.log(count,y,x);
            while(count--) tri[y--][x--] = num++;
            dir = 0;
            y+=2;
            x++;
        }
    }
    return tri.flat();
}
console.log(solution(6));