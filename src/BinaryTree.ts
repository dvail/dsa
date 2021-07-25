import { match } from 'ts-pattern';

type TraversalType = 'PreOrder' | 'InOrder' | 'PostOrder'

export class BinaryTree<WrappedType> {
  value: WrappedType
  left: BinaryTree<WrappedType>
  right: BinaryTree<WrappedType>

  constructor(value: WrappedType) {
    this.value = value;
  }

  insert(value: WrappedType) {
  }

  search(value: WrappedType): WrappedType | null {
    return null
  }

  traverse<RType>(
    fn: <RType>(node: BinaryTree<WrappedType>) => RType,
    traversalType: TraversalType = 'InOrder',
  ): Array<RType> {
    return match<TraversalType, Array<RType>>(traversalType)
      .with('PreOrder', () => this.traversePreOrder(fn))
      .with('InOrder', () => this.traverseInOrder(fn))
      .with('PostOrder', () => this.traversePostOrder(fn))
      .exhaustive();
  }

  traversePreOrder<RType>(
    fn: <RType>(node: BinaryTree<WrappedType>) => RType,
  ): Array<RType> {
    return []
  }

  traverseInOrder<RType>(
    fn: <RType>(node: BinaryTree<WrappedType>) => RType,
  ): Array<RType> {
    return []
  }

  traversePostOrder<RType>(
    fn: <RType>(node: BinaryTree<WrappedType>) => RType,
  ): Array<RType> {
    return []
  }

  toString(): string {
    return 'TODO'
  }
}
