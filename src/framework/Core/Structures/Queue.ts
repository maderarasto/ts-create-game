/**
 * Represents a data structure in which items are processed in FIFO order.
 */
export default class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    /**
     * Get size of queue.
     * 
     * @returns queue size
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Check if the queue is empty.
     * 
     * @returns 
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Get a first item in queue.
     * If queue is empty then returns undefined.
     * 
     * @returns item or undefined.
     */
    peek(): T | undefined {
        return this.items[0];
    }

    /**
     * Push a new item into the queue at its end.
     * 
     * @param item new item
     */
    enqueue(item: T) {
        this.items.push(item);
    }

    /**
     * Pop first item in the queue and returns it.
     * If the queue is empty then raises an error.
     * 
     * @returns first item.
     */
    dequeue(): T {
        if (this.isEmpty()) {
            throw new Error('Cannot use an operation dequeue on empty queue!');
        }

        const item = this.peek() as T;
        this.items = [...this.items.slice(1)];

        return item;
    }
}