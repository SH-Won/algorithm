function solution(n, m) {
    let answer = [gcf(n,m),lcm(n,m)];

    function gcf(n,m){
        while(m>0){
            let temp = m;
            m = n % m;
            n = temp;
        }

        return n;
    }
    function lcm(n,m){
        return (n*m) / gcf(n,m);
    }
    return answer;
}