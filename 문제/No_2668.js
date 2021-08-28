const fs = require('fs');
let [N,...secondTable] =fs.readFileSync('/dev/stdin').toString().trim().split('\n');
secondTable = secondTable.map(num => +num).filter((num,i,array) =>array.indexOf(num) === i)

//console.log([])
// [[],[3],[1],[1],[5],[5],[4],[6]]
// 1 3 4 5 6


function dfs()
