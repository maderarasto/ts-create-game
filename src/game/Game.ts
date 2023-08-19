import Application from "../framework/Core/Application";
import PlayerController from "./PlayerController";

export default class Game extends Application {
    constructor(canvas: HTMLCanvasElement, config: Core.AppConfig) {
        super(canvas, config);

        this.inputController = new PlayerController();
    }

    /**
     *  Code after calling run function.
     *  It runs once.
     */
    onStart() {
    }

    /**
     * Code before each update. 
     * 
     * @param deltaTime time in seconds since last update
     */
    beforeUpdate(deltaTime: number): void {
        
    }

    /**
     * Code before each render.
     * 
     * @param context context for 2d rendering.
     */
    beforeRender(context: CanvasRenderingContext2D): void {
        
    }
}