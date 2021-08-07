import { match } from 'ts-pattern';

type TraversalType = 'PreOrder' | 'InOrder' | 'PostOrder'

type TreeDirection = 'left' | 'right'

function insertValueDirection<WrappedType>(
  tree: BinarySearchTree<WrappedType>,
  value: WrappedType,
  direction: TreeDirection,
) {
  if (!tree[direction]) {
    tree[direction] = new BinarySearchTree(value)
  } else {
    insertValue(tree[direction], value);
  }
}

function insertValue<WrappedType>(
  tree: BinarySearchTree<WrappedType>,
  value: WrappedType
) {
  if (tree.value === null) {
    tree.value = value
  } else if (value < tree.value) {
    insertValueDirection(tree, value, 'left')
  } else {
    insertValueDirection(tree, value, 'right')
  }
}

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

function searchTree<WrappedType>(
  tree: BinarySearchTree<WrappedType>,
  value: WrappedType,
) : BinarySearchTree<WrappedType> | null {
  if (tree.value === null) {
    return null
  }

  if (tree.value === value) {
    return tree
  } else if (tree.left && tree.value > value) {
    return searchTree(tree.left, value)
  } else if (tree.right && tree.value < value) {
    return searchTree(tree.right, value)
  } else {
    return null
  }
}

export class BinarySearchTree<WrappedType> {
  value: WrappedType | null
  left: BinarySearchTree<WrappedType>
  right: BinarySearchTree<WrappedType>

  constructor(value?: WrappedType) {
    if (value !== undefined) {
      this.value = value
      this.left = new BinarySearchTree()
      this.right = new BinarySearchTree()
    } else {
      this.value = null
    }
  }

  insert(value: WrappedType) {
    // Note, this does not handle the case of key equality
    insertValue(this, value);
  }

  minimum(): WrappedType | null {
    return findMinimum(this)
  }

  maximum(): WrappedType | null {
    return findMaximum(this)
  }

  search(value: WrappedType): BinarySearchTree<WrappedType> | null {
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
