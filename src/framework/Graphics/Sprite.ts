import Vector2 from "../Core/Vector2";
import Renderable from "../Interfaces/Renderable";

type SpriteOptions = {
    mode: 'single'
} | {
    mode: 'multiple',
    widthPerUnit: number,
    heightPerUnit: number 
}

/**
 * Represents object with image at specific position.
 */
export default class Sprite implements Renderable {
    private _spritesheet: HTMLImageElement;
    private _position: Vector2;
    private _size: Vector2;
    private options: SpriteOptions;

    constructor(spritesheet: HTMLImageElement, size: Vector2, options?: SpriteOptions) {
        this._spritesheet =  spritesheet
        this._position = Vector2.zero();
        this._size = size;
        this.options = options ? options : { mode: 'single' };
    }

    /**
     * Get a spritesheet.
     */
    get spriteshet(): HTMLImageElement {
        return this._spritesheet;
    }

    /**
     * Set a spritesheet.
     */
    set spritesheet(spritesheet: HTMLImageElement) {
        this._spritesheet = spritesheet;
    }

    /**
     * Get position of the sprite as vector.
     */
    get position(): Vector2 {
        return this._position;
    }

    /**
     * Set new position of the sprite.
     */
    set position(position: Vector2) {
        this._position = position;
    }

    /**
     * Get size of the sprite as vector.
     */
    get size(): Vector2 {
        return this._size;
    }

    /**
     * Set new size of the sprite.
     */
    set size(size: Vector2) {
        this._size = size;
    }

    /**
     * Render image of sprite.
     * If sprite is in mode multiple then will render active image.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D) {
        if (this.options.mode === 'multiple') {

        } else {
            context.drawImage(
                this._spritesheet, 
                this._position.x, 
                this._position.y,
                this._size.x,
                this._size.y
            );
        }
    }
}