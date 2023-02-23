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

  insert(value, root = this.root) {
    if (root === null) {
      root = new Node(value);
      return root;

    } else {
      if (value < root.data) {
        root.left = this.insert(value, root.left);
      }
      if (value > root.data) {
        root.right = this.insert(value, root.right);
      }
      return root;
    }
  }

  delete(value, root = this.root) {
    if (value === root.data) {
      if (root.left === null && root.right === null) { //no children
        console.log('no children')
        
      }

      if ((root.left === null && root.right !== null) ||
       (root.left !== null && root.right == null)) { //one child
        console.log('one child')

      }

      if (root.left !== null && root.right !== null) { //two children
        console.log('two chilren')

      }

      
    } else {
      if (value < root.data) {
        return this.delete(value, root.left);
      }
      if (value > root.data) {
        return this.delete(value, root.right);
      }

    }

  }

  find(value, root = this.root) {
    try {
      if (root.data === value) {
        console.log(root);
        return root;
      } else {
        if (value < root.data) {
          return this.find(value, root.left);
        }
        if (value > root.data) {
          return this.find(value, root.right);
        }
      }
    } catch (error) {
      console.log('value does not exist');
    }

  }

  levelOrder(callback) {

  }

  inorder(callback) {

  }

  preorder(callback) {

  }

  postorder(callback) {

  }

  height(node) {

  }

  depth(node) {

  }

  isBalanced() {

  }

  rebalance() {

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

tree.insert(33);

prettyPrint(tree.root);
