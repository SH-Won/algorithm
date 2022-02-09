const input = ['5 6','1','5 1 1','1 2 2','2 4 5','2 3 4','3 4 6','1 3 3']
// const input = ['2 2','1','1 2 2','1 2 3']
// const input = ['2 2','1','1 2 1','1 2 2']
// const input = ['4 1','1','4 2 3']
// const input = ['1 1','1','1 2 2']
// const input = ['2 1','1','1 2 2'];
// const input = ['2 4','2','1 2 1','1 2 2','1 2 3','1 2 4']
// const input = ['5 6','1','5 1 1','1 2 2','1 3 4','2 3 1','2 4 11','3 4 6'] // 0 2 3 9 INF;
// const input = ['4 5','1','1 3 2','3 2 4','1 4 2','4 2 1','1 3 5'] // 0 3 2 2

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function Node(vertex,weight = 0){
    this.vertex = vertex;
    this.weight = weight;
    this.link = null;
}
function Graph(size){
    this.graph = Array.from({length:size},(e,i)=> new Node(i,0));

    const insertNode = (v1,v2,w) => {
        //  const v1Node = new Node(v1,w);
         const v2Node = new Node(v2,w);
         let graph1 = this.graph[v1];
        //  let graph2 = this.graph[v2];
         if(graph1.link === null) graph1.link = v2Node;
         else{
             while(graph1.link !== null){
                 graph1 = graph1.link;
             }
             graph1.link= v2Node;
         }
        //  if(graph2.link === null) graph2.link = v1Node;
        //  else{
        //      while(graph2.link !==null){
        //          graph2 = graph2.link;
        //      }
        //      graph2.link = v1Node;
        //  }
         return;
    }
    Graph.prototype.insertEdge = insertNode
    Graph.prototype.getGrape = () => this.graph;
}

const heapPush = (h,g,move,visited) =>{
    while(g.link !== null){
        g = g.link;
        // if(!visited[g.vertex]){
            if(!h.length) h.push({v:g.vertex, w:g.weight+move});
            else{
                if(h[0].w > g.weight){
                    let temp = h[0];
                    h[0] = {v:g.vertex , w:g.weight+move};
                    h.push(temp);
                }
                else{
                    h.push({v:g.vertex, w:g.weight+move});
                }
            }
        // }
    }
}
const heapPop = h =>{
    const item = h[0];
    const lastItem = h.pop();
    if(!h.length) return item;
    let idx = 0;
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
    const size = graph.length;
    const visited = Array(size).fill(false);
    const dist = Array(size).fill(Infinity);
    const heap = [];
    let move = 0;
    let g = graph[start];
    heap.push({v:g.vertex , w:g.weight});
    while(heap.length){
        g = heapPop(heap);
        // if(!visited[g.v]){
        //     visited[g.v] = true;
        //     move = g.w;
        //     dist[g.v] = move;
        //     heapPush(heap,graph[g.v],move,visited);
        // }
        move = g.w;
        if(dist[g.v] > move){
            dist[g.v] = move;
            heapPush(heap,graph[g.v],move,visited);
        }
    }
    return dist;
}

const solution = input =>{
    const [V,E] = input[0].split(' ').map(Number);
    const start = +input[1];
    const graph = new Graph(V+1);
    for(let i=2; i<2+E; i++){
        const [u,v,w] = input[i].split(' ').map(Number);
        graph.insertEdge(u,v,w);
    }
    const dist = dijkstra(start,graph.getGrape());
    let answer = '';
    for(let i=1; i<dist.length; i++){
        if(dist[i] === Infinity) answer+='INF\n';
        else answer+=`${dist[i]}\n`;
    }
    console.log(answer.trim());
}
solution(input);
