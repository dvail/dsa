
import { LinkedListDeque } from "../src/LinkedListDeque"

test('LinkedListDeque additions', () => {
  let deque = new LinkedListDeque<number>()

  expect(deque.size).toBe(0)
  expect(deque.toString()).toBe("[]")

  deque.addLast(0)
  deque.addFirst(10)
  deque.addFirst(20)
  deque.addFirst(30)
  deque.addLast(40)
  deque.addLast(50)
  deque.addLast(60)
  deque.addFirst(70)
  deque.addLast(80)

  expect(deque.size).toBe(9)
  expect(deque.toString()).toBe("[70, 30, 20, 10, 0, 40, 50, 60, 80]")
})

test('LinkedListDeque removals', () => {
  let deque = new LinkedListDeque<number>()
  expect(deque.toString()).toBe("[]")

  for (let n of [10, 20, 30, 40, 50, 60, 70, 80, 90]) {
    deque.addLast(n)
  }

  expect(deque.size).toBe(9)
  expect(deque.toString()).toBe("[10, 20, 30, 40, 50, 60, 70, 80, 90]")

  expect(deque.removeFirst()).toBe(10)
  expect(deque.removeFirst()).toBe(20)
  expect(deque.size).toBe(7)
  expect(deque.toString()).toBe("[30, 40, 50, 60, 70, 80, 90]")
  expect(deque.removeLast()).toBe(90)
  expect(deque.removeLast()).toBe(80)
  expect(deque.size).toBe(5)
  expect(deque.toString()).toBe("[30, 40, 50, 60, 70]")
  deque.addLast(60)
  deque.addLast(70)
  deque.remove(60)
  expect(deque.size).toBe(6)
  expect(deque.toString()).toBe("[30, 40, 50, 70, 60, 70]")
  deque.removeAll(70)
  expect(deque.size).toBe(4)
  expect(deque.toString()).toBe("[30, 40, 50, 60]")
  deque.removeAllWhere(n => n % 20 === 0)
  expect(deque.size).toBe(2)
  expect(deque.toString()).toBe("[30, 50]")
  deque.empty()
  expect(deque.size).toBe(0)
  expect(deque.toString()).toBe("[]")
})

test('LinkedListDeque peek', () => {
  let deque = new LinkedListDeque<number>()

  expect(deque.peekFirst()).toBeNull()
  expect(deque.peekLast()).toBeNull()
  deque.addLast(10)
  expect(deque.peekFirst()).toBe(10)
  expect(deque.peekLast()).toBe(10)
  deque.addLast(20)
  expect(deque.peekFirst()).toBe(10)
  expect(deque.peekLast()).toBe(20)
  deque.addFirst(30)
  expect(deque.peekFirst()).toBe(30)
  expect(deque.peekLast()).toBe(20)
  deque.empty()
  expect(deque.peekFirst()).toBeNull()
  expect(deque.peekLast()).toBeNull()
})
