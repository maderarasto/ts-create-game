import CanHandleEvent from "../Interfaces/CanHandleEvent";
import Renderable from "../Interfaces/Renderable";
import Updatable from "../Interfaces/Updatable";

/**
 * Provides functionality for rendering UI elements and better positioning on renderable area.
 */
export default class Canvas implements CanHandleEvent, Updatable, Renderable {
    private elements: Map<string, Renderable>;
    public backgroundColor: string;

    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly width: number,
        public readonly height: number
    ) {
        this.elements = new Map();
        this.backgroundColor = 'transparent';
    }

    /**
     * Add a new UI element to canvas identified by unique id.
     * 
     * @param id unique id of new element.
     * @param element UI element.
     */
    addElement(id: string, element: Renderable) {
        if (this.elements.has(id)) {
            throw new Error(`UI Element with id "${id}" already exist!`);
        }

        this.elements.set(id, element);
    }

    /**
     * Find a UI element added to canvas by its id.
     * 
     * @param id unique id of searched element.
     * @returns UI element or undefined.
     */
    findElement(id: string) {
        return this.elements.get(id);
    }

    /**
     * Remove a UI element from canvas by identifier.
     * 
     * @param id unique id of UI element.
     */
    removeElement(id: string) {
        if (!this.elements.has(id)) {
            throw new Error(`UI element with id "${id}" not found!`);
        }

        this.elements.delete(id);
    }

    /**
     * Clear all UI elements of canvas.
     */
    clear() {
        this.elements.clear();
    }

    /**
     * Handle event for each UI element that can handle events.
     * 
     * @param event event from event queue.
     */
    handleEvent(event: Core.Event): void {
        this.elements.forEach((element, id) => {
            // TODO: Call handle event on element that can handle events
        });
    }
    
    /**
     * Update a logic for each UI element that can be updatable.
     * 
     * @param deltaTime seconds since last update.
     */
    update(deltaTime: number): void {
        this.elements.forEach((element, id) => {
            // TODO: Call update on element that can be updatable.
        })
    }

    /**
     * Render background of canvas with each element on it.
     * 
     * @param context 2d renmdering context.
     */
    render(context: CanvasRenderingContext2D): void {
        if (this.backgroundColor === 'transparent') {
            context.globalAlpha = 0;    
        } else {
            context.fillStyle = this.backgroundColor;
        }
        
        context.fillRect(this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
    }

}