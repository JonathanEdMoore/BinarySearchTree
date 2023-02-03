/* eslint-disable no-console */
'use strict'

const { BinarySearchTree } = require('./binarySearchTree');
const { rightRotate, leftRotate, leftRightRotate, rightLeftRotate, balanceFactor, rebalance } = require('./bst_helpers')

function tree(t) {
  //If tree is empty, return with a sum of 0
  if (!t) {
    return 0
  }
  //Otherwise, return the sum of the left subtree and right subtree
  return tree(t.left) + t.value + tree(t.right)
}

function isABst(t) {
  if ((!t.hasOwnProperty('left') && !t.hasOwnProperty('right')) && ((!t.hasOwnProperty('key') && !t.hasOwnProperty('value')) && !t.hasOwnProperty('parent'))) {
    return false
  }
  else {
    if (t.left && t.right) {
      if (t.left.value > t.value || t.right.value < t.value) {
        return false
      }
      return (isABst(t.left) && isABst(t.right))
    }
    else if (t.left) {
      if (t.left.value > t.value) {
        return false
      }
      return isABst(t.left)
    }
    else if (t.right) {
      if (t.right.value < t.value) {
        return false
      }
      return isABst(t.right)
    }
    return true
  }
}

function nth_largest(t, state) {
  if (t.right) {
    nth_largest(t.right, state)
    if (state.result) {
      return
    }
  }
  if (!--state.n) {
    state.result = t.key
    return
  }
  if (t.left) {
    nth_largest(t.left, state)
  }
}

function third_largest(t) {
  if (t.key === null) {
    return null
  }
  let state = { n: 3, result: null }
  nth_largest(t, state)
  return state.result
}

function isBalanced(t) {
  return ((!t) ||
    (isBalanced(t.left) &&
      isBalanced(t.right) &&
      Math.abs(height(t.left) - height(t.right)) <= 1
    )
  )
}

function isIdenticalTree(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }
  if (arr1.length === 0) {
    return true
  }
  if (arr1[0] !== arr2[0]) {
    return false
  }
  else {
    const arr1Left = []
    const arr1Right = []
    const arr2Left = []
    const arr2Right = []
    for (let i = 1; i < arr1.length; i++) {
      if (arr1[i] < arr1[0]) {
        arr1Left.push(arr1[i])
      }
      else {
        arr1Right.push(arr1[i])
      }
    }
    for (let i = 1; i < arr2.length; i++) {
      if (arr2[i] < arr2[0]) {
        arr2Left.push(arr2[i])
      }
      else {
        arr2Right.push(arr2[i])
      }
    }
    if (isIdenticalTree(arr1Left, arr2Left)) {
      if (isIdenticalTree(arr1Right, arr2Right)) {
        return true
      }
    }
  }
  return false
}

function main() {
  let tree = new BinarySearchTree()
  let arr = [1, 2, 3, 4, 5, 6]

  tree.insert(1, 1)
  

  tree.insert(2, 2)
  
 

  tree.insert(3, 3)

  console.log(tree)
  
  

  

}

main()