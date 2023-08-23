import State from "../../framework/States/State";
import StateStack from "../../framework/States/StateStack";
import Image from "../../framework/UI/Image";
import defines from "../../framework/defines";

/**
 * Represents a first state after application started.
 */
export default class IntroState extends State {
    constructor(stack: StateStack, context: States.Context) {
        super(stack, context);

        context.assets.loadImage(`${defines.ASSETS_DIR}/images/sample.png`, 'SAMPLE').then(() => {
            const asset = context.assets.get('image', 'SAMPLE');
            const image = new Image({
                source: asset
            });

            this.canvas.addElement('img', image);
        });

        setTimeout(() => {
            context.assets.loadImage(`${defines.ASSETS_DIR}/images/sheet_tanks.png`, 'SHEET_TANKS').then(() => {
                const asset = context.assets.get('image', 'SHEET_TANKS');
                this.canvas.findElement<UI.ImageProps>('img').prop('source', asset);
            });
        }, 5000);
    }

    handleEvent(event: Core.Event): boolean {
        return true;
    }

    update(deltaTime: number): boolean {
        return true;
    }
    
    render(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'white';
        context.fillRect(0, 0, this.context.config.default.width, this.context.config.default.height);

        super.render(context);
    }

}