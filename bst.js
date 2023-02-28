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
        if (value === this.root.data) {
          let leftMost = getLeftMostLeaf(this.root.right).data;
          this.delete(leftMost);
          this.root.data = leftMost;
          return this.root;

        } else {
          let leftMost = getLeftMostLeaf(root.right).data;
          this.delete(leftMost);
          root.data = leftMost;
          return root;
        }
      }

      if (root.left === null && root.right === null) {
        root = null;
        return root;
      }

      if (root.left !== null || root.right !== null) {
        if (root.right === null) {
          root = root.left;
        } else {
          root = root.right;
        }
        return root;
      }

    } else {
      if (value < root.data) {
        root.left = this.delete(value, root.left);

      } else {
        root.right = this.delete(value, root.right);
      }
      return root;
    }
  }

  find(value, root = this.root) {
    try {
      if (root.data === value) {
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
    }

  }

  levelOrder(root = this.root, callback) {
    if (callback) {//if function is provided, execute function on each node
      if (root === null) {
        return callback(root);
      } else {
        callback(root.left);
        callback(root.right)
      }
    }
    if (root === null) {
      return;
    }

    let queue = [root];
    let output = [root.data];

    while (queue.length > 0) {
      if (queue[0].left !== null) {
        output.push(queue[0].left.data)
        queue.push(queue[0].left)
      }
      if (queue[0].right !== null) {
        output.push(queue[0].right.data)
        queue.push(queue[0].right)
      }
      queue.shift();
    }
    return output;

  }

  inorder(root = this.root, array = [], callback) {
    if (root === null) {
      return array;
    } else {
      this.inorder(root.left, array, callback);
      array.push(root.data);
      this.inorder(root.right, array, callback);

      return array;
    }
  }

  preorder(root = this.root, array = [], callback) {
    if (root === null) {
      return array;
    } else {
      array.push(root.data);
      this.preorder(root.left, array, callback);
      this.preorder(root.right, array, callback);

      return array;
    }
  }

  postorder(root = this.root, array = [], callback) {
    if (root === null) {
      return array;
    } else {
      this.postorder(root.left, array, callback);
      this.postorder(root.right, array, callback);
      array.push(root.data);

      return array;
    }
  }

  height(node, height = 0, paths = []) {
    if (node !== null) {
      this.height(node.left, height + 1, paths);
      this.height(node.right, height + 1, paths);

      if (node.left === null && node.right === null) {
        paths.push(height);
      }

      return Math.max(...paths);
    }
  }

  depth(node) {
    if (node === null) {
      return 0;
    }
    let left = this.depth(node.left);
    let right = this.depth(node.right);

    return 1 + Math.max(left, right);
  }

  isBalanced() {
    if (this.root === null) {
      return;
    }
    let leftH = this.height(this.root.left)
    let rightH = this.height(this.root.right)
    let difference = (leftH > rightH) ? leftH - rightH : rightH - leftH;

    return (difference > 1) ? false : true;
  }

  rebalance() {
    let array = this.preorder();
    this.array = deleteDupe(array.sort((a, b) => a - b));
    this.root = buildTree(array, 0, array.length - 1);
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
  if (root.left === null) {
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


tree.delete(8);
tree.delete(9);
tree.delete(23);

//making tree unbalanced
tree.delete(324);
tree.delete(6345);



// console.log(tree.levelOrder())
// console.log(`inorder: ${tree.inorder()}`)
// console.log(`preorder: ${tree.preorder()}`)
// console.log(`postorder: ${tree.postorder()}`)

console.log(tree.height(tree.root))
console.log('depth: ' + tree.depth(tree.root))

console.log(tree.isBalanced());

tree.rebalance();


prettyPrint(tree.root);



