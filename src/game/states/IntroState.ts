import Rect from "../../framework/Core/Rect";
import State from "../../framework/States/State";
import StateStack from "../../framework/States/StateStack";
import TextButton from "../../framework/UI/TextButton";

/**
 * Represents a first state after application started.
 */
export default class IntroState extends State {
    private rect1: Rect;
    private rect2: Rect;

    constructor(stack: StateStack, context: States.Context) {
        super(stack, context);

        this.rect1 = new Rect(100, 100, 50, 50);
        this.rect2 = this.rect1.clone();

        const button = new TextButton({
            borderColor: 'green'
        });

        button.disabled = true;
        button.onClick = function () {
            console.log('CLick Me!');
        }

        this.canvas.addElement('button', button, {
            vertical: 'center',
            horizontal: 'center'
        });
    }

    handleEvent(event: Core.Event): boolean {
        this.canvas.handleEvent(event);

        return true;
    }

    update(deltaTime: number): boolean {
        this.canvas.update(deltaTime);

        return true;
    }
    
    render(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'white';
        context.fillRect(0, 0, this.context.config.default.width, this.context.config.default.height);

        context.strokeStyle = 'black';
        context.strokeRect(this.rect1.x, this.rect1.y, this.rect1.width, this.rect1.height);

        context.strokeStyle = 'blue';
        context.strokeRect(this.rect2.x, this.rect2.y, this.rect2.width, this.rect2.height);

        super.render(context);
    }

}