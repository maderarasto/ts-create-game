import Factory from "../Interfaces/Factory";
import State from "./State";
import StateStack from "./StateStack";

/**
 * Provides functionality for creating instances of state implementations.
 */
export  default class StateFactory implements Factory<string, State> {
    private stateConstructors: Map<string, Core.Constructor<State>>;

    constructor() {
        this.stateConstructors = new Map();
    }

    /**
     * Register a constructor of a state class be its key.
     * If key is already registered it will raise an error.
     * 
     * @param key unique key of state.
     * @param constructor constructor of state implementation.
     */
    register(key: string, constructor: Core.Constructor<State>): void {
        if (this.stateConstructors.has(key)) {
            throw new Error(`A state with key "${key}" is already registered`);
        }

        this.stateConstructors.set(key, constructor);
    }

    /**
     * Create an instance of state implementation on demand by its given key.
     * If key is not registered it will raise an error.
     * 
     * @param key unique key of state.
     * @param context state context.
     * @returns instance of state implementation.
     */
    create(key: string, stack: StateStack, context: States.Context): State {
        const constructor = this.stateConstructors.get(key);

        if (!constructor) {
            throw new Error(`A state with key "${key}" is already registered`);
        }

        return new constructor(stack, context);
    }

}