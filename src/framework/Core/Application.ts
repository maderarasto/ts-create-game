import AssetManager from "../Assets/AssetManager";
import Mob from "../Entities/Mob";
import Sprite from "../Graphics/Sprite";
import defines from "../defines";
import Vector2 from "./Vector2";
import Queue from "./Structures/Queue";
import EventsHandler from "./EventHandler";
import InputController from "../Interfaces/InputController";
import StateStack from "../States/StateStack";

export default abstract class Application {
    // Application indicators
    private running: boolean = false;
    
    // Timing a frames
    private lastUpdateTime: number = 0;
    public frames: number = 0;
    
    // Managers and handlers
    private assets: AssetManager;
    private eventHandler: EventsHandler;
    protected inputController?: InputController;
    protected readonly stateStack;

    // temporary properties for testing
    private mob?: Mob;
    private commands: Queue<Entities.Command>;

    constructor(
        private canvas: HTMLCanvasElement,
        public config: Core.AppConfig
    ) {
        this.assets = new AssetManager();
        this.commands = new Queue();
        this.eventHandler = new EventsHandler(this.canvas);
        this.stateStack = new StateStack({
            config: config,
            assets: this.assets,
            inputController: this.inputController
        })

        this.assets.loadImage(`${defines.ASSETS_DIR}/images/Tanks/tankBlue.png`, 'TANK_BLUE').then(() => {
            const tankImage = this.assets.get('image', 'TANK_BLUE') as HTMLImageElement;
            const tankSprite = new Sprite(tankImage, new Vector2(32, 32));
            
            this.mob = new Mob(tankSprite);
            this.mob.position = new Vector2(50, 50);
        });
    }

    /**
     * Start application.
     * From this point application is rendering.
     */
    run() {
        this.running = true;

        if (!this.inputController) {
            throw new Error(`A component based on "InputController" is missing!`);
        }

        this.onStart();
        requestAnimationFrame(this.processLoop.bind(this));
    }

    /**
     * Processing gameloop.
     * 
     * @param time timce since animation frame started.
     */
    private processLoop(time: number) {
        const elapsedTime = time - this.lastUpdateTime;
        const elapsedSeconds = elapsedTime / 1000;

        this.lastUpdateTime = time;
        this.frames = Math.round(1 / elapsedSeconds);

        this.handleEvents();
        this.beforeUpdate(elapsedSeconds);
        this.update(elapsedSeconds)
        this.render();

        if (this.running) {
            requestAnimationFrame(this.processLoop.bind(this));
        }
    }

    /**
     * Handle events in applicaiton.
     */
    private handleEvents() {
        while (!this.eventHandler.isEmpty()) {
            this.stateStack.handleEvent(this.eventHandler.pollEvent());
            
            if (this.stateStack.isEmpty()) {
                this.running = false;
            }
        }
    }

    /**
     * Update application logic.
     * 
     * @param deltaTime time in seconds since last update call.
     */
    private update(deltaTime: number) {
        this.stateStack.update(deltaTime);
    }

    /**
     * Render application assets.
     */
    private render() {
        const context = this.canvas.getContext('2d');

        if (!context) {
            throw new Error('Obtaining 2d rendering context from canvas failed!');
        }

        this.beforeRender(context);
        this.stateStack.render(context);
    }

    abstract onStart(): void;
    abstract beforeUpdate(deltaTime: number): void;
    abstract beforeRender(context: CanvasRenderingContext2D): void;
}