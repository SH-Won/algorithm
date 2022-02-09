// 선형 자료 구조 + 선형탐색을 이용한 다익스트라
// const arr = [
//     [0,2,5,1,Infinity,Infinity],
//     [2,0,3,2,Infinity,Infinity],
//     [5,3,0,3,1,5],
//     [1,2,3,0,1,Infinity],
//     [Infinity,Infinity,1,1,0,2],
//     [Infinity,Infinity,5,Infinity,2,0]
// ]
// const visited = new Array(arr.length).fill(false);
// const getMin = (vertex) =>{
//     let min = Infinity;
//     let idx = 0;
//     for(let i=0; i<vertex.length; i++){
//         if(min > vertex[i] && !visited[i]){
//             min = vertex[i];
//             idx = i;
//         }
//     }
//     return idx;
// }
// const dist = (start) =>{
//     let v = arr[start-1];
//     let count = 0;
//     let end = v.length;
//     let min = 0;
//     let startV = v;
//     visited[start-1] = true;
//     while(count < end){
//         const idx = getMin(startV);
//         min+=startV[idx];
//         const next = arr[idx];
//         for(let i=0; i<v.length; i++){
//             if(v[i] > next[i]+min && !visited[i]) v[i] = next[i]+min;
//         }
//         startV = arr[idx];
//         visited[idx] = true;
//         count++;
//     }
//     console.log(v);
// }

// 최소 힙을 이용한 다익스트라

class Node{
    constructor(vertex,weight=0){
        this.vertex = vertex;
        this.weight = weight;
        this.link = null;
    }
}
function Graph(size){
    this.graph = Array.from({length:size},(e,i) => new Node(String.fromCharCode(65+i)));
    const insertNode = (v1,v2,w) =>{
        const v1Node = new Node(v1,w);
        const v2Node = new Node(v2,w);
        const v1Idx = v1.charCodeAt(0) - 65;
        const v2Idx = v2.charCodeAt(0) - 65;
        let graph1 = this.graph[v1Idx];
        let graph2 = this.graph[v2Idx];
        if(graph1.link === null){
            graph1.link = v2Node;
        }
        else{
            while(graph1.link !==null){
                graph1 = graph1.link;
            }
            graph1.link = v2Node;
        }
        // if(graph2.link === null){
        //     graph2.link = v1Node;
        // }
        // else{
        //     while(graph2.link !== null){
        //         graph2 = graph2.link;
        //     }
        //     graph2.link = v1Node;
        // }
        return;
    }
    Graph.prototype.insertEdge = insertNode;
    Graph.prototype.printGraph = () =>{
        for(let i=0; i<size; i++){
            let graph = this.graph[i];
            let print = graph.vertex;
            while(graph.link !==null){
                graph = graph.link;
                print += `--[${graph.weigth}]--${graph.vertex}`;
            }
            console.log(print);
        }
    }
    Graph.prototype.getGraph = () => this.graph;
}
// 매개변수 : 힙, 그래프, 이동거리(가중치), 방문여부;
const heapPush = (h,g,move,visited) =>{
    while(g.link !==null){
        g = g.link;
        let idx = g.vertex.charCodeAt(0) - 65;
        if(!visited[idx]){
            if(!h.length) h.push({v:g.vertex, w:g.weight + move});
            else {
                if(h[0].w > g.weight){
                    let temp = h[0];
                    h[0] = {v:g.vertex, w:g.weight+move};
                    h.push(temp);
                }else{
                    h.push({v:g.vertex, w:g.weight+move});
                }
            } 
        }
    }
}
const heapPop = h =>{
    const item = h[0];
    const lastItem = h.pop();
    let idx = 0;
    if(!h.length) return item;
    h[0] = lastItem;
    while(h[idx*2+1] || h[idx*2+2]){
        let temp = 0;
        if(h[0].w > h[idx*2+1].w){
            temp = h[0];
            h[0] = h[idx*2+1];
            h[idx*2+1] = temp;
            idx = idx*2+1;
        }
        else if(h[idx*2+2] && h[0].w > h[idx*2+2].w){
            temp = h[0];
            h[0] = h[idx*2+2];
            h[idx*2+2] = temp;
            idx = idx*2+2;
        }
        else idx++;
    }
    return item;
}
const dijkstra = (start,graph) =>{
    const size = graph.length; // 정점갯수;
    const visited = Array(size).fill(false);
    const dist = Array(size).fill(Infinity)
    const heap = [];
    let move = 0;
    let idx = start.charCodeAt(0) - 65;
    let g = graph[idx];
    heap.push({v:g.vertex, w:g.weight});
    while(heap.length){
        g = heapPop(heap);
        idx = g.v.charCodeAt(0) - 65;
        if(!visited[idx]){
            visited[idx] = true;
            move = g.w;
            dist[idx] = move;
            
            heapPush(heap,graph[idx],move,visited);
        }
    }
    return dist;
}
const main = () =>{
    const graph = new Graph(6);
    graph.insertEdge("A","B",1);
    graph.insertEdge("A","C",9);
    graph.insertEdge("B","C",10);
    graph.insertEdge("B","D",2);
    graph.insertEdge("C","D",5);
    graph.insertEdge("C","E",1);
    graph.insertEdge("D","E",1);
    graph.insertEdge("E","F",2);

    dijkstra('A',graph.getGraph())
}
// main();
const solution = () =>{
    const graph = new Graph(6);
    graph.insertEdge("E","A",1);
    graph.insertEdge("A","B",2);
    graph.insertEdge("A","C",3);
    graph.insertEdge("B","C",4);
    graph.insertEdge("B","D",5);
    graph.insertEdge("C","D",6);
    graph.insertEdge("B","F",2);
    const dist = dijkstra('A',graph.graph);
    console.log(dist);
}
solution();
// const graph = new Graph(6);
// graph.insertEdge('A','B',2);
// console.log(graph.getGraph())

