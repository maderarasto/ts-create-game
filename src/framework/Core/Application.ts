import AssetManager from "../Assets/AssetManager";
import Mob from "../Entities/Mob";
import Sprite from "../Graphics/Sprite";
import defines from "../defines";
import PlayerController from "../PlayerController";
import Vector2 from "./Vector2";
import Queue from "./Queue";
import EventsHandler from "./EventHandler";

export default class Application {
    private _config: Core.AppConfig;
    private canvas: HTMLCanvasElement

    // Application indicators
    private _running: boolean;
    
    // Timing a frames
    private _lastUpdateTime: number;
    private _lastFpsCountTime: number;
    private _frames: number;
    
    // Managers
    private assets: AssetManager;
    private commands: Queue<Entities.Command>;
    private eventHandler: EventsHandler;
    private playerControler: PlayerController;
    private mob?: Mob;

    constructor(config: Core.AppConfig) {
        this._config = config;
        this._running = false;
        this._lastUpdateTime = 0;
        this._lastFpsCountTime = 0;
        this._frames = 0;
        
        this.canvas = document.querySelector('#app canvas') as HTMLCanvasElement;

        if (!this.canvas) {
            throw new Error('HTML element for canvas not found!');
        }

        this.assets = new AssetManager();
        this.commands = new Queue();
        this.eventHandler = new EventsHandler(this.canvas);
        this.playerControler = new PlayerController();

        this.assets.loadImage(`${defines.ASSETS_DIR}/images/Tanks/tankBlue.png`, 'TANK_BLUE').then(() => {
            const tankImage = this.assets.get('image', 'TANK_BLUE') as HTMLImageElement;
            const tankSprite = new Sprite(tankImage, new Vector2(32, 32));
            
            this.mob = new Mob(tankSprite);
            this.mob.position = new Vector2(50, 50);
        });
    }

    get config() {
        return this._config;
    }

    run() {
        this._running = true;

        requestAnimationFrame(this.processLoop.bind(this));
    }

    private processLoop(time: number) {
        const elapsedTime = time - this._lastUpdateTime;
        const elapsedSeconds = elapsedTime / 1000;
        
        this._lastUpdateTime = time;
        this._lastFpsCountTime += elapsedTime;

        if (this._lastFpsCountTime > 1000) {
            this._lastFpsCountTime = 0;
            this._frames = Math.round(1 / elapsedSeconds);
        }

        this.handleEvents();
        this.update(elapsedSeconds)
        this.render();

        if (this._running) {
            requestAnimationFrame(this.processLoop.bind(this));
        }
    }

    private handleEvents() {
        while (!this.eventHandler.isEmpty()) {
            const event = this.eventHandler.pollEvent();
        }
    }

    private update(deltaTime: number) {
        while (!this.commands.isEmpty()) {
            const command = this.commands.dequeue();
            this.mob?.onCommand(command);
        }

        this.mob?.update(deltaTime);
    }

    private render() {
        const context = this.canvas.getContext('2d');

        if (!context) {
            throw new Error('Obtaining 2d rendering context from canvas failed!');
        }

        context.fillStyle = 'black';
        context.fillRect(0, 0, this.config.default.width, this.config.default.height);

        context.fillStyle = 'white';
        context.font = '24px sans-serif';
        context.fillText('Hello World',
            (this.config.default.width - context.measureText('Hello World').width) / 2,
            (this.config.default.height - 24) / 2,
        );

        this.mob?.render(context);
    }
}