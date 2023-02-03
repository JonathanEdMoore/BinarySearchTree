'use strict'

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
  
function rightRotate(t) {
  let parent = t.parent
  let left = t.left
  t.left = left.right
  if (left.right !== null) {
    left.right.parent = t
  }
  left.right = t
  t.parent = left
  left.parent = parent
  
  if (parent !== null) {
    if (parent.left === t) {
      parent.left = left
    } else {
      parent.right = left
    }
  }
  return left
}
  
function leftRotate(t) {
  let parent = t.parent
  let right = t.right
  t.right = right.left
  if (right.left !== null) {
    right.left.parent = t
  }
  right.left = t
  t.parent = right
  right.parent = parent
  
  if (parent !== null) {
    if (parent.right === t) {
      parent.right = right
    } else {
      parent.left = right
    }
  }
  return right
}
  
function leftRightRotate(t) {
  t.left = leftRotate(t.left)
  t = rightRotate(t)
  return t
}
  
function rightLeftRotate(t) {
  t.right = rightRotate(t.right)
  t = leftRotate(t)
  return t
}
  
function balanceFactor(t) {
  return height(t.right) - height(t.left)
}
  
function rebalance(t) {
  if (balanceFactor(t) < -1 && balanceFactor(t.left) === -1) {
    return rightRotate(t)
  }
  if (balanceFactor(t) > 1 && balanceFactor(t.right) === 1) {
    return leftRotate(t)
  }
  if (balanceFactor(t) < -1 && balanceFactor(t.left) === 1) {
    return leftRightRotate(t)
  }
  if (balanceFactor(t) > 1 && balanceFactor(t.right) === -1) {
    return rightLeftRotate(t)
  }
  return t
}

module.exports = { rightRotate, leftRotate, rightLeftRotate, leftRightRotate, balanceFactor, rebalance }