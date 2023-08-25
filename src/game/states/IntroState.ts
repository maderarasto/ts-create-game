import Rect from "../../framework/Core/Rect";
import State from "../../framework/States/State";
import StateStack from "../../framework/States/StateStack";
import Text from "../../framework/UI/Text";

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

        console.log(this.rect1.intersects(this.rect2));

        const text = new Text({
            text: 'Hello World'
        });

        text.onMouseEnter = (event) => {
            console.log(event.type, event.x, event.y);
        }

        text.onMouseLeave = (event) => {
            console.log(event.type, event.x, event.y);
        }

        this.canvas.addElement('helloWorldText', text, {
            vertical: 'center',
            horizontal: 'center'
        });
    }

    handleEvent(event: Core.Event): boolean {
        this.canvas.handleEvent(event);

        return true;
    }

    update(deltaTime: number): boolean {
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