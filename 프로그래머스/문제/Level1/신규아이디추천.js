function solution(new_id) {    
    const answer = new_id
        .toLowerCase()
        .replace(/[^\w-_.]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace(/^\.|\.$/g, '')
        .replace(/^$/, 'a')
        .slice(0, 15).replace(/\.$/, '');
    const len = answer.length;
    return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}

// [ 정규표현식 정리하기 ]
// ^ : 문장의 시작
// $ : 문장의 끝
// \w : word 문자
// .{2,} : .이 최소 2개 이상
// | : 또는