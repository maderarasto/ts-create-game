import Vector2 from "../Core/Vector2";
import Sprite from "../Graphics/Sprite";
import Entity, { Category } from "./Entity";

/**
 * Represents an entity that can move with certain velocity.
 */
export default class Mob extends Entity {
    private _velocity: Vector2;

    constructor(sprite: Sprite) {
        super(sprite);

        this._velocity = Vector2.zero();
    }

    get category(): Category {
        return Category.Player;
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
        const posX = this.position.x + this.velocity.x * deltaTime;
        const posY = this.position.y + this.velocity.y * deltaTime;

        this.position = new Vector2(posX, posY);
        // this.position.x += this.velocity.x;
        // this.position.y += this.velocity.y;

        // Reset velocity
        this.velocity = Vector2.zero();
    }
}