//const input =['2','-1 0','1'];
//const input = ['5','-1 0 0 1 1','0'];
//const input =['9','-1 0 0 2 2 4 4 6 6','4'];
const fs= require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const node = input[1].split(' ').map(num => +num);
const removeNode = +input[2];
//let visited = Array(N).fill(false);
let tree = Array.from({length:N},()=>[]);
let rootNode ;
let count =0;
for(let i=0; i<node.length; i++){
    
    if(node[i] === -1){
        rootNode = i
        if(rootNode === removeNode){
            break;
        }
        continue;
    }
    if(i === removeNode) continue;
    
    tree[node[i]].push(i);
}

if(rootNode !== removeNode){
    dfs(rootNode);
}

function dfs(node){

    if(tree[node].length ===0){
        //지금 정점의 자식이 없다. 즉 마지막 깊이에있는 노드이므로 count++
        count++;
        return;
    }
    // if(node === removeNode){
        
    //     return;
    // }

    for(let i=0; i<tree[node].length; i++){
            
            dfs(tree[node][i]);
    }
    
}
console.log(count);

//      0
//    1   2
//   3 4
// removeNode 를 처음부터 배제하는 방법
// rootNode 와 removeNode 가 같다면 count 는 무조건 0
// tree 를 만들때 removeNode 를 배제하면, 
// removeNode 에 연결된 자식 노드들은 tree 배열에 추가가 되겠지만,
// 이미 removeNode는 배제했으므로 루트에서 removeNode 자식에 도달할수가 없다.
// 

