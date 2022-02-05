const solution = sizes =>{
    let [w,h] = sizes[0].sort((a,b) => a-b);
    for(let i=1; i<sizes.length; i++){
        const [cw,ch] = sizes[i].sort((a,b) => a-b);
        w = Math.max(w,cw);
        h = Math.max(h,ch);
    }
    return w*h;
}
console.log(solution([[60, 50], [30, 70], [60, 30], [80, 40]]))