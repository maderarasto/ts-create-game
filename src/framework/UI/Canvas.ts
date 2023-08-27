import CanHandleEvent from "../Interfaces/CanHandleEvent";
import Renderable from "../Interfaces/Renderable";
import Updatable from "../Interfaces/Updatable";
import Component from "./Component";

/**
 * Provides functionality for rendering UI components and better positioning on renderable area.
 */
export default class Canvas implements CanHandleEvent, Updatable, Renderable {
    private components: Map<string, Component<UI.Props>>;
    public backgroundColor: string;

    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly width: number,
        public readonly height: number
    ) {
        this.components = new Map();
        this.backgroundColor = 'transparent';
    }

    /**
     * Add a new UI component to canvas identified by unique id.
     * 
     * @param id unique id of new component.
     * @param element UI component.
     * @param anchor anchor on canvas.
     */
    addElement<P extends UI.Props>(id: string, element: Component<P>, anchor?: UI.Anchor) {
        if (this.components.has(id)) {
            throw new Error(`UI component with id "${id}" already exist!`);
        }

        this.components.set(id, element as unknown as Component<UI.Props>);
        
        if (anchor && Object.keys(anchor).length > 0) {
            element.setAnchorTo(anchor, this);
        }
    }

    /**
     * Find a UI component added to canvas by its id.
     * 
     * @param id unique id of searched component.
     * @returns UI component or undefined.
     */
    findElement<P extends UI.Props>(id: string) {
        return this.components.get(id) as unknown as Component<P>;
    }

    /**
     * Remove a UI component from canvas by identifier.
     * 
     * @param id unique id of UI component.
     */
    removeElement(id: string) {
        if (!this.components.has(id)) {
            throw new Error(`UI component with id "${id}" not found!`);
        }

        this.components.get(id)?.removeAnchor();
        this.components.delete(id);
    }

    /**
     * Clear all UI components of canvas.
     */
    clear() {
        this.components.clear();
    }

    /**
     * Handle event for each UI component that can handle events.
     * 
     * @param event event from event queue.
     */
    handleEvent(event: Core.Event): void {
        this.components.forEach((component) => {
            component.handleEvent(event);
        });
    }
    
    /**
     * Update a logic for each UI component that can be updatable.
     * 
     * @param deltaTime seconds since last update.
     */
    update(deltaTime: number): void {
        this.components.forEach((component) => {
            if ('update' in component) {
                (component as Updatable).update(deltaTime);
            }
        })
    }

    /**
     * Render background of canvas with each component on it.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D): void {
        if (this.backgroundColor === 'transparent') {
            context.globalAlpha = 0;    
        } else {
            context.fillStyle = this.backgroundColor;
        }
        
        context.fillRect(this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;

        this.components.forEach((component) => {
            if ('render' in component) {
                component.render(context);
            }
        })
    }

}