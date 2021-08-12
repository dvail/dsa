import { match } from 'ts-pattern';

export type TraversalType = 'PreOrder' | 'InOrder' | 'PostOrder'

export type TreeDirection = 'left' | 'right'

function visitRoot<WrappedType, RType>(
  tree: BinarySearchTree<WrappedType>,
  fn: (value: WrappedType) => RType,
  acc: Array<RType>
) {
  if (tree.value !== null) {
    acc.push(fn(tree.value))
  }
}

function visitSubtree<WrappedType, RType>(
  tree: BinarySearchTree<WrappedType>,
  fn: (value: WrappedType) => RType,
  acc: Array<RType>,
  direction: TreeDirection,
  traversal: (
    tree: BinarySearchTree<WrappedType>,
    fn: (value: WrappedType) => RType,
    acc: Array<RType>
  ) => void,
) {
  if (tree[direction]) {
    traversal(tree[direction], fn, acc)
  }
}

function traversePreOrder<WrappedType, RType>(
  tree: BinarySearchTree<WrappedType>,
  fn: (value: WrappedType) => RType,
  acc: Array<RType>
) {
  visitRoot(tree, fn, acc)
  visitSubtree(tree, fn, acc, 'left', traversePreOrder)
  visitSubtree(tree, fn, acc, 'right', traversePreOrder)
}

function traverseInOrder<WrappedType, RType>(
  tree: BinarySearchTree<WrappedType>,
  fn: (value: WrappedType) => RType,
  acc: Array<RType>
) {
  visitSubtree(tree, fn, acc, 'left', traverseInOrder)
  visitRoot(tree, fn, acc)
  visitSubtree(tree, fn, acc, 'right', traverseInOrder)
}

function traversePostOrder<WrappedType, RType>(
  tree: BinarySearchTree<WrappedType>,
  fn: (value: WrappedType) => RType,
  acc: Array<RType>
) {
  visitSubtree(tree, fn, acc, 'left', traversePostOrder)
  visitSubtree(tree, fn, acc, 'right', traversePostOrder)
  visitRoot(tree, fn, acc)
}

function findMinimum<WrappedType>(tree: BinarySearchTree<WrappedType>) : WrappedType | null {
  return tree.left ? findMinimum(tree.left) : tree.value
}

function findMaximum<WrappedType>(tree: BinarySearchTree<WrappedType>) : WrappedType | null {
  return tree.right ? findMaximum(tree.right) : tree.value
}

function searchTree<TreeType extends BinarySearchTree<WrappedType>, WrappedType>(
  tree: TreeType,
  value: WrappedType,
): TreeType | null {
  if (tree.value === null) {
    return null
  }

  if (tree.value === value) {
    return tree
  } else if (tree.left && tree.value > value) {
    return searchTree(tree.left as TreeType, value)
  } else if (tree.right && tree.value < value) {
    return searchTree(tree.right as TreeType, value)
  } else {
    return null
  }
}

export default abstract class BinarySearchTree<WrappedType extends any> {
  value: WrappedType | null
  left: BinarySearchTree<WrappedType>
  right: BinarySearchTree<WrappedType>

  abstract insert(value: WrappedType) : void

  minimum(): WrappedType | null {
    return findMinimum(this)
  }

  maximum(): WrappedType | null {
    return findMaximum(this)
  }

  search(value: WrappedType): this | null {
    return searchTree(this, value)
  }

  traverse<RType>(
    traversalType: TraversalType,
    fn: (value: WrappedType) => RType,
  ): Array<RType> {
    let accumulator: Array<RType> = []
    match<TraversalType, void>(traversalType)
      .with('PreOrder', () => traversePreOrder(this, fn, accumulator))
      .with('InOrder', () => traverseInOrder(this, fn, accumulator))
      .with('PostOrder', () => traversePostOrder(this, fn, accumulator))
      .exhaustive();
    return accumulator
  }

  toString(): string {
    return this.traverse('InOrder', n => `${n}`).join(', ')
  }
}
