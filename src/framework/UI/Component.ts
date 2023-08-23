import Renderable from "../Interfaces/Renderable";
import Canvas from "./Canvas";
 
/**
 * Represents an abstract UI component that can be rendered on canvas or individually.
 * Each UI component can be customized with properties such as position, size and colors.
 */
export default abstract class Component<P> implements Renderable {
    protected static readonly DEFAULT_VALUES: UI.Props = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        borderColor: 'transparent',
        backgroundColor: 'transparent'
    }

    protected props: Map<keyof P, P[keyof P]>;
    private canvas?: Canvas;
    private anchor?: UI.Anchor;

    constructor(props: Partial<P>) {
        this.props = new Map();
        
        const defaultValues = this.getDefaultValues(this);
        Object.entries(defaultValues).forEach(([key, prop]) => {
            type PropKey = keyof typeof props;
            const value = props[key as PropKey] !== undefined ? props[key as PropKey] : prop;

            this.props.set(key as keyof P, value as P[keyof P]);
        })
    }

    setAnchorTo(anchor: UI.Anchor, target: Canvas) {
        this.anchor = anchor;
        this.canvas = target;
    }

    removeAnchor() {
        this.canvas = undefined;
        this.anchor = undefined;
    }

    /**
     * Get a property by its name.
     * 
     * @param name name of property.
     */
    prop(name: keyof P): P[keyof P];
    
    /**
     * Set a new value to property.
     * 
     * @param name name of property.
     * @param value new value of property.
     */
    prop(name: keyof P, value: P[keyof P]): void;
    prop(name: keyof P, value?: P[keyof P]): P[keyof P] | void {
        if (value === undefined) {
            if (this.anchor && this.canvas) {
                if (['x', 'y'].includes(name as string)) {
                    return this.resolveAxisPosition(name as 'x'|'y') as P[keyof P];
                } else if (['width', 'height'].includes(name as string)) {
                    return this.resolveSideLength(name as 'width'|'height') as P[keyof P];
                }
            }

            return this.props.get(name);
        }

        this.props.set(name, value);
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
                this.props.get('x' as keyof P) as number,
                this.props.get('y' as keyof P) as number,
                this.props.get('width' as keyof P) as number,
                this.props.get('height' as keyof P) as number
            );
        }

        if (borderColor !== 'transparent') {
            context.strokeStyle = borderColor as string;
            context.strokeRect(
                this.props.get('x' as keyof P) as number,
                this.props.get('y' as keyof P) as number,
                this.props.get('width' as keyof P) as number,
                this.props.get('height' as keyof P) as number
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
    private resolveAxisPosition(axis: 'x'|'y') {
        let position = (axis === 'x' ? this.props.get('x' as keyof P) : this.props.get('y' as keyof P)) as number;
        const align = (axis === 'x' ? this.anchor?.horizontal : this.anchor?.vertical) as UI.Alignment;
        const canvasPosition = (axis === 'x' ? this.canvas?.x : this.canvas?.y) as number;
        const canvasSideLength = (axis === 'x' ? this.canvas?.width : this.canvas?.height) as number;
        const componentSideLength = (axis === 'x' ? this.props.get('width' as keyof P) : this.props.get('height' as keyof P)) as number;
        const offset = (axis === 'x' ? this.anchor?.offsetX ?? 0 : this.anchor?.offsetY ?? 0) as number;

        if (this.anchor?.stretch) {
            position = canvasPosition;
        } else if (align === 'start') {
            position = canvasPosition + offset;
        } else if (align === 'center') {
            position = (canvasSideLength - componentSideLength) / 2 + offset;
        }  else if (align === 'end') {
            position = canvasPosition + canvasSideLength - componentSideLength - offset;
        }

        return position;
    }

    /**
     * Resolve size of component for given side based on anchor to canvas.
     * 
     * @param side side of component.
     * @returns resolved side length.
     */
    private resolveSideLength(side: 'width' | 'height') {
        let sideLength = (side === 'width' ? this.props.get('width' as keyof P) : this.props.get('height' as keyof P)) as number;
        const canvasSideLength = (side === 'width' ? this.canvas?.width : this.canvas?.height) as number;

        if (this.anchor?.stretch) {
            sideLength = canvasSideLength;
        }

        return sideLength;
    }
}