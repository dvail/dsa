import { match } from 'ts-pattern';

type TraversalType = 'PreOrder' | 'InOrder' | 'PostOrder'

function traversePreOrder<WrappedType, RType>(
  tree: BinarySearchTree<WrappedType>,
  fn: (value: WrappedType) => RType,
  acc: Array<RType>
) {
  if (tree.value !== null) {
    acc.push(fn(tree.value))
  }

  if (tree.left) {
    traversePreOrder(tree.left, fn, acc)
  }

  if (tree.right) {
    traversePreOrder(tree.right, fn, acc)
  }
}

function traverseInOrder<WrappedType, RType>(
  tree: BinarySearchTree<WrappedType>,
  fn: (value: WrappedType) => RType,
  acc: Array<RType>
) {
  if (tree.left) {
    traverseInOrder(tree.left, fn, acc)
  }

  if (tree.value !== null) {
    acc.push(fn(tree.value))
  }

  if (tree.right) {
    traverseInOrder(tree.right, fn, acc)
  }
}

function traversePostOrder<WrappedType, RType>(
  tree: BinarySearchTree<WrappedType>,
  fn: (value: WrappedType) => RType,
  acc: Array<RType>
) {
  if (tree.left) {
    traversePostOrder(tree.left, fn, acc)
  }

  if (tree.right) {
    traversePostOrder(tree.right, fn, acc)
  }

  if (tree.value !== null) {
    acc.push(fn(tree.value))
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
    this.insertTree(this, value);
  }

  private insertTree(
    tree: BinarySearchTree<WrappedType>,
    value: WrappedType
  ) {
    if (tree.value === null) {
      tree.value = value
    } else if (value < tree.value) {
      if (!tree.left) {
        tree.left = new BinarySearchTree(value)
      } else {
        this.insertTree(tree.left, value);
      }
    } else if (value > tree.value) {
      if (!tree.right) {
        tree.right = new BinarySearchTree(value)
      } else {
        this.insertTree(tree.right, value);
      }
    }
  }

  search(value: WrappedType): WrappedType | null {
    return null
  }

  traverse<RType>(
    fn: (value: WrappedType) => RType,
    traversalType: TraversalType = 'InOrder',
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
    return this.traverse(n => `${n}`, 'InOrder').join(', ')
  }
}
