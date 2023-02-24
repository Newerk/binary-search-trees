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
    if (root.data === value) {
      if (root.left !== null && root.right !== null) {
        console.log(`has left AND right child`);
        let leftMost = getLeftMostLeaf(root.right).data;
        this.delete(leftMost);
        root.data = leftMost;
        return root;

      }

      if (root.left === null && root.right === null) {
        console.log(`has no children`)
        root = null;
        return root;
      }

      if (root.left !== null || root.right !== null) {
        console.log(`has one child`)
        if (root.right === null) {
          root = root.left;
        } else {
          root = root.right;
        }
        return root;
      }

    } else {
      if (value < root.data) {
        console.log('move left')
        root.left = this.delete(value, root.left);

      } else {
        console.log('move right')
        root.right = this.delete(value, root.right);
      }
      return root;
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
    if (callback !== null) {
      this.inorder(callback.left);
      //add value to array
      this.inorder(callback.right);
    }

  }

  preorder(callback) {
    if (callback !== null) {
      //add value to array
      this.preorder(callback);
      this.preorder(callback);
    }
  }

  postorder(callback) {
    if (callback !== null) {
      this.postorder(callback);
      this.postorder(callback);
      //add value to array
    }
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

function getLeftMostLeaf(root) {
  if (root.left === null && root.right === null) {
    console.log(JSON.stringify(root))
    return root;

  } else {
    return getLeftMostLeaf(root.left)
  }

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
tree.insert(2);


tree.delete(8);//code breaks if I remove the root node more than once
// tree.delete(9);




prettyPrint(tree.root);




