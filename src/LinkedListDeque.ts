let headSymbol = Symbol("HEAD Node of LinkedListDeque")

type HeadNode = symbol


interface ListNode<T> {
  value: T | HeadNode
  prev: ListNode<T>
  next: ListNode<T>
}

function addNode<T>(
  value: T,
  prev: ListNode<T>,
  next: ListNode<T>,
) {
  let newNode = { value, prev, next }
  prev.next = newNode
  next.prev = newNode
}

function removeNode<T>(
  target: ListNode<T>,
) : T {
  target.prev.next = target.next
  target.next.prev = target.prev
  return target.value as T
}


export class LinkedListDeque<T> {
  head: ListNode<T>
  _size = 0

  constructor() {
    this.empty()
  }

  get size(): number {
    return this._size
  }

  addFirst(value: T) {
    this._size++
    addNode(value, this.head, this.head.next)
  }

  addLast(value: T) {
    this._size++
    addNode(value, this.head.prev, this.head)
  }

  peekFirst(): T | null {
    if (this.size === 0) {
      return null
    }
    // TODO Would be nice to refine the design so that this doesn't need to be casted
    return this.head.next.value as T
  }

  peekLast(): T | null {
    if (this.size === 0) {
      return null
    }
    // TODO Would be nice to refine the design so that this doesn't need to be casted
    return this.head.prev.value as T
  }

  removeFirst() : T {
    this._size--
    return removeNode(this.head.next)
  }

  removeLast() : T {
    this._size--
    return removeNode(this.head.prev)
  }

  remove(value: T) {
    let current = this.head
    for (let i = 0; i < this.size; i++) {
      current = current.next
      if (current.value === value) {
        this._size--
        removeNode(current)
        break;
      }
    }
  }

  removeAll(value: T) {
    this.removeAllWhere(n => n === value)
  }

  removeAllWhere(predicate: (value: T) => boolean) {
    let targets = []
    let current = this.head
    for (let i = 0; i < this.size; i++) {
      current = current.next
      if (predicate(current.value as T)) {
        targets.push(current)
      }
    }

    for (let target of targets) {
      this._size--
      removeNode(target)
    }
  }

  empty() {
    this._size = 0
    this.head = { value: headSymbol, prev: this.head, next: this.head }
    this.head.prev = this.head
    this.head.next = this.head
  }

  toString() : string {
    let current = this.head
    let values = new Array(this.size)
    for (let i = 0; i < this.size; i++) {
      current = current.next
      values[i] = current.value
    }
    return `[${values.join(', ')}]`
  }
}