import CanHandleEvent from "../Interfaces/CanHandleEvent";
import Renderable from "../Interfaces/Renderable";
import Updatable from "../Interfaces/Updatable";
import Canvas from "../UI/Canvas";
import StateStack from "./StateStack";

/**
 * Represents an abstract base state in which application can be.
 * Each implementation of statehave to implement its own hadling events, 
 * updating logic and rendering its own assets.
 */
export default abstract class State implements CanHandleEvent, Updatable, Renderable {
    protected canvas: Canvas;

    constructor(
        private stack: StateStack,
        protected context: States.Context
    ) {
        this.canvas = new Canvas(0, 0, context.config.default.width, context.config.default.height);
    }

    /**
     * Make a request to the state stack to push a new state.
     * All pending requests will be processed after handling events and update logic in state stack.
     * 
     * @param stateName name of pushed state.
     */
    requestPushState(stateKey: string) {
        this.stack.requestPushState(stateKey);
    }

    /**
     * Make a request to the state stack to pop out last pushed state.
     * All requests will be processed after handling events and update logic in state stack.
     */
    requestPopState() {
        this.stack.requestPopState();
    }

    /**
     * Make a request to the state stack to clear all stacked states.
     * All requests will be processed after handling events and update logic in state stack.
     */
    requestClearStates() {
        this.stack.requestClearStates();
    }

    /**
     * Handle an event from event queue. If result is false then state stack will not handle 
     * events of next states.
     * 
     * @param event event
     */
    abstract handleEvent(event: Core.Event): boolean;

    /**
     * Update a logic of current state. If result is false then state stack will not update logic 
     * of next states.
     * 
     * @param deltaTime seconds since last update.
     */
    abstract update(deltaTime: number): boolean;

    /**
     * Render visual content of current state.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D) {
        this.canvas.render(context);
    }
}