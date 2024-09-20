import { Tree } from "./binaryTree.mjs";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function getRandomArray(min, max, count) {
  const numbers = new Set();

  while (numbers.size < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }

  return Array.from(numbers);
}

const arr = getRandomArray(1, 1000, 90);

const tree = new Tree(arr);
const root = tree.root;

const newArr = getRandomArray(1, 2000, 140);
newArr.forEach((num) => tree.insert(num));
prettyPrint(root);
tree.reBalance();

console.log(tree.levelOrder((data) => data));

console.log(tree.inOrder((data) => data));

console.log(tree.preOrder((data) => data));

console.log(tree.postOrder((data) => data));
