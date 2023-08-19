import Application from "../framework/Core/Application";
import PlayerController from "./PlayerController";
import IntroState from "./states/IntroState";

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
        // Register states
        this.stateStack.registerState('IntroState', IntroState);

        // Request to push first state in stack
        this.stateStack.requestPushState('IntroState');
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