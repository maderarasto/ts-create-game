import Vector2 from "../Core/Vector2";
import Sprite from "../Graphics/Sprite";
import Commandable from "../Interfaces/Commandable";
import Renderable from "../Interfaces/Renderable";
import Updatable from "../Interfaces/Updatable";

export enum Category {
    Entity  = 0,
    Player  = 1 << 0,
    Enemies = 1 << 1
}

/**
 * Represents en entity in world defined by image, size and position.
 */
export default abstract class Entity implements Commandable, Updatable, Renderable {
    private _position: Vector2;
    private _sprite: Sprite;

    constructor(sprite: Sprite) {
        this._sprite = sprite;
        this._position = Vector2.zero();
    }

    /**
     * Get category of the entity.
     *
     * @readonly
     * @type {Entities.Category}
     * @memberof Entity
     */
    get category(): Category {
        return Category.Entity;
    }

    /**
     * Get position of the entity.
     *
     * @type {Vector2}
     * @memberof Entity
     */
    get position(): Vector2 {
        return this._position;
    }

    /**
     * Set a new position of the entity.
     * Also updates position of sprite.
     */
    set position(value: Vector2) {
        this._position = value;

        if (this._sprite) {
            this._sprite.position.x = this.position.x;
            this._sprite.position.y = this.position.y;
        }
    }

    /**
     * Set a new sprite of the entity.
     */
    set sprite(sprite: Sprite) {
        this._sprite = sprite;
    }

    /**
     * Execute command if entity category is matched.
     * 
     * @param command command to be executed.
     */
    onCommand(command: Entities.Command): void {
        if (command.category & this.category) {
            command.action(this);
        }
    }

    abstract update(deltaTime: number): void;

    /**
     * Render a sprite of the entity.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D): void {
        this._sprite.render(context);
    }
}