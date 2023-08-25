/**
 * Represents two dimensional structure of numbers.
 */
export default class Vector2 {
    constructor(
        public x: number = 0, 
        public y: number = 0
    ) {}

    /**
     * Check if vector is equal with another vector.
     * 
     * @param other other vector
     * @returns result of equal comparison
     */
    equals(other: Vector2): boolean {
        return this.x === other.x && this.y === other.y;
    }

    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalized(): Vector2 {
        return new Vector2(this.x / Math.abs(this.magnitude), this.y / Math.abs(this.magnitude));
    }

    /**
     * Create a vector with both components as 0 value.
     * 
     * @returns zero vector.
     */
    static zero() {
        return new Vector2(0, 0);
    }

    /**
     * Create a vector with both components as 1 value.
     * 
     * @returns one vector.
     */
    static one() {
        return new Vector2(1, 1);
    }
    
    /**
     * Add two vectors.
     * Add corresponding components of vectors.
     * 
     * @param vector first vector
     * @param other other vector
     * @returns a new vector
     */
    static add(vector: Vector2, other: Vector2): Vector2 {
        const x = vector.x + other.x;
        const y = vector.y + other.y;

        return new Vector2(x, y);     
    }

    /**
     * Subtract a vector from another.
     * 
     * @param vector first vector
     * @param other other vector
     * @returns a new vector
     */
    static subtract(vector: Vector2, other: Vector2): Vector2 {
        const x = vector.x - other.x;
        const y = vector.y - other.y;

        return new Vector2(x, y);
    }

    /**
     * Multiply a vector by scalar.
     * Each component of vector will be multiplied by a scalar.
     * 
     * @param vector vector
     * @param value scalar value
     * @returns a new vector
     */
    static multiply(vector: Vector2, value: number): Vector2;

    /**
     * Multiply a vector by another.
     * Each component of vector will be multiplied corresponding component of another vector.
     * 
     * @param vector first vector
     * @param value other vector
     * @returns a new vector
     */
    static multiply(vector: Vector2, value: Vector2): Vector2;
    static multiply(vector: Vector2, value: number|Vector2): Vector2 {
        let x = vector.x;
        let y = vector.y;

        if (value instanceof Vector2) {
            x *= value.x;
            y *= value.y;
        } else if (typeof value === 'number') {
            x *= value;
            y *= value;
        }

        return new Vector2(x, y);     
    }

    /**
     * Divides a vector by scalar.
     * Each component of vector will be divided by scalar.
     * 
     * @param vector vector
     * @param value scalar value
     * @returns a new vector
     */
    static divide(vector: Vector2, value: number): Vector2;

    /**
     * Divides a vector by another vector.
     * Each component of vector will be divided by the corresponding component of another vector.
     * 
     * @param vector first vector
     * @param value other vector
     * @returns a new vector
     */
    static divide(vector: Vector2, value: Vector2): Vector2;
    static divide(vector: Vector2, value: number|Vector2): Vector2 {
        let x = vector.x;
        let y = vector.y;

        if (value instanceof Vector2) {
            x /= value.x;
            y /= value.y;
        } else if (typeof value === 'number') {
            x /= value;
            y /= value;
        }

        return new Vector2(x, y);     
    }
}