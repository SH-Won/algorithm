
function solution(w,h){
    let answer ;
    // 3 % 5 = 2
    // 5 % 2 = 1
    // 2 % 1 = 0

    const g = (w,h) =>{
        const mod = w % h;

        if(mod === 0){
            return h;
        }
        return g(h,mod);
    }
    answer = w * h - (w+h -g(w,h));
    return answer;
}