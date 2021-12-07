const solution = (W,H) =>{

    const gcf = (a,b) =>{
        let temp ;
        while(b > 0){
            temp = b;
            b = a % b ;
            a = temp;
        }
        return temp;
    }
    return W*H - (W+H - gcf(W,H));
}