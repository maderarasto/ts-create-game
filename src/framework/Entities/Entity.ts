import Vector2 from "../Core/Vector2";
import Sprite from "../Graphics/Sprite";
import Commandable from "../Interfaces/Commandable";
import Renderable from "../Interfaces/Renderable";
import Updatable from "../Interfaces/Updatable";

/**
 * Represents en entity in world defined by image, size and position.
 */
export default abstract class Entity implements Commandable, Updatable, Renderable {
    private _position: Vector2;
    private sprite: Sprite;

    constructor(sprite: Sprite) {
        this.sprite = sprite;
        this._position = Vector2.zero();
    }

    /**
     * Get entity category.
     *
     * @readonly
     * @type {Entities.Category}
     * @memberof Entity
     */
    get category(): Entities.Category {
        return 'Entity';
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

    set position(value: Vector2) {
        this._position = value;

        if (this.sprite) {
            this.sprite.setPosition(this.position);
        }
    }

    /**
     * Set entity sprite.
     * 
     * @param sprite new sprite
     */
    setSprite(sprite: Sprite) {
        this.sprite = sprite;
    }

    onCommand(): void {
        // TODO: handle command
    }

    abstract update(deltaTime: number): void;

    /**
     * Render a sprite of entity.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D): void {
        this.sprite.render(context);
    }
}