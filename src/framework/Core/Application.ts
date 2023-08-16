import AssetManager from "../Assets/AssetManager";
import Mob from "../Entities/Mob";
import Sprite from "../Graphics/Sprite";
import defines from "../defines";
import PlayerController from "../PlayerController";
import Vector2 from "./Vector2";
import Queue from "./Queue";

export default class Application {
    private _config: Core.AppConfig;

    // Application signals
    private _running: boolean;
    
    // Framerate
    private _frames: number = 0;
    private _framerateUpdatedAt?: number;

    // Game loop timing
    private _loopStartedAt?: number;
    private _loopUpdatedAt?: number;
    private _loopInterval?: number;

    private canvas: HTMLCanvasElement;
    private assets: AssetManager;
    private commands: Queue<Entities.Command>;
    private playerControler: PlayerController;
    private mob?: Mob;

    constructor(config: Core.AppConfig) {
        this._config = config;
        this._running = false;
        
        this.canvas = document.querySelector('#app canvas') as HTMLCanvasElement;

        if (!this.canvas) {
            throw new Error('HTML element for canvas not found!');
        }

        this.assets = new AssetManager();
        this.commands = new Queue();
        this.playerControler = new PlayerController();

        this.canvas.focus();
        this.assets.loadImage(`${defines.ASSETS_DIR}/images/Tanks/tankBlue.png`, 'TANK_BLUE').then(() => {
            const tankImage = this.assets.get('image', 'TANK_BLUE') as HTMLImageElement;
            const tankSprite = new Sprite(tankImage, new Vector2(32, 32));
            
            this.mob = new Mob(tankSprite);
            this.mob.position = new Vector2(50, 50);
        })
    }

    get config() {
        return this._config;
    }

    run() {
        const timePerUpdate =  1000 / 60;

        this._running = true;
        this._loopStartedAt = Date.now();
        this._framerateUpdatedAt = Date.now();

        this._loopInterval = setInterval(() => {
            const elapsedTime = this.getTimeSinceLastUpdate();

            // Stop game loop interval if application is stopped.
            if (!this._running) {
                clearInterval(this._loopInterval);
                this._loopInterval = undefined;
            }

            this._loopUpdatedAt = Date.now();
            this.handleEvents();
            this.update(elapsedTime / 1000);
            this.render();
            this._frames++;

            if (this.getTimeSinceLastFramerateUpdate() >= 1000) {
                console.log('FPS:', this._frames);
                this._frames = 0;
                this._framerateUpdatedAt = Date.now();
            }
        }, timePerUpdate)
    }

    private handleEvents() {
        window.addEventListener('keydown', (ev) => {
            this.playerControler.handleKeyEvent(ev, this.commands);
        });
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

    private getTimeSinceStart() {
        return this._loopStartedAt !== undefined ? Date.now() - this._loopStartedAt : 0;
    }

    private getTimeSinceLastUpdate() {
        const diffFrom = this._loopUpdatedAt !== undefined 
            ? this._loopUpdatedAt 
            : this._loopStartedAt;
        
        return diffFrom !== undefined ? Date.now() - diffFrom : 0;
    }

    private getTimeSinceLastFramerateUpdate() {
        const diffFrom = this._framerateUpdatedAt !== undefined 
            ? this._framerateUpdatedAt 
            : this._loopStartedAt;
        
        return diffFrom !== undefined ? Date.now() - diffFrom : 0;
    }
}