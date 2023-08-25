import Queue from "./Structures/Queue";

/**
 * Provides functionality to handling events and pushing them into event queue.
 */
export default class EventsHandler {
    /**
     * List of keyboard event types. 
     */
    private static readonly KEYBOARD_EVENT_TYPES = [
        'KeyDown', 
        'KeyUp'
    ] as const;
    
    /**
     * List of mouse event types for movement and entering/leaving area.
     */
    private static readonly MOUSE_MOVE_EVENT_TYPES = [
        'MouseOver', 
        'MouseEnter', 
        'MouseLeave', 
    ] as const;

    /**
     * List of mouse event types for clicking.
     */
    private static readonly MOUSE_BUTTON_EVENT_TYPES = [
        'MouseDown',
        'MouseUp'
    ] as const;

    /**
     * Bindings for DOM mouse buttons.
     */
    private static readonly MAP_DOM_MOUSE_BUTTONS: Record<number, Core.MouseButton> = {
        0: 'Left',
        1: 'Middle',
        2: 'Right'
    };

    /**
     * Bindings for DOM event types
     */
    private static readonly MAP_JS_EVENT_TYPES: Record<string, Core.EventType> = {
        keydown: 'KeyDown',
        keyup: 'KeyUp',
        mousedown: 'MouseDown',
        mouseup: 'MouseUp',
        mousemove: 'MouseOver',
        wheel: 'MouseWheel'
    };

    private canvas: HTMLCanvasElement;
    private queue: Queue<Core.Event>;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.queue = new Queue();

        window.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
        window.addEventListener('keyup', this.handleKeyboardEvent.bind(this));
        window.addEventListener('mousemove', this.handleMouseMoveEvent.bind(this));
        window.addEventListener('mousedown', this.handleMouseButtonEvent.bind(this));
        window.addEventListener('mouseup', this.handleMouseButtonEvent.bind(this));
        window.addEventListener('wheel', this.handleMouseWheelEvent.bind(this));
    }

    /**
     * Check if event queue is empty.
     * @returns 
     */
    isEmpty(): boolean {
        return this.queue.isEmpty();
    }

    /**
     * Pop a first event in queue. If queue is empty then it will throw error.
     * @returns 
     */
    pollEvent(): Core.Event {
        if (this.queue.isEmpty()) {
            throw new Error('Cannot poll event from empty queue!');
        }

        return this.queue.dequeue();
    }

    /**
     * Handle keyboard events and push the into event queue.
     * 
     * @param ev keyboard event.
     */
    private handleKeyboardEvent(ev: KeyboardEvent) {
        type KeyboardEventType = typeof EventsHandler.KEYBOARD_EVENT_TYPES[number];
        const type = EventsHandler.MAP_JS_EVENT_TYPES[ev.type] as KeyboardEventType;

        if (!EventsHandler.KEYBOARD_EVENT_TYPES.includes(type)) {
            return;
        }
        
        this.queue.enqueue({
            type: type,
            code: ev.code,
            key: ev.key,
            alt: ev.altKey,
            ctrl: ev.ctrlKey,
            shift: ev.shiftKey
        });
    }

    /**
     * Handle mouse events related to mouse movement and push them into event queue.
     * 
     * @param ev mouse event
     */
    private handleMouseMoveEvent(ev: MouseEvent): void {
        type MouseEventType = typeof EventsHandler.MOUSE_MOVE_EVENT_TYPES[number];
        const type = EventsHandler.MAP_JS_EVENT_TYPES[ev.type] as MouseEventType;
        
        if (!EventsHandler.MOUSE_MOVE_EVENT_TYPES.includes(type)) {
            return;
        }

        if (!(ev.target instanceof HTMLCanvasElement)) {
            return;
        }

        const {x: canvasX, y: canvasY} = this.canvas.getBoundingClientRect();
        this.queue.enqueue({
            type: type,
            x: Math.floor(ev.x - canvasX),
            y: Math.floor(ev.y - canvasY),
            alt: ev.altKey,
            ctrl: ev.ctrlKey,
            shift: ev.shiftKey
        });
    }

    /**
     * Handle mouse events related to mouse buttons and push tem into event queue.
     * 
     * @param ev mouse event
     */
    private handleMouseButtonEvent(ev: MouseEvent): void {
        type MouseEventType = typeof EventsHandler.MOUSE_BUTTON_EVENT_TYPES[number];
        const type = EventsHandler.MAP_JS_EVENT_TYPES[ev.type] as MouseEventType;
        
        if (!EventsHandler.MOUSE_BUTTON_EVENT_TYPES.includes(type)) {
            return;
        }

        if (!(ev.target instanceof HTMLCanvasElement)) {
            return;
        }

        const {x: canvasX, y: canvasY} = this.canvas.getBoundingClientRect();
        this.queue.enqueue({
            type: type,
            x: Math.floor(ev.x - canvasX),
            y: Math.floor(ev.y - canvasY),
            alt: ev.altKey,
            ctrl: ev.ctrlKey,
            shift: ev.shiftKey,
            button: EventsHandler.MAP_DOM_MOUSE_BUTTONS[ev.button]
        });
    }

    /**
     * Handle mouse events related to scrolling and push them into event queue.
     * 
     * @param ev wheel event
     */
    private handleMouseWheelEvent(ev: WheelEvent): void {
        if (!(ev.target instanceof HTMLCanvasElement)) {
            return;
        }

        const {x: canvasX, y: canvasY} = this.canvas.getBoundingClientRect();
        this.queue.enqueue({
            type: 'MouseWheel',
            x: Math.floor(ev.x - canvasX),
            y: Math.floor(ev.y - canvasY),
            alt: ev.altKey,
            ctrl: ev.ctrlKey,
            shift: ev.shiftKey,
            delta: ev.deltaY ? ev.deltaY : ev.deltaX
        });
    }
}