/**
 * Represents a rectangle structure of 4 points.
 */
export default class Rect {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {

    }

    /**
     * Get left position on axis X.
     */
    get left(): number {
        return this.x;
    }

    /**
     * Get right position on axis X.
     */
    get right(): number {
        return this.x + this.width;
    }

    /**
     * Get top position on axis Y.
     */
    get top(): number {
        return this.y;
    }

    /**
     * Get bottom position on axis Y.
     */
    get bottom(): number {
        return this.y + this.height;
    }

    /**
     * Get a center point in rectangle.
     */
    get center(): Core.Point {
        return {
            x: (this.left + this.right) / 2,
            y: (this.top + this.bottom) / 2
        }
    }

    /**
     * Get a new instance of rectangle with the same values.
     * 
     * @returns new cloned rectangle.
     */
    clone(): Rect {
        return new Rect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    /**
     * Check if two rectangles have the same points.
     * 
     * @param other another rectangle
     * @returns boolean result
     */
    equals(other: Rect) {
        return this.x === other.x 
            && this.y === other.y 
            && this.width === other.width 
            && this.height === other.height;
    }

    /**
     * Check if given points is part of rectangle.
     * 
     * @param point point in 2d coordinate system
     * @returns boolean result
     */
    includes(point: Core.Point): boolean {
        return point.x >= this.x
            && point.x <= (this.x + this.width)
            && point.y >= this.y
            && point.y <= (this.y + this.height);
    }

    /**
     * Check if two rectangles overlap themselves.
     * 
     * @param other another rectangle
     * @returns boolea result
     */
    intersects(other: Rect): boolean {
        return this.includes({ x: other.left, y: other.top })
            || this.includes({ x: other.left, y: other.bottom })
            || this.includes({ x: other.right, y: other.top })
            || this.includes({ x: other.right, y: other.bottom });
    }

    /**
     * Get a new instance withj zero values.
     * 
     * @returns zero rectangle.
     */
    static zero(): Rect {
        return new Rect(0, 0, 0, 0);
    }
}