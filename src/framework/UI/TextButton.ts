import CanBeDisabled from "../Interfaces/CanBeDisabled";
import Updatable from "../Interfaces/Updatable";
import Component from "./Component";
import Text from "./Text";

type TextButtonPropKey = keyof UI.TextButtonProps;
type TextButtonPropValue = UI.TextButtonProps[TextButtonPropKey];

type TextButtonColorState = {
    textColor: string
    borderColor: string
    backgroundColor: string
}

/**
 * Represents a clickable button UI component with text content and on click handler.
 * Text button can be in various states such as Idle, Highlight, Pressed and disabled and
 * button can be customized based on these states through props passed to constructor.
 * Text content of button can be also customized but through accessor text.
 */
export default class TextButton extends Component<UI.TextButtonProps> implements Updatable, CanBeDisabled {
    protected static readonly DEFAULT_VALUES: UI.TextButtonProps = {
        ...Component.DEFAULT_VALUES,
        backgroundColor: '#d8d8d8',
        borderColor: '#666',
        padding: [5, 20],
        highlightTextColor: 'black',
        highlightBorderColor: '#666',
        highlightBackgroundColor: '#ccc',
        pressedTextColor: 'white',
        pressedBorderColor: '#666',
        pressedBackgroundColor: '#666'
    }

    /**
     * Text component of button.
     */
    public text: Text;

    /**
     * Indicator for disabling button.
     */
    public disabled: boolean;

    /**
     * Event handler for click event.
     */
    public onClick?: (event: Core.MouseButtonEvent) => void;

    private currentState: UI.ButtonState = 'Idle';
    private buttonStates: Map<UI.ButtonState, TextButtonColorState>;

    constructor(props: Partial<UI.TextButtonProps> = {}) {
        super(props);

        this.disabled = false;
        this.text = new Text({
            text: 'Button',
            textColor: '#333',
            font: '14px sans-serif',
            textAlign: 'center',
            verticalAlign: 'center'
        });

        this.eventStates.set('MousePressed', false);
        this.buttonStates = new Map([
            ['Idle', {
                textColor: this.text.prop<string>('textColor'),
                borderColor: this.prop<string>('borderColor'),
                backgroundColor: this.prop<string>('backgroundColor')
            }],
            ['Highlight', {
                textColor: this.prop<string>('highlightTextColor'),
                borderColor: this.prop<string>('highlightBorderColor'),
                backgroundColor: this.prop<string>('highlightBackgroundColor')
            }],
            ['Pressed', {
                textColor: this.prop<string>('pressedTextColor'),
                borderColor: this.prop<string>('pressedBorderColor'),
                backgroundColor: this.prop<string>('pressedBackgroundColor')
            }]
        ])

        const x = this.prop<number>('x');
        const y = this.prop<number>('y');

        this.text.prop('x', x + this.padding[3]);
        this.text.prop('y', y + this.padding[0]);
    }

    /**
     * Handle mouse events of button.
     * 
     * @param event 
     */
    handleEvent(event: Core.Event): void {
        super.handleEvent(event);

        if (this.disabled) {
            return;
        }

        if (['MouseDown', 'MouseUp'].includes(event.type)) {
            const mouseDownEvent = event as Core.MouseButtonEvent;
            const inBounds = this.bounds.includes({x: mouseDownEvent.x, y: mouseDownEvent.y});

            if (event.type === 'MouseDown' && inBounds && mouseDownEvent.button === 'Left') {
                this.eventStates.set('MousePressed', true);
            } else if (event.type === 'MouseUp' && inBounds && mouseDownEvent.button === 'Left') {
                this.eventStates.set('MousePressed', false);
                this.onClick?.call(this, mouseDownEvent);
            } else {
                this.eventStates.set('MousePressed', false);
            }
        }
    }

    /**
     * Update colors of text button based on current button state.
     * 
     * @param deltaTime seconds since last update.
     */
    update(deltaTime: number): boolean | void {
        this.text.prop('x', this.prop<number>('x') + this.padding[3]);
        this.text.prop('y', this.prop<number>('y') + this.padding[0]);

        if (this.disabled) {
            this.shutDownEvents();
        }

        if (this.eventStates.get('MouseOver') === true) {
            this.currentState = 'Highlight'
        } 
        
        if (this.eventStates.get('MousePressed') === true) {
            this.currentState = 'Pressed';
        }

        if (this.isIdle()) {
            this.currentState = 'Idle';
        }

        this.text.prop('textColor', this.buttonStates.get(this.currentState)?.textColor as string);
        this.prop('borderColor', this.buttonStates.get(this.currentState)?.borderColor as string);
        this.prop('backgroundColor', this.buttonStates.get(this.currentState)?.backgroundColor as string);
    }

    /**
     * Render button and its text compoponent.
     * 
     * @param context 2d rendering context.
     */
    render(context: CanvasRenderingContext2D): void {
        if (this.disabled) {
            context.globalAlpha = 0.5
        }

        super.render(context);

        let width = this.prop<number>('width');
        let height = this.prop<number>('height');

        if (!this.text) {
            return;
        }

        this.text.render(context);

        let textWidth = this.text.prop<number>('width');
        let textHeight = this.text.prop<number>('height');

        if (textWidth > width) {
            width = textWidth;
            this.prop('width', width);
        }

        if (textHeight > height) {
            height = textHeight;
            this.prop('height', height);
        }

        if (width > textWidth) {
            textWidth = width;
            this.text.prop('width', textWidth);
        }

        if (height > textHeight) {
            textHeight = height;
            this.text.prop('height', textHeight);
        }

        context.globalAlpha = 1;
    }
}