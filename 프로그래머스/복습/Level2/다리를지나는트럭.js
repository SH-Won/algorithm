console.log(solution(2,10,[7,4,5,6]))

function solution(bridge_length,weight,truck_weights){
    let answer = 0;
    let i=0;
    let bridge = Array(bridge_length).fill(0);

    while(bridge.length){
        bridge.shift();

        if(i<truck_weights.length){

            let bridgeWeight = bridge.reduce((acc,cur)=>acc+=cur,0);
            if(bridgeWeight+truck_weights[i] <=weight){
                bridge.push(truck_weights[i])
                i++
            }
            else{
                bridge.push(0);
            }
            

        }
        answer++;
    }
    return answer;
}