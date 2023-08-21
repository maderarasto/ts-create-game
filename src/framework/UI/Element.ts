import Renderable from "../Interfaces/Renderable";

type PropsKey = keyof UI.Props;
type PropsValue = UI.Props[PropsKey];
 
/**
 * Represents an abstract UI element that can be rendered on canvas or individually.
 * Each UI element can be customized with properties such as position, size and colors.
 */
export default abstract class Element implements Renderable {
    protected static readonly DEFAULT_PROPS: UI.Props = {
        x: 0, 
        y: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    };

    protected props: UI.Props;

    constructor(props: Partial<UI.Props>) {
        this.props = {
            ...Element.DEFAULT_PROPS,
            ...props
        }
    }

    /**
     * Get a property by its name.
     * 
     * @param name name of property.
     */
    prop(name: PropsKey): PropsValue;

    /**
     * Set a new value to property.
     * 
     * @param name name of property.
     * @param value new value of property.
     */
    prop(name: PropsKey, value: PropsValue) : void;
    prop(name: PropsKey, value?: PropsValue): PropsValue | void {
        const property = this.props[name];

        if (!value) {
            return this.props[name];
        }
        
        this.props = {
            ...this.props,
            ...{
                [name]: value as typeof property
            }
        }
    }

    /**
     * Render background and border of element.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D): void {
        if (this.props.backgroundColor !== 'transparent') {
            context.fillStyle = this.props.backgroundColor;
            context.fillRect(this.props.x, this.props.y, this.props.width, this.props.height);
        }

        if (this.props.borderColor !== 'transparent') {
            context.strokeStyle = this.props.borderColor;
            context.strokeRect(this.props.x, this.props.y, this.props.width, this.props.height);
        }
    }
}