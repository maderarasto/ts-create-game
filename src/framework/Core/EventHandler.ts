import Queue from "./Queue";

/**
 * Provides functionality to handling events and pushing them into event queue.
 */
export default class EventsHandler {
    private static readonly KEYBOARD_EVENT_TYPES = [
        'KeyDown', 
        'KeyUp'
    ] as const;
    
    private static readonly MOUSE_MOVE_EVENT_TYPES = [
        'MouseMove', 
        'MouseEnter', 
        'MouseLeave', 
    ] as const;

    private static readonly MOUSE_BUTTON_EVENT_TYPES = [
        'MouseDown',
        'MouseUp'
    ] as const;

    private static readonly MAP_JS_MOUSE_BUTTONS: Record<number, Core.MouseButton> = {
        0: 'Left',
        1: 'Middle',
        2: 'Right'
    };

    private static readonly MAP_JS_EVENT_TYPES: Record<string, Core.EventType> = {
        keydown: 'KeyDown',
        keyup: 'KeyUp',
        mousedown: 'MouseDown',
        mouseup: 'MouseUp',
        mousemove: 'MouseMove',
        mouseenter: 'MouseEnter',
        mouseleave: 'MouseLeave',
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
        window.addEventListener('mouseenter', this.handleMouseMoveEvent.bind(this));
        window.addEventListener('mouseleave', this.handleMouseMoveEvent.bind(this));
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
     * Handle a keyboard event and push it to event queue.
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

    private handleMouseMoveEvent(ev: MouseEvent) {
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

    private handleMouseButtonEvent(ev: MouseEvent) {
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
            button: EventsHandler.MAP_JS_MOUSE_BUTTONS[ev.button]
        });
    }

    private handleMouseWheelEvent(ev: WheelEvent) {
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