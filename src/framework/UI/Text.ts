import Element from "./Element";

export default class Text extends Element<UI.TextProps> {
    protected static readonly DEFAULT_VALUES: UI.TextProps = {
        ...Element.DEFAULT_VALUES,
        font: '16px sans-serif',
        text: '',
        textColor: 'black',
        textAlign: 'start',
        verticalAlign: 'start'
    }

    constructor(props: Partial<UI.TextProps> = {}) {
        super(props);

        
    }

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

    private calculatePositionWithAlign(axis: number, align: UI.Alignment, boxSpan: number, textSpan: number): number {
        if (align === 'end') {
            axis += boxSpan - textSpan
        } else if (align === 'center') {
            axis = (boxSpan - textSpan) / 2
        }

        return axis;
    }
}