import AssetManager from "../Assets/AssetManager";
import Mob from "../Entities/Mob";
import Sprite from "../Graphics/Sprite";
import defines from "../defines";
import Vector2 from "./Vector2";

export default class Application {
    private _config: Core.AppConfig;

    // Application indicators
    private _running: boolean;
    
    // Timing a frames
    private _lastUpdateTime: number;
    private _lastFpsCountTime: number;
    private _frames: number;
    
    // Managers
    private assets: AssetManager;
    private mob?: Mob;

    constructor(config: Core.AppConfig) {
        this._config = config;
        this._running = false;
        this._lastUpdateTime = 0;
        this._lastFpsCountTime = 0;
        this._frames = 0;
        
        this.assets = new AssetManager();
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

        requestAnimationFrame(this.processLoop.bind(this));
    }

    private handleEvents() {

    }

    private update(deltaTime: number) {
        if (this.mob) {
            this.mob.velocity.x = 100;
            this.mob.update(deltaTime);
        }
    }

    private render() {
        const canvas = document.querySelector('#app canvas') as HTMLCanvasElement;

        if (!canvas) {
            throw new Error('HTML element for canvas not found!');
        }

        const context = canvas.getContext('2d');

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