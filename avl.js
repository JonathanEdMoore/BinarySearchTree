'use strict'

const { BinarySearchTree } = require('./binarySearchTree')
const { root } = require('./bst_helpers')

class AVL {
  constructor() {
    this.head = new BinarySearchTree()
  }

  insert(key, value) {
    this.head.insert(key, value)
    const rootNode = root(this.head)
    this.head = rootNode
  }

  find(key) {
    return this.head.find(key)
  }

  remove(key) {
    this.head.remove(key)
    const rootNode = root(this.head)
    this.head = rootNode
  }
}

module.exports = AVL