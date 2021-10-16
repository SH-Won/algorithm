const [genres,plays] = [["classic", "pop", "classic", "classic", "pop"],[500, 600, 150, 800, 2500]];

const solution = (genres,plays) =>{
    let album = Array.from({length:genres.length},(_,i)=>{
        return {number:i,genre:genres[i],time:plays[i]}
    }).sort((a,b)=>{
        if(a.time === b.time) return a.number - b.number;
        return b.time - a.time;
    })
    let totalTime = {};
    let genreNumber ={};
    //console.log(album);
    for(let i=0; i<album.length; i++){
        const {number,genre,time} = album[i];
        totalTime[genre] ? totalTime[genre]+=time : totalTime[genre] =time;
        genreNumber[genre] ? genreNumber[genre].push(number) : genreNumber[genre] = [number];
        
    }
    
    totalTime = Object.entries(totalTime).sort((a,b)=>b[1]-a[1]);
    const bestAlbum = totalTime.reduce((acc,cur)=>{
        const genre = cur[0];
        return [...acc,...genreNumber[genre].slice(0,2)]
    },[])
    return bestAlbum;
 
}
console.log(solution(genres,plays))

