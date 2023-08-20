import State from "../../framework/States/State";
import StateStack from "../../framework/States/StateStack";

/**
 * Represents a first state after application started.
 */
export default class IntroState extends State {
    constructor(stack: StateStack, context: States.Context) {
        super(stack, context);
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