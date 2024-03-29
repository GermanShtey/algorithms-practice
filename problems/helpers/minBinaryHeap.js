class MinBinaryHeap {
  constructor(size) {
    this.size = size;
    this.heapContainer = [null];
  }

  #getLeftChildIndex(parentIndex) {
    return parentIndex << 1;
  }

  #getRightChildIndex(parentIndex) {
    return (parentIndex << 1) + 1;
  }

  #getParentIndex(childIndex) {
    return childIndex >> 1;
  }

  hasParent(childIndex) {
    return this.#getParentIndex(childIndex) >= 1;
  }

  #hasLeftChild(parentIndex) {
    return this.#getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  #hasRightChild(parentIndex) {
    return this.#getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  isFull() {
    return this.heapContainer.length - 1 === this.size;
  }

  #isEmpty() {
    return this.heapContainer.length === 0;
  }

  insert(newValue) {
    if (this.isFull()) {
      return false;
    }

    this.heapContainer.push(newValue);
    this.#heapifyUp();
    return true;
  }

  extractMin() {
    // @ts-ignore
    if (this.#isEmpty()) return;

    let item = this.heapContainer[1];
    // @ts-ignore
    this.heapContainer[1] = this.heapContainer.pop();
    this.#heapifyDown();

    return item;
  }

  #heapifyUp() {
    let currentIndex = this.heapContainer.length - 1;

    while (this.hasParent(currentIndex)) {
      const parentIndex = this.#getParentIndex(currentIndex);
      const child = this.heapContainer[currentIndex];
      const parent = this.heapContainer[parentIndex];
      // @ts-ignore
      if (child >= parent) break;

      this.heapContainer[parentIndex] = child;
      this.heapContainer[currentIndex] = parent;
      currentIndex = parentIndex;
    }
  }

  #heapifyDown() {
    let currentIndex = 1;
    let nextIndex;

    while (this.#hasLeftChild(currentIndex)) {
      if (
        this.#hasRightChild(currentIndex) &&
        // @ts-ignore
        this.heapContainer[this.#getLeftChildIndex(currentIndex)] >= this.heapContainer[this.#getRightChildIndex(currentIndex)]
      ) {
        nextIndex = this.#getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.#getLeftChildIndex(currentIndex);
      }

      // @ts-ignore
      if (this.heapContainer[currentIndex] < this.heapContainer[nextIndex]) {
        break;
      }

      const parent = this.heapContainer[currentIndex];
      this.heapContainer[currentIndex] = this.heapContainer[nextIndex];
      this.heapContainer[nextIndex] = parent;
      currentIndex = nextIndex;
    }
  }

  getValues() {
    return this.heapContainer.slice(1).toString();
  }
}

export default MinBinaryHeap;