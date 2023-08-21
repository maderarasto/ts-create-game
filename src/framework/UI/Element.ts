import Renderable from "../Interfaces/Renderable";

type PropsKey = keyof UI.Props;
type PropsValue = UI.Props[PropsKey];
 
/**
 * Represents an abstract UI element that can be rendered on canvas or individually.
 * Each UI element can be customized with properties such as position, size and colors.
 */
export default abstract class Element<P> implements Renderable {
    protected static readonly DEFAULT_VALUES: UI.Props = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        borderColor: 'transparent',
        backgroundColor: 'transparent'
    }

    protected props: Map<keyof P, P[keyof P]>;

    constructor(props: Partial<P>) {
        this.props = new Map();
        
        const defaultValues = this.getDefaultValues(this);
        Object.entries(defaultValues).forEach(([key, prop]) => {
            type PropKey = keyof typeof props;
            const value = props[key as PropKey] !== undefined ? props[key as PropKey] : prop;

            this.props.set(key as keyof P, value as P[keyof P]);
        })
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
            return this.props.get(name);
        }

        this.props.set(name, value);
        console.log(this.props);
    }

    /**
     * Render background and border of element.
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
}