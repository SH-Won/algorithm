const solution = (genres,plays) =>{
    // 원하는것은 1. 가장재생많이된 장르 2.장르내에서 많이재생 3.재생같으면 고유번호 낮은거
    let playTime = new Map();
    let songInfo = new Map();
    genres.forEach((genre,index) =>{
        !playTime.has(genre) ? playTime.set(genre,plays[index]) : playTime.set(genre,playTime.get(genre) + plays[index]);
        if(songInfo.has(genre)){
            const info = songInfo.get(genre);
            info.push([plays[index],index]);
            songInfo.set(genre,info);
        }
        else{
            songInfo.set(genre,[[plays[index],index]]);
        }
    })
    const bestAlbum = Array.from(playTime).sort((a,b)=>b[1]-a[1]).reduce((acc,cur)=>{
        const [genre,totalPlayTime] = cur;
        const songs = songInfo.get(genre).sort((a,b)=>{
            if(b[0] === a[0]) return a[1] - b[1];
            return b[0] - a[0]
        }).slice(0,2).map(el => el[1]);
        acc.push(...songs);
        return acc;
    },[])
    return bestAlbum;
}
console.log(solution(["classic", "pop", "classic", "classic", "pop"],[500, 600, 150, 800, 2500]))