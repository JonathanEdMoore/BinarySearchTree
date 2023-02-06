'use strict'

const { BinarySearchTree } = require('./binarySearchTree')
const { root } = require('./bst_helpers')

class AVL {
  constructor() {
    this.root = new BinarySearchTree()
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