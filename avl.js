'use strict'

const { BinarySearchTree } = require('./binarySearchTree')
const { root, rebalance } = require('./bst_helpers')

class AVL {
  constructor() {
    this.root = new Node()
  }

  insert(key, value) {
    this.root.insert(key, value)
    const rootNode = root(this.root)
    this.root = rootNode
  }

  find(key) {
    return this.root.find(key)
  }

  remove(key) {
    this.root.remove(key)
    const rootNode = root(this.root)
    this.root = rootNode
  }
}

class Node extends BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    super(key, value, parent)
  }
  insert(key, value) {
    // If tree is empty then this key being inserted is the root node of the tree
    if (this.key === null) {
      this.key = key
      this.value = value
    }
    /* If the tree already exists, then start at the root, 
      and compare it to the key you want to insert. 
      If the new key is less than the node's key
      then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
      /* If the existing node does not have a left child,
        meaning that if the `left` pointer is empty,
        then we can just instantiate and insert the new node
        as the left child of that node, passing `this` as the parent */
      if (this.left === null) {
        this.left = new Node(key, value, this)
      }
      /* If the node has an existing left child,
        then we recursively call the `insert` method
        so the node is added further down the tree */
      else {
        this.left.insert(key, value)
      }
    }
    /* Similarly, if the new key is greater than the node's key,
      then you do the same thing, but on the right-hand side */
    else {
      if (this.right === null) {
        this.right = new Node(key, value, this)
      }
      else {
        this.right.insert(key, value)
      }
    }
    rebalance(this)
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      }
      /* If the node only has a left child,
      then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left)
      }
      /* And similarly if the nod only has a right child
      then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right)
      }
      /* If the node has no children then
      simply remove it and any references to it
      by calling "this._replaceWith(null)" */
      else {
        this._replaceWith(null)
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key)
    }
    else if (key > this.key && this.right) {
      this.right.remove(key)
    }
    else {
      throw new Error('Key Error')
    }
    rebalance(this)
  }
  
}

module.exports = AVL