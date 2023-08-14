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
    private spritesheet: HTMLImageElement;
    private position: Vector2;
    private size: Vector2;
    private options: SpriteOptions;

    constructor(spritesheet: HTMLImageElement, size: Vector2, options?: SpriteOptions) {
        this.spritesheet =  spritesheet
        this.position = Vector2.zero();
        this.size = size;
        this.options = options ? options : { mode: 'single' };
    }

    /**
     * Set a spritesheet.
     * @param spritesheet spritesheet image 
     */
    setSpritesheet(spritesheet: HTMLImageElement) {
        this.spritesheet = spritesheet;
    }

    /**
     * Set sprite position as Vector value.
     * 
     * @param x position vector
     */
    setPosition(x: Vector2): void;

    /**
     * Set sprite position as combination of X and Y coordinates.
     * 
     * @param x position x
     * @param y position y
     */
    setPosition(x: number, y: number): void;
    setPosition(x: Vector2|number, y?: number): void {
        if (x instanceof Vector2) {
            this.position = x;
        } else if (typeof x === 'number' && typeof y === 'number') {
            this.position.x = x;
            this.position.y = y;
        }
    }

    /**
     * Set sprite size as Vector value.
     * 
     * @param x size vector
     */
    setSize(x: Vector2): void;

    /**
     * Set sprite size as combination of width and height.
     * 
     * @param x sprite width
     * @param y sprite height
     */
    setSize(x: number, y: number): void;
    setSize(x: Vector2|number, y?: number): void {
        if (x instanceof Vector2) {
            this.size = x;
        } else if (typeof x === 'number' && typeof y === 'number') {
            this.size.x = x;
            this.size.y = y;
        }
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
                this.spritesheet, 
                this.position.x, 
                this.position.y,
                this.size.x,
                this.size.y
            );
        }
    }
}