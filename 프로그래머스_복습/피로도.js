
const solution = (k,dungeons) =>{
    const n = dungeons.length;
    let visited = Array(n).fill(false);
    let order = Array(n);
    let max = 0;
    const getMaxExploreCount = (count) =>{
        if(count === n){
            let count = 0, hp = k;
            for(let i=0; i<order.length; i++){
                const nth = order[i];
                const [startHP,consume] = dungeons[nth];
                if(hp < startHP) continue;
                hp-=consume;
                count++;
            }
            max = Math.max(count,max);
            return;
        }
        for(let i=0; i<n; i++){
            if(!visited[i]){
                visited[i] = true;
                order[count] = i;
                getMaxExploreCount(count+1);
                visited[i] = false;
            }
        }
    }
    getMaxExploreCount(0);
    return max;
}