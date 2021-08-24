let s ='010203'.replace(/[0-9]/g,'*',);
    console.log(s)

function solution(phone_number) {
    let answer = phone_number.substring(0,phone_number.length-4).replace(/[0-9]/g,'*') 
                 + phone_number.substring(phone_number.length-4)
    
    return answer;
}