// citations 의 갯수중 h번 인용된 논문이 h편 이상이고 나머지가 h편 이하 인용됐을때 h의 최댓값

function solution(citations){
    let answer = 0;
    // 20 19 15 14 9 8 3 2 1
    citations.sort((a,b)=>b-a);
    while(answer + 1 <= citations[answer]){
        answer++;
    }

    return answer;
}