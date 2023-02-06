'use strict'

const { BinarySearchTree } = require('./binarySearchTree')
const { root, rebalance } = require('./bst_helpers')

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

}

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

module.exports = AVL