const solution = routes =>{
    routes.sort((a,b) => a[1] - b[1]);
    let camera = -30001;
    let answer = 0;
    for(let i=0; i<routes.length; i++){
        const [start,end] = routes[i];
        if(camera < start){
            camera = end;
            answer++;
        }
    }
    return answer;
}