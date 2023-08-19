import State from "../../framework/States/State";

/**
 * Represents a first state after application started.
 */
export default class IntroState extends State {
    handleEvent(event: Core.Event): boolean {
        return true;
    }

    update(deltaTime: number): boolean {
        return true;
    }
    
    render(context: CanvasRenderingContext2D): void {
        
    }

}