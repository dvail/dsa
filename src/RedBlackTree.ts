import BinarySearchTree from "./BinarySearchTree"

type Color = 'red' | 'black'

function insertValue<WrappedType>(
  tree: RedBlackTree<WrappedType>,
  value: WrappedType
): RedBlackTree<WrappedType> {
  if (tree.value === null) {
    tree.value = value
    tree.color = tree.parent ? 'red' : 'black'
    tree.left = new RedBlackTree(tree)
    tree.right = new RedBlackTree(tree)
    return tree
  } else if (value < tree.value) {
    return insertValue(tree.left, value)
  } else {
    return insertValue(tree.right, value)
  }
}

function llRotate(parent: RedBlackTree<any>, target: RedBlackTree<any>) {
  let oldRight = target.right
  target.right = parent
  target.parent = parent.parent!
  if (target.parent.right === parent) {
    target.parent.right = target
  } else {
    target.parent.left = target
  }
  parent.left = oldRight
  oldRight.parent = parent
  parent.parent = target

  target.color = 'black'
  parent.color = 'red'
}

function rrRotate(parent: RedBlackTree<any>, target: RedBlackTree<any>) {
  let oldLeft = target.left
  target.left = parent
  target.parent = parent.parent!
  if (target.parent.right === parent) {
    target.parent.right = target
  } else {
    target.parent.left = target
  }
  parent.right = oldLeft
  oldLeft.parent = parent
  parent.parent = target

  target.color = 'black'
  parent.color = 'red'
}

function rotate(tree: RedBlackTree<any>) {
  // We can asset non-null here, as rotation will only occur if the node has a grandparent
  let parent = tree.parent!
  let grandparent = parent.parent!

  if (grandparent.left === parent) {
    if (parent.left === tree) { // LL case
      llRotate(grandparent, parent)
    } else { // LR case
      let oldLeft = tree.left
      tree.left = parent
      tree.parent = grandparent
      grandparent.left = tree
      parent.right = oldLeft
      oldLeft.parent = parent
      parent.parent = tree
      llRotate(grandparent, tree)
    }
  } else {
    if (parent.right === tree) { // RR case
      rrRotate(grandparent, parent)
    } else { // RL case
      let oldRight = tree.right
      tree.right = parent
      tree.parent = grandparent
      grandparent.right = tree
      parent.left = oldRight
      oldRight.parent = parent
      parent.parent = tree
      rrRotate(grandparent, tree)
    }
  }
}

function recolor(parent: RedBlackTree<any>, uncle: RedBlackTree<any>, grandparent: RedBlackTree<any>) {
  uncle.color = 'black'
  parent.color = 'black'
  grandparent.color = grandparent.parent ? 'red' : 'black'

  balanceFrom(grandparent)
}

function balanceFrom(node: RedBlackTree<any>) {
  let parent = node.parent
  // If this is the root node, or the parent is black, the tree constraints are satisfied
  if (!parent || parent.color === 'black') {
    return
  }

  // We can assert non-null here, as balancing will only take place once all nodes
  // are far enough in the tree to have a grandparent
  let grandparent = parent.parent!
  let uncle = grandparent.left === parent
    ? grandparent.right
    : grandparent.left

  // TODO Can we refine the node types here so that null checks and non-null assertions
  // are unnecessary in the recoloring and rotation functions?
  if (uncle.color === 'red') {
    recolor(parent, uncle, grandparent)
  } else {
    rotate(node)
  }
}

export default class RedBlackTree<WrappedType> extends BinarySearchTree<WrappedType> {
  color: Color
  parent: RedBlackTree<WrappedType> | null
  left: RedBlackTree<WrappedType>
  right: RedBlackTree<WrappedType>

  constructor(parent: RedBlackTree<WrappedType> | null = null) {
    super()
    this.parent = parent
    this.value = null
    this.color = 'black'
  }

  insert(value: WrappedType) {
    let newNode = insertValue(this, value)
    balanceFrom(newNode)
  }
}
