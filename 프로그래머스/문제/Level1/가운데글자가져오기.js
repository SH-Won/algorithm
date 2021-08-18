function solution(s) {
    let middleLetter = Math.floor(s.length / 2);
    let answer = s.length % 2 ===1 ? s.substr(middleLetter,1) : s.substr(middleLetter-1,2);

    return answer;
}