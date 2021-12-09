const solution = (bridge_length,weight,truck_weights) =>{
    let bridge = Array(bridge_length).fill(0);
    let time = 0 , onBridgeWeight = 0;
    while(bridge.length){
        const crossTruckWeight = bridge.shift();
        onBridgeWeight -= crossTruckWeight;
        if(truck_weights.length){
            const truckWeight = truck_weights[0];
        if(onBridgeWeight+truckWeight <= weight){
            const truckWeight = truck_weights.shift();
            onBridgeWeight+=truckWeight;
            bridge.push(truckWeight);
        }
        else{
            bridge.push(0);
        }
       }
       
        time++;
    }
    return time;
}
console.log(solution(2,10,[7,4,5,6]));