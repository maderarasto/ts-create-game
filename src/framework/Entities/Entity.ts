import Vector2 from "../Core/Vector2";
import Renderable from "../Interfaces/Renderable";
import Updatable from "../Interfaces/Updatable";

/**
 * Represents en entity in world defined by image, size and position.
 */
export default class Entity implements Updatable, Renderable {
    private _position: Vector2;

    constructor() {
        this._position = Vector2.Zero;
    }

    /**
     * Get entity position.
     *
     * @type {Vector2}
     * @memberof Entity
     */
    get position(): Vector2 {
        return this._position;
    }

    /**
     * Set entity position as vector structure.
     * 
     * @param value vector
     */
    setPosition(value: Vector2): void;

    /**
     * Set entity position as combination of x and y coordinates.
     * 
     * @param value position x
     * @param other position y
     */
    setPosition(value: number, other: number): void;
    setPosition(value: Vector2 | number, other?: number): void {
        if (value instanceof Vector2) {
            this._position = value;
        } else if (typeof value ===  'number' && typeof other === 'number') {
            this._position.x = value;
            this._position.y = other;
        }
    }

    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }

    render(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}