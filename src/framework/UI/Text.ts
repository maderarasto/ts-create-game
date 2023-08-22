import Component from "./Component";

/**
 * Represents a text UI component for display text on canvas. Text component can be customized by
 * actual text, text color, font and alignment. If box of text is smaller ten actual text for given font
 * then size of text box is updated based on size of actual text.
 */
export default class Text extends Component<UI.TextProps> {
    /**
     * Represents default values for a text component that extends default values of a base UI compojnent
     */
    protected static readonly DEFAULT_VALUES: UI.TextProps = {
        ...Component.DEFAULT_VALUES,
        font: '16px sans-serif',
        text: '',
        textColor: 'black',
        textAlign: 'start',
        verticalAlign: 'start'
    }

    constructor(props: Partial<UI.TextProps> = {}) {
        super(props);

        
    }

    /**
     * Render text with given style at top of base component rendering.
     * 
     * @param context 
     */
    render(context: CanvasRenderingContext2D): void {
        super.render(context);

        let x = this.prop('x') as number;
        let y = this.prop('y') as number;
        let width = this.prop('width') as number;
        let height = this.prop('height') as number;

        const text = this.prop('text') as string;
        const textAlign = this.prop('textAlign') as UI.Alignment;
        const verticalAlign = this.prop('verticalAlign') as UI.Alignment;
        const measurement = context.measureText(text);

        // Update box width if actual width of text is greater
        if (measurement.width > width) {
            width = measurement.width;
            this.prop('width', width);
        }

        // Update box height if actual height of text is greater
        if (measurement.actualBoundingBoxDescent > height) {
            height = measurement.actualBoundingBoxDescent;
            this.prop('height', height);
        }

        // Fix position based on alignment
        x = this.calculatePositionWithAlign(x, textAlign, width, measurement.width);
        y = this.calculatePositionWithAlign(y, verticalAlign, height, measurement.actualBoundingBoxDescent);

        context.font = this.prop('font') as string;
        context.fillStyle = this.prop('textColor') as string;
        context.textBaseline = 'top';
        
        context.fillText(text, x, y);
    }

    /**
     * Calculate position based on alignment within a box around text.
     * 
     * @param position position on axis
     * @param align alignment on axis
     * @param boxSpan box size on axis
     * @param textSpan text size on axis
     * @returns position based on alignment.
     */
    private calculatePositionWithAlign(position: number, align: UI.Alignment, boxSpan: number, textSpan: number): number {
        if (align === 'end') {
            position += boxSpan - textSpan
        } else if (align === 'center') {
            position += (boxSpan - textSpan) / 2
        }

        return position;
    }
}