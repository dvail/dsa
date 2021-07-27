import { BinarySearchTree } from '../src/BinarySearchTree'

test('BinarySearchTree to string', () => {
  let tree = new BinarySearchTree()

  for (let v of [14, 35, 10, 19, 31, 42, 2, 3, 4, 27]) {
    tree.insert(v)
  }

  expect(tree.toString()).toBe('2, 3, 4, 10, 14, 19, 27, 31, 35, 42' )
});

test('BinarySearchTree traversals', () => {
  let tree = new BinarySearchTree()

  for (let v of [14, 35, 10, 19, 31, 42, 2, 3, 4, 27]) {
    tree.insert(v)
  }

  let toString = (n: number) => `${n}`
  let inOrder = tree.traverse(toString, 'InOrder').join(', ')
  let preOrder = tree.traverse(toString, 'PreOrder').join(', ')
  let postOrder = tree.traverse(toString, 'PostOrder').join(', ')

  expect(inOrder).toBe('2, 3, 4, 10, 14, 19, 27, 31, 35, 42')
  expect(preOrder).toBe('14, 10, 2, 3, 4, 35, 19, 31, 27, 42')
  expect(postOrder).toBe('4, 3, 2, 10, 27, 31, 19, 42, 35, 14')
});
