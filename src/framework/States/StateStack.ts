import CanHandleEvent from "../Interfaces/CanHandleEvent";
import Renderable from "../Interfaces/Renderable";
import Updatable from "../Interfaces/Updatable";
import Queue from "../Core/Structures/Queue";
import State from "./State";
import StateFactory from "./StateFactory";

/**
 * Represents a request to change state stack based on action.
 */
type PendingRequest = {
    action: 'push' | 'pop' | 'clear'
    stateKey?: string
}

/**
 * Represents a stack of states that also serves as finite state machine of application.
 */
export default class StateStack implements CanHandleEvent, Updatable, Renderable {

    private states: State[];
    private requestQueue: Queue<PendingRequest>;
    private stateFactory: StateFactory;

    constructor(
        private context: States.Context
    ) {
        this.states = [];
        this.requestQueue = new Queue();
        this.stateFactory = new StateFactory();
    }

    /**
     * Check if state stack is empty.
     * 
     * @returns boolean result.
     */
    isEmpty() {
        return this.states.length === 0;
    }

    /**
     * Register a state constructor for creating an instance of state implementation.
     * 
     * @param stateKey unique key of state.
     * @param constructor constructor of state.
     */
    registerState(stateKey: string, constructor: Core.Constructor<State>) {
        this.stateFactory.register(stateKey, constructor);
    }

    /**
     * Make a request to push a new state from state instance.
     * 
     * @param stateKey unique key of state.
     */
    requestPushState(stateKey: string) {
        this.requestQueue.enqueue({
            action: 'push',
            stateKey: stateKey
        });
    }

    /**
     * Make a request to pop out last pushed state from state instance.
     */
    requestPopState() {
        this.requestQueue.enqueue({
            action: 'pop'
        });
    }

    /**
     * Make a request to clear all states in state stack from state instance.
     */
    requestClearStates() {
        this.requestQueue.enqueue({
            action: 'clear'
        });
    }

    /**
     * Handle event of all states in reverse until handling event of state return false.
     * 
     * @param event event from event queue.
     */
    handleEvent(event: Core.Event): void {
        [...this.states].reverse().every(state => {
            return state.handleEvent(event);
        });

        this.processRequests();
    }

    /**
     * Update logic of all states in reverse until updating logic of state return false.
     * 
     * @param deltaTime seconds since last update.
     */
    update(deltaTime: number): void {
        [...this.states].reverse().every(state => {
            return state.update(deltaTime);
        });

        this.processRequests();
    }

    /**
     * Render all states in state stack.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D): void {
        this.states.forEach(state => {
            state.render(context); 
        })
    }

    /**
     * Process all pendings requests on state stack.
     */
    private processRequests() {
        while (!this.requestQueue.isEmpty()) {
            const pendingRequest = this.requestQueue.dequeue();

            if (pendingRequest.action === 'push') {
                const stateKey = pendingRequest.stateKey as string;
                const state = this.stateFactory.create(stateKey, this, this.context);
                this.states.push(state);
            } else if (pendingRequest.action === 'pop') {
                const state = this.states.pop();
            } else if (pendingRequest.action === 'clear') {
                this.states = [];
            }
        }
    }
}