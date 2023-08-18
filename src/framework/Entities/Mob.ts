import Vector2 from "../Core/Vector2";
import Sprite from "../Graphics/Sprite";
import Entity, { Category } from "./Entity";

/**
 * Represents an entity that can move with certain velocity.
 */
export default class Mob extends Entity {
    private _velocity: Vector2;
    private _speed: number

    constructor(sprite: Sprite) {
        super(sprite);

        this._velocity = Vector2.zero();
        this._speed = 50;
    }

    /**
     * Get category of mob.
     */
    get category(): Category {
        return Category.Player;
    }

    /**
     * Get speed of mob.
     */
    get speed(): number {
        return this._speed;
    }

    /**
     * Set new speed of mob.
     */
    set speed(speed: number) {
        this._speed = speed;
    }

    /**
     * Get mob entity velocity.
     *
     * @type {Vector2}
     * @memberof Mob
     */
    get velocity(): Vector2 {
        return this._velocity;
    }

    /**
     * Set mob entity velocity.
     *
     * @memberof Mob
     */
    set velocity(value: Vector2) {
        this._velocity = value
    }

    /**
     * Update entity position based on current velocity.
     * 
     * @param deltaTime delta time between two frames.
     */
    update(deltaTime: number) {
        if (Math.abs(this.velocity.x) > 0 && Math.abs(this.velocity.y) > 0) {
            this.velocity = this.velocity.normalized;
        }

        const posX = this.position.x + this.velocity.x * deltaTime * this.speed;
        const posY = this.position.y + this.velocity.y * deltaTime * this.speed;

        this.position = new Vector2(posX, posY);

        // Reset velocity
        this.velocity = Vector2.zero();
    }
}