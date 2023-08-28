import Rect from "../Core/Rect";
import CanHandleEvent from "../Interfaces/CanHandleEvent";
import Renderable from "../Interfaces/Renderable";
import Canvas from "./Canvas";
 
/**
 * Represents an abstract UI component that can be rendered on canvas or individually.
 * Each UI component can be customized with properties such as position, size and colors.
 */
export default abstract class Component<P extends UI.Props> implements CanHandleEvent, Renderable {
    protected static readonly DEFAULT_VALUES: UI.Props = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        padding: [0, 0],
        borderColor: 'transparent',
        backgroundColor: 'transparent'
    }

    protected props: Map<keyof P, P[keyof P]>;
    protected eventStates: Map<string, boolean>;
    
    private canvas?: Canvas;
    private anchor?: UI.Anchor;

    // event handlers
    public onMouseOver?: (event: Core.MouseOverEvent) => void;
    public onMouseEnter?: (event: Core.MouseOverEvent) => void;
    public onMouseLeave?: (event: Core.MouseOverEvent) => void;

    constructor(props: Partial<P>, excludedKeys: Array<keyof P> = []) {
        this.props = new Map();
        this.eventStates = new Map([
            ['MouseOver', false]
        ]);

        const excludedPropKeys = new Set<keyof P>(excludedKeys);
        const defaultValues = this.getDefaultValues(this);
        
        Object.entries(defaultValues).forEach(([key, prop]) => {
            if ([...excludedPropKeys].includes(key as keyof P)) {
                return;
            }

            type PropKey = keyof typeof props;
            const value = props[key as PropKey] !== undefined ? props[key as PropKey] : prop;

            this.props.set(key as keyof P, value as P[keyof P]);
        })
    }

    /**
     * Actual bounds of component.
     */
    get bounds(): Rect {
        return new Rect(
            this.prop('x') as number,
            this.prop('y') as number,
            this.actualWidth,
            this.actualHeight
        )
    }

    /**
     * Padding of component in format of tuple: [top, right, bottom, left].
     * If a component is stretched then padding will will always be zero.
     */
    get padding(): Readonly<UI.Padding> {
        const paddingProp = this.props.get('padding') as number | UI.PaddingAxis | UI.Padding;
        const padding: UI.Padding = [0, 0, 0, 0];

        if (this.canvas && this.anchor && this.anchor.stretch) {
            return padding;
        }

        if (typeof paddingProp === 'number') {
            padding.fill(paddingProp);
        } else if (Array.isArray(paddingProp) && paddingProp.length === 2) {
            padding[0] = padding[2] = paddingProp[0];
            padding[1] = padding[3] = paddingProp[1];
        } else if (Array.isArray(padding) && padding.length === 4) {
            padding[0] = paddingProp[0];
            padding[1] = paddingProp[1];
            padding[2] = paddingProp[2];
            padding[3] = paddingProp[3];
        }

        return padding;
    }

    /**
     * Actual width in which the padding is included.
     */
    get actualWidth() {
        return (this.prop('width') as number) + this.padding[1] + this.padding[3];
    }

    /**
     * Actual height in which the padding is included.
     */
    get actualHeight() {
        return (this.prop('height') as number) + this.padding[0] + this.padding[2];
    }

    /**
     * Check if component is idle without any event state.
     * 
     * @returns boolean result
     */
    isIdle() {
        return [
            ...this.eventStates.values()
        ].every(value => !value);
    }

    /**
     * Shutdown all events states.
     */
    shutDownEvents() {
        this.eventStates.forEach((_, key, states) => {
            states.set(key, false);
        })
    }

    /**
     * Set anchor on target.
     * 
     * @param anchor anchor or target.
     * @param target canvas.
     */
    setAnchorTo(anchor: UI.Anchor, target: Canvas) {
        this.anchor = anchor;
        this.canvas = target;
    }

    /**
     * Remove anchor of component on target.
     */
    removeAnchor() {
        this.canvas = undefined;
        this.anchor = undefined;
    }

    /**
     * Get a property by its name.
     * 
     * @param name name of property.
     */
    prop<T extends P[keyof P]>(name: keyof P): T;
    
    /**
     * Set a new value to property.
     * 
     * @param name name of property.
     * @param value new value of property.
     */
    prop(name: keyof P, value: P[keyof P]): void;
    prop<T extends P[keyof P] = never>(name: keyof P, value?: P[keyof P]):T | void {
        if (value === undefined) {
            let computedValue = this.props.get(name);

            if (['x', 'y'].includes(name as string)) {
                computedValue = this.resolveAxisPosition(name === 'x' ? 'horizontal' : 'vertical') as T;
            } else if (['width', 'height'].includes(name as string)) {
                computedValue = this.resolveSideLength(name === 'width' ? 'horizontal' : 'vertical') as T;
            }

            return computedValue as T;
        }

        this.props.set(name, value);
    }

    /**
     * Handle mouse events of UI component such as MouseOver, MouseEnter and MouseLeave.
     * 
     * @param event event from event queue.
     */
    handleEvent(event: Core.Event): void {
        if(!('x' in event) || !('y' in event) || !('alt' in event) || !('ctrl' in event) || !('shift' in event)) {
            return;
        }

        let mouseOver = this.eventStates.get('MouseOver');

        if (event.type === 'MouseOver' && this.bounds.includes({ x: event.x, y: event.y })) {
            if (!mouseOver && this.onMouseEnter) {
                this.onMouseEnter(event as Core.MouseOverEvent);
            }

            mouseOver = true;
            this.eventStates.set('MouseOver', mouseOver);

            if (this.onMouseOver) {
                this.onMouseOver(event as Core.MouseOverEvent);
            }
        } else {
            if (mouseOver && this.onMouseLeave) {
                event.type = 'MouseLeave';
                this.onMouseLeave(event as Core.MouseOverEvent);
            }

            mouseOver = false;
            this.eventStates.set('MouseOver', mouseOver);
        }
    }

    /**
     * Render background and border of component.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D): void {
        const backgroundColor = this.props.get('backgroundColor' as keyof P);
        const borderColor = this.props.get('borderColor' as keyof P);

        if (backgroundColor !== 'transparent') {
            context.fillStyle = backgroundColor as string;
            context.fillRect(
                this.prop('x') as number,
                this.prop('y') as number,
                this.actualWidth,
                this.actualHeight
            );
        }

        if (borderColor !== 'transparent') {
            context.strokeStyle = borderColor as string;
            context.strokeRect(
                this.prop('x') as number,
                this.prop('y') as number,
                this.actualWidth,
                this.actualHeight
            );
        }
    }

    /**
     * Get default values based on child class.
     * 
     * @param target 
     * @returns 
     */
    private getDefaultValues<T>(target: T) {
        type This = {
            constructor: This
            DEFAULT_VALUES: UI.Props
        } & T;

        return (target as This).constructor.DEFAULT_VALUES;
    }

    /**
     * Resolve position of component for given axis based on anchor to canvas.
     * 
     * @param axis axis type
     * @returns resolved position
     */
    private resolveAxisPosition(axis: 'horizontal'|'vertical') {
        let position = (axis === 'horizontal' ? this.props.get('x' as keyof P) : this.props.get('y' as keyof P)) as number;

        if (!this.canvas || !this.anchor) {
            return position;
        }

        const align = (axis === 'horizontal' ? this.anchor?.horizontal : this.anchor.vertical) as UI.Alignment;
        const canvasPosition = (axis === 'horizontal' ? this.canvas.x : this.canvas.y) as number;
        const canvasSideLength = (axis === 'horizontal' ? this.canvas.width : this.canvas.height) as number;
        const componentSideLength = (axis === 'horizontal' ? this.props.get('width' as keyof P) : this.props.get('height' as keyof P)) as number;
        const offset = (axis === 'horizontal' ? this.anchor?.offsetX ?? 0 : this.anchor.offsetY ?? 0) as number;
        const paddingLength = (axis === 'horizontal' ? this.padding[1] + this.padding[3] : this.padding[0] + this.padding[2]);

        if (this.anchor.stretch) {
            position = canvasPosition;
        } else if (align === 'start') {
            position = canvasPosition + offset;
        } else if (align === 'center') {
            position = (canvasSideLength - (componentSideLength + paddingLength)) / 2 + offset;
        }  else if (align === 'end') {
            position = canvasPosition + canvasSideLength - (componentSideLength + paddingLength) - offset;
        }

        return position;
    }

    /**
     * Resolve size of component for given side based on anchor to canvas.
     * 
     * @param side side of component.
     * @returns resolved side length.
     */
    private resolveSideLength(axis: 'horizontal' | 'vertical') {
        let sideLength = (axis === 'horizontal' ? this.props.get('width' as keyof P) : this.props.get('height' as keyof P)) as number;

        if (!this.canvas || !this.anchor) {
            return sideLength;
        }

        const canvasSideLength = (axis === 'horizontal' ? this.canvas.width : this.canvas.height) as number;

        if (this.anchor.stretch) {
            sideLength = canvasSideLength;
        }

        return sideLength;
    }
}