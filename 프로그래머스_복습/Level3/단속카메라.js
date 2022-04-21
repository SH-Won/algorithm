const solution = routes =>{
    routes.sort((a,b) => a[1] - b[1]);
    let camera = -30001;
    let answer = 0;
    routes.forEach(([start,end]) =>{
        if(start < camera){
           camera = end;
           answer++;
        }
    })
    return answer;
}