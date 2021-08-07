import { BinarySearchTree } from '../src/BinarySearchTree'

test('BinarySearchTree to string', () => {
  let tree = new BinarySearchTree()

  for (let v of [14, 35, 10, 19, 31, 42, 2, 3, 4, 27]) {
    tree.insert(v)
  }

  expect(tree.toString()).toBe('2, 3, 4, 10, 14, 19, 27, 31, 35, 42' )
})

test('BinarySearchTree traversals', () => {
  let tree = new BinarySearchTree()

  for (let v of [14, 35, 10, 19, 31, 42, 2, 3, 4, 27]) {
    tree.insert(v)
  }

  let toString = (n: number) => `${n}`
  let inOrder = tree.traverse('InOrder', toString).join(', ')
  let preOrder = tree.traverse('PreOrder', toString).join(', ')
  let postOrder = tree.traverse('PostOrder', toString).join(', ')

  expect(inOrder).toBe('2, 3, 4, 10, 14, 19, 27, 31, 35, 42')
  expect(preOrder).toBe('14, 10, 2, 3, 4, 35, 19, 31, 27, 42')
  expect(postOrder).toBe('4, 3, 2, 10, 27, 31, 19, 42, 35, 14')
})

test('BinarySearchTree min/max', () => {
  let tree = new BinarySearchTree()

  for (let v of [14, 35, 10, 19, 31, 42, 2, 3, 4, 27]) {
    tree.insert(v)
  }

  expect(tree.minimum()).toBe(2)
  expect(tree.maximum()).toBe(42)
})

test('BinarySearchTree search', () => {
  let tree = new BinarySearchTree<number>()

  for (let v of [14, 35, 10, 19, 31, 42, 2, 3, 4, 27]) {
    tree.insert(v)
  }

  expect(tree.search(1)).toBeNull();
  expect(tree.search(50)).toBeNull();
  expect(tree.search(35)).not.toBeNull();
  expect(tree.search(35)?.value).toBe(35);
  expect(tree.search(4)).not.toBeNull();
  expect(tree.search(4)?.value).toBe(4);

  let nullTree = new BinarySearchTree<number>();
  expect(nullTree.search(1)).toBeNull();
  expect(nullTree.search(-99)).toBeNull();
  expect(nullTree.search(500)).toBeNull();
})
