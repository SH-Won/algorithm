const solution = routes =>{
    routes.sort((a,b) => a[0] - b[0]);
    let camPos = -30000;
    let cam = 0;
    for(let i=0; i<routes.length; i++){
        const [start,end] = routes[i];
        if(camPos < start){
            cam++;
            camPos = end;
        }
    }
    return cam;
}