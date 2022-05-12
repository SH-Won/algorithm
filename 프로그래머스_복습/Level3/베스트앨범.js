const solution = (genres,plays) =>{
    const info = genres.map((genre,index) => ( {genre,play : plays[index],index} ));
    info.sort((a,b) =>{
        if(a.play === b.play) return a.index - b.index;
        return b.play - a.play;
    })
    const playMap = {} , indexMap = {};
    info.forEach(({genre,play,index}) =>{
        playMap[genre] = (playMap[genre] || 0) + play;
        indexMap[genre] ? indexMap[genre].push(index) : indexMap[genre] = [index];
    })
    
    return Object.entries(playMap).sort((a,b) => b[1] - a[1]).reduce((acc,cur) =>{
        const [genre,play] = cur;
        acc.push(...indexMap[genre].slice(0,2));
        return acc;
    } ,[])
    
}
console.log(solution(["classic", "pop", "classic", "classic", "pop"],[500, 600, 150, 800, 2500]))