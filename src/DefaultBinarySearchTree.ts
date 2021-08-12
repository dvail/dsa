import BinarySearchTree, { TreeDirection } from "./BinarySearchTree";

function insertValueDirection<WrappedType>(
  tree: BinarySearchTree<WrappedType>,
  value: WrappedType,
  direction: TreeDirection,
) {
  if (!tree[direction]) {
    tree[direction] = new DefaultBinarySearchTree(value)
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


export class DefaultBinarySearchTree<WrappedType> extends BinarySearchTree<WrappedType> {
  value: WrappedType | null
  left: BinarySearchTree<WrappedType>
  right: BinarySearchTree<WrappedType>

  constructor(value?: WrappedType) {
    super()
    if (value !== undefined) {
      this.value = value
      this.left = new DefaultBinarySearchTree()
      this.right = new DefaultBinarySearchTree()
    } else {
      this.value = null
    }
  }

  insert(value: WrappedType) {
    // Note, this does not handle the case of key equality
    insertValue(this, value);
  }

  toString(): string {
    return this.traverse('InOrder', n => `${n}`).join(', ')
  }
}
