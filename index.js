/* eslint-disable no-console */
'use strict'

const { BinarySearchTree } = require('./binarySearchTree');

function tree(t) {
  //If tree is empty, return with a sum of 0
  if (!t) {
    return 0
  }
  //Otherwise, return the sum of the left subtree and right subtree
  return tree(t.left) + t.value + tree(t.right)
}

function height(t) {
  //If three is empty, return with a height of 0
  if (!t) {
    return 0
  }
  /*If there is a left subtree and a right subtree, compare the heights
  of the two subtrees. */
  else if (t.left && t.right) {
    const left = height(t.left)
    const right = height(t.right)
    /*If the left subtree is greater, return the height
    of the left subtree plus 1.*/
    if (left > right) {
      return 1 + left
    }
    /*Otherwise, return the height of the right
    subtree plus 1 */
    else {
      return 1 + right
    }
  }
  /*If there is only a left subtree, return the height of the left subtree
  plus 1 */
  else if (t.left) {
    return 1 + height(t.left)
  }
  /*If there is only a right subtree, return the height of the right subtree
  plus 1 */
  else if (t.right) {
    return 1 + height(t.right)
  }
  //Otherwise, the tree only has one node. So return 1 as the height
  return 1
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
  let BST1 = new BinarySearchTree()
  let BST2 = new BinarySearchTree()
  let arr1 = [3, 1, 4, 6, 9, 2, 5, 7]
  let arr2 = ['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N']
  for (let i = 0; i < arr1.length; i++) {
    BST1.insert(arr1[i], arr1[i])
  }
  for (let i = 0; i < arr2.length; i++) {
    BST2.insert(arr2[i], arr2[i])
  }
  console.log(BST1)
  console.log(tree(BST1))
  console.log(height(BST1))
  console.log(isABst(BST1))
  console.log(third_largest(BST1))
  console.log(isBalanced(BST1))
  console.log(' ')
  console.log(BST2)
  console.log(tree(BST2))
  console.log(height(BST2))
  console.log(isABst(BST2))
  console.log(third_largest(BST2))
  console.log(isBalanced(BST2))
  console.log(' ')

  let arr3 = [3, 5, 4, 6, 1, 2, 0]
  let arr4 = [3, 1, 5, 2, 4, 6, 0]



  console.log(isIdenticalTree(arr3, arr4))

  

}

main()