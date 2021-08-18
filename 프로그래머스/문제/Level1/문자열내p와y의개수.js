function solution(s){
    
    let count = 0;
    if(s.length ===0) return true;
    // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    for(let i=0; i<s.length; i++){
        if(s[i] ==='p' || s[i] ==='P'){
            count++;
        }
        if(s[i] ==='y' || s[i] ==='Y'){
            count--;
        }
    }
    

    return count ===0 ? true : false;
}