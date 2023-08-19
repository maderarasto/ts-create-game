/**
 * Represents a data structure in which items are stacked on each other and processed in LIFO order.
 */
export default class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    /**
     * Get size of the stack.
     * 
     * @returns stack size.
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Check if the stack is empty.
     * 
     * @returns boolean result.
     */
    isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * Get an item that is at top of the stack.
     * 
     * @returns item or undefined.
     */
    peek(): T | undefined {
        return this.items[this.size() - 1];
    }

    /**
     * Push a new item at top of the stack.
     * 
     * @param item 
     */
    push(item: T) {
        this.items.push(item);
    }

    /**
     * Get and remove item from the top of the stack.
     * If stack is empty then it raiser error.
     * 
     * @returns popped item
     */
    pop(): T {
        if (this.isEmpty()) {
            throw new Error('Cannot use an operation pop on empty stack!');
        }

        const item = this.peek() as T;
        this.items = this.items.slice(0, this.size() - 1);
        
        return item;
    }

    /**
     * Clear all items in stack.
     */
    clear() {
        this.items = [];
    }
}