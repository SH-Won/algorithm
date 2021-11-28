const solution = (routes) =>{
    let camera = -30001;
    let count = 0;
    routes.sort((a,b) => a[1] - b[1]);
    for(let i=0; i<routes.length; i++){
        const [start,end] = routes[i];
        if(start > camera){
            count++;
            camera = end;
        }
    }
    return count;
}