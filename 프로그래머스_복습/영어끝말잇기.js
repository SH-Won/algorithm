const solution = (n,words) =>{
    for(let i=1; i<words.length; i++){
         const [prev,cur] = [words[i-1],words[i]];
         if(prev[prev.length-1] !== cur[0] || words.slice(0,i).includes(cur)){
             const [people,order] = [ i % n , i / n >>0 ];
             return [people+1,order+1];
         }
    }
    return [0,0];
}