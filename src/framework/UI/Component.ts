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
        if (!value) {
            if (['x', 'y'].includes(name as string) && this.anchor && this.canvas) {
                return this.resolveAxisPosition(name as 'x'|'y') as P[keyof P];
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
     * Resolve position of element for given axis based on anchor to canvas.
     * 
     * @param axis axis type
     * @returns resolved position
     */
    private resolveAxisPosition(axis: 'x'|'y') {
        let position = 0;

        const x = this.props.get('x' as keyof P) as number;
        const y = this.props.get('y' as keyof P) as number;
        const width = this.prop('width' as keyof P) as number;
        const height = this.prop('height' as keyof P) as number;

        if (axis === 'x') {
            position = this.calculatePositionByAnchor(
                this.anchor?.horizontal as UI.Alignment, 
                this.canvas?.x as number,
                this.canvas?.width as number,
                width,
                this.anchor?.offsetX as number,
                x
            );
        } else if (axis === 'y') {
            position = this.calculatePositionByAnchor(
                this.anchor?.vertical as UI.Alignment, 
                this.canvas?.y as number,
                this.canvas?.height as number,
                height,
                this.anchor?.offsetY as number,
                y
            );
        }

        return position;
    }

    /**
     * Calculate position based on alignment, offset and spans.
     * 
     * @param align alignment
     * @param canvasPosition canvas position on axis
     * @param canvasSpan canvas size on axis
     * @param componentSpan component size on axis
     * @param offset offset from given alignment
     * @param defaultValue default position value.
     * 
     * @returns position on axis.
     */
    private calculatePositionByAnchor(
        align: UI.Alignment, 
        canvasPosition: number, 
        canvasSpan: number, 
        componentSpan: number,
        offset: number = 0,
        defaultValue = 0
    ) {
        let position = defaultValue;

        if (align === 'start') {
            position = canvasPosition + offset;
        } else if (align === 'center') {
            position = (canvasSpan - componentSpan) / 2 + offset;
        } else if (align === 'end') {
            position = canvasPosition + canvasSpan - componentSpan - offset;
        }

        return position;
    }
}