class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = deleteDupe(array.sort((a, b) => a - b));
    this.root = buildTree(this.array, 0, this.array.length - 1);
  }
}

function buildTree(array, start, end) {

  if (start > end) {
    return null;
  }

  let mid = Math.round((start + end) / 2);
  let node = new Node(array[mid]);

  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);

  return node;
}

function deleteDupe(array) {
  let noDupes = [];

  array.forEach(el => {
    if (!noDupes.includes(el)) {
      noDupes.push(el)
    }
  })

  return noDupes;
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}



let unsortedArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(unsortedArr);
prettyPrint(tree.root);