import CanHandleEvent from "../Interfaces/CanHandleEvent";
import Renderable from "../Interfaces/Renderable";
import Updatable from "../Interfaces/Updatable";

/**
 * Represents an abstract base state in which application can be.
 * Each implementation of statehave to implement its own hadling events, 
 * updating logic and rendering its own assets.
 */
export default abstract class State implements CanHandleEvent, Updatable, Renderable {
    constructor(
        protected context: States.Context
    ) {

    }

    /**
     * Make a request to the state stack to push a new state.
     * All pending requests will be processed after handling events and update logic in state stack.
     * 
     * @param stateName name of pushed state.
     */
    requestPushState(stateName: string) {
        // TODO: request from stack to push new state.
    }

    /**
     * Make a request to the state stack to pop out last pushed state.
     * All requests will be processed after handling events and update logic in state stack.
     */
    requestPopState() {
        // TODO: request from stack to pop out last pushed state.
    }

    /**
     * Make a request to the state stack to clear all stacked states.
     * All requests will be processed after handling events and update logic in state stack.
     */
    requestClearStates() {
        // TODO: request from stack to clear all states.
    }

    /**
     * Handle an event from event queue. 
     * 
     * @param event event
     */
    abstract handleEvent(event: Core.Event): boolean;

    /**
     * Update a logic of current state.
     * 
     * @param deltaTime seconds since last update.
     */
    abstract update(deltaTime: number): boolean;

    /**
     * Render visual content of current state.
     * 
     * @param context 2d rendering context.
     */
    abstract render(context: CanvasRenderingContext2D): void;
}