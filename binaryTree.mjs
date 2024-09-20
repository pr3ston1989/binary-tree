export class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.arr = Array.from(new Set(arr.sort((a, b) => a - b)));
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start = 0, end) {
    if (start > end) {
      return null;
    }
    let midIndex = Math.floor((start + end) / 2);
    let rootNode = new Node(arr[midIndex]);
    rootNode.left = this.buildTree(arr, start, midIndex - 1);
    rootNode.right = this.buildTree(arr, midIndex + 1, end);
    return rootNode;
  }

  insert(value, pointer = this.root) {
    if (pointer === null) {
      pointer = new Node(value);
      return;
    }
    if (pointer.left === null && pointer.right === null) {
      if (value < pointer.data) {
        pointer.left = new Node(value);
      } else {
        pointer.right = new Node(value);
      }
      return;
    }

    if (value < pointer.data) {
      this.insert(value, pointer.left);
    } else if (value > pointer.data) {
      this.insert(value, pointer.right);
    } else {
      return;
    }
  }

  delete(value, pointer = this.root) {
    if (pointer === null) {
      return;
    }
    if (value < pointer.data) {
      pointer.left = this.delete(value, pointer.left);
      return pointer;
    } else if (value > pointer.data) {
      pointer.right = this.delete(value, pointer.right);
      return pointer;
    }

    if (pointer.left === null && pointer.right === null) {
      return null;
    }
    if (pointer.left === null) {
      return pointer.right;
    }

    if (pointer.right === null) {
      return pointer.left;
    }

    let temp = this.findMin(pointer.right);
    pointer.data = temp.data;
    pointer.right = this.delete(temp.data, pointer.right);
    return pointer;
  }

  findMin(pointer) {
    while (pointer.left !== null) {
      pointer = pointer.left;
    }
    return pointer;
  }

  find(value, pointer = this.root) {
    if (pointer === null) {
      return null;
    }
    if (value === pointer.data) {
      return pointer;
    }

    if (value < pointer.data) {
      return this.find(value, pointer.left);
    } else if (value > pointer.data) {
      return this.find(value, pointer.right);
    }
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("You need to specify callback function.");
    }
    const q = [];
    const result = [];
    q.push(this.root);
    while (q.length !== 0) {
      let currNode = q[0];

      callback(currNode);

      result.push(currNode.data);

      if (currNode.left !== null) {
        q.push(currNode.left);
      }
      if (currNode.right !== null) {
        q.push(currNode.right);
      }

      q.shift();
    }

    return result;
  }

  inOrder(callback, pointer = this.root, arr = []) {
    if (!callback) {
      throw new Error("You need to specify callback function.");
    }

    if (pointer === null) {
      return;
    }

    this.inOrder(callback, pointer.left, arr);
    callback(pointer);
    arr.push(pointer.data);
    this.inOrder(callback, pointer.right, arr);
    return arr;
  }

  preOrder(callback, pointer = this.root, arr = []) {
    if (!callback) {
      throw new Error("You need to specify callback function.");
    }

    if (pointer === null) {
      return;
    }
    callback(pointer);
    arr.push(pointer.data);
    this.preOrder(callback, pointer.left, arr);

    this.preOrder(callback, pointer.right, arr);
    return arr;
  }

  postOrder(callback, pointer = this.root, arr = []) {
    if (!callback) {
      throw new Error("You need to specify callback function.");
    }

    if (pointer === null) {
      return;
    }

    this.postOrder(callback, pointer.left, arr);

    this.postOrder(callback, pointer.right, arr);
    callback(pointer);
    arr.push(pointer.data);
    return arr;
  }

  height(node, heightL, heightR, search = false, highest) {
    if (search === false) {
      node = this.find(node);
      search = true;
    }

    if (node === null) {
      return -1;
    }

    heightL = this.height(node.left, heightL, heightR, search) + 1;
    heightR = this.height(node.right, heightL, heightR, search) + 1;

    if (heightL > heightR) {
      highest = heightL;
      return highest;
    } else {
      highest = heightR;
      return highest;
    }
  }

  depth(node, search = false, target, depth = 0) {
    if (search === false) {
      target = this.find(node);
      node = this.root;
      search = true;
    }

    if (node === null) {
      return null;
    } else if (node.data === target.data) {
      return depth;
    }

    if (node.data > target.data) {
      depth++;
      return this.depth(node.left, search, target, depth);
    } else if (node.data < target.data) {
      depth++;
      return this.depth(node.right, search, target, depth);
    }
  }

  isBalanced() {
    let heightL = this.height(this.root.left.data);
    let heightR = this.height(this.root.right.data);

    if (Math.abs(heightL - heightR) > 1) {
      return false;
    }
    return true;
  }

  reBalance() {
    const newArr = this.inOrder((data) => data);
    this.root = this.buildTree(newArr, 0, newArr.length - 1);
  }
}
