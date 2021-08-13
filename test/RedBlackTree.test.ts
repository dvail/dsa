import RedBlackTree from "../src/RedBlackTree"
import { difference } from "ramda"
import fc from 'fast-check'

test('RedBlackTree traversals', () => {
  let tree = new RedBlackTree();

  for (let v of [14, 35, 10, 19, 31, 42, 2, 3, 4, 27, 9, 8, 60]) {
    tree.insert(v)
  }

  let toString = (n: number) => `${n}`
  let inOrder = tree.traverse('InOrder', toString).join(', ')
  let preOrder = tree.traverse('PreOrder', toString).join(', ')
  let postOrder = tree.traverse('PostOrder', toString).join(', ')

  expect(inOrder).toBe('2, 3, 4, 8, 9, 10, 14, 19, 27, 31, 35, 42, 60')
  expect(preOrder).toBe('14, 3, 2, 9, 4, 8, 10, 31, 19, 27, 42, 35, 60')
  expect(postOrder).toBe('2, 8, 4, 10, 9, 3, 27, 19, 35, 60, 42, 31, 14')
})

// TODO Try some property based testing here

test('RedBlackTree coloration', () => {
  let tree = new RedBlackTree();
  let values = [14, 35, 10, 19, 31, 42, 2, 3, 4, 27, 9, 8, 60]

  for (let v of values) {
    tree.insert(v)
  }

  let redNodes = [8, 9, 27, 35, 60]
  let blackNodes = difference(redNodes, values)

  for (let red of redNodes) {
    expect((tree.search(red))?.color).toBe('red')
  }

  for (let black of blackNodes) {
    expect((tree.search(black))?.color).toBe('black')
  }
})

