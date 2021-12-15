const solution = (routes) =>{
    let answer = 0 , camera = -30001;
    routes.sort((a,b) => a[1] - b[1]);
    for(let i=0; i<routes.length; i++){
        const [start,end] = routes[i];
        if(camera < start){
            answer++;
            camera = end;
        }
    }
    return answer;
}