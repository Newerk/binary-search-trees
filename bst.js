class Node() {
  contructor(data) {
  this.data = data;
  this.left = null;
  this.right = null;
  }
}

class Tree() {
  constructor(array){
  this.array = array;
  this.root = buildTree(array, 0, array.length-1);
  }
}

function buildTree(array, start, end){
  if(start > end){
  return null;
  }
  
  let mid = (start+end/2);
  let node = new Node(array[mid]);
  
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  
  return node;
}
