const gcf = (a,b) =>{
    // 3 % 5 = 3
    // 5 % 3 = 2
    // 3 % 2 = 1
    // 2 % 1 = 0
    let temp ;
    while(b!==0){
        temp = a;
        a = b;
        b = temp % b;
    }
    return a;
}

const solution = (w,h) =>{
    
    return w*h - (w+h - gcf(w,h));
}