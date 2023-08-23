import Component from "./Component";

/**
 * Represents an image that can be rendered on canvas on which can be anchored or stretched.
 */
export default class Image extends Component<UI.ImageProps> {
    protected static readonly DEFAULT_VALUES: UI.ImageProps = {
        ...Component.DEFAULT_VALUES,
        source: undefined
    }

    private usingOriginalWidth: boolean = false;
    private usingOriginalHeight: boolean = false;

    constructor(props: Partial<UI.ImageProps>) {
        super(props);
        this.updateComponentSize();
    }

    prop(name: keyof UI.ImageProps): UI.ImageProps[keyof UI.ImageProps];
    prop(name: keyof UI.ImageProps, value: UI.ImageProps[keyof UI.ImageProps]): void;

    prop(name: keyof UI.ImageProps, value?: UI.ImageProps[keyof UI.ImageProps]): UI.ImageProps[keyof UI.ImageProps]|void {
        if (value === undefined) {
            return super.prop(name);
        }

        super.prop(name, value);

        if (name === 'source') {
            this.resetComponentSize();
            this.updateComponentSize();
        }
    }

    /**
     * Render an image with given properties at top of base component rendering.
     * @param context 
     * @returns 
     */
    render(context: CanvasRenderingContext2D): void {
        super.render(context);

        if (!this.prop('source')) {
            return;
        }

        context.drawImage(
            this.prop('source') as HTMLImageElement,
            this.prop('x') as number,
            this.prop('y') as number,
            this.prop('width') as number,
            this.prop('height') as number
        );
    }

    /**
     * Reset component size based on indicators for using size of actual image.
     */
    private resetComponentSize() {
        if (this.usingOriginalWidth) {
            this.prop('width', 0);
            this.usingOriginalWidth = false;
        }

        if (this.usingOriginalHeight) {
            this.prop('height', 0);
            this.usingOriginalHeight = false;
        }
    }

    /** Update component size based on actual size */
    private updateComponentSize() {
        const width = this.prop('width') as number;
        const height = this.prop('height') as number;
        const source = this.prop('source') as HTMLImageElement;

        if (source && !width) {
            this.prop('width', source.width);
            this.usingOriginalWidth = true;
        }

        if (source && !height) {
            this.prop('height', source.height);
            this.usingOriginalHeight = true;
        }
    }
}