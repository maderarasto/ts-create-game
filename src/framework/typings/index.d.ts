namespace Core {
    type AppConfig = {
        name: string

        default: {
            width: number,
            height: number
        }
    }

    /**
     * Represents of a constructor of class T.
     */
    type Constructor<T> = { new (...args: any): T}

    type Point = {
        x: number
        y: number
    }

    /**
     * Represents a type event that can occur in event queue.
     */
    type EventType = (
        | 'KeyDown'
        | 'KeyUp'
        | 'MouseDown'
        | 'MouseUp'
        | 'MouseOver'
        | 'MouseEnter'
        | 'MouseLeave'
        | 'MouseWheel'
    )

    /**
     * Represents button on mouse.
     */
    type MouseButton = (
        | 'Left'
        | 'Middle'
        | 'Right'
    )

    /**
     * Represents status in which can be keyboard keys.
     */
    type KeyboardKeyStatus = (
        | 'Pressed' 
        | 'Released'
    )

    /**
     * Represents an event in event queue.
     */
    type Event = {
        type: EventType
    } | {
        type: 'KeyDown' | 'KeyUp' | 'MouseDown' | 'MouseUp' | 'MouseOver' | 'MouseEnter' | 'MouseLeave' | 'MouseWheel',
        alt: boolean
        ctrl: boolean
        shift: boolean
    } | {
        type: 'KeyDown'|'KeyUp',
        code: string
        key: string
    } | {
        type: 'MouseDown' | 'MouseUp' | 'MouseOver' | 'MouseEnter' | 'MouseLeave' | 'MouseWheel',
        x: number
        y: number
    } | {
        type: 'MouseDown'|'MouseUp',
        button: MouseButton
    } | {
        type: 'MouseWheel',
        delta: number
    }

    type KeyboardEvent = Event & {
        type: 'KeyDown'|'KeyUp'
        code: string
        key: string
        alt: boolean
        ctrl: boolean
        shift: boolean
    }

    type MouseOverEvent = Event & {
        type: 'MouseOver' | 'MouseEnter' | 'MouseLeave',
        x: number
        y: number
        alt: boolean
        ctrl: boolean
        shift: boolean
    }

    type MouseButtonEvent = Event & {
        type: 'MouseDown'|'MouseUp'
        button: MouseButton
        x: number
        y: number
        alt: boolean
        ctrl: boolean
        shift: boolean
    }

}

namespace Entities {
    type Movement = (
        | 'MOVE_UP'
        | 'MOVE_DOWN'
        | 'MOVE_LEFT'
        | 'MOVE_RIGHT'
    )

     type Command = {
        name: string
        category: Category
        action: (entity: import('../Interfaces/Commandable').default) => void
    }
}

namespace States {
    /**
     * Represents an application context that can be shared between states.
     */
    type Context = Readonly<{
        config: Core.AppConfig,
        assets: import('../Assets/AssetManager').default
        inputController?: import('../Interfaces/InputController').default
    }>
}

namespace UI {
    /**
     * Represents on which side can be UI component aligned.
     */
    type Alignment = (
        | 'start'
        | 'center'
        | 'end'
    )

    type Anchor = Partial<{
        horizontal: Alignment
        vertical: Alignment
        offsetX: number
        offsetY: number
        stretch: boolean
    }>

    type Padding =  [
        number,
        number,
        number,
        number
    ]

    type PaddingAxis = [
        number,
        number
    ]

    /**
     * Represents properties of UI component
     */
    type Props = {
        x: number
        y: number
        width: number
        height: number
        padding: number | PaddingAxis | Padding,
        borderColor: string
        backgroundColor: string
    }

    /**
     * Represents properties of UI component and text component.
     */
    type TextProps = Props & {
        font: string
        text: string
        textColor: string
        textAlign: Alignment
        verticalAlign: Alignment
    }

    /**
     * Represents properties of UI component and image component.
     */
    type ImageProps = Props & {
        source?: HTMLImageElement
    }


    /**
     * Represents properties of Text component.
     */
    type TextButtonProps = Props & {
        highlightTextColor: string
        highlightBorderColor: string,
        highlightBackgroundColor: string
        pressedTextColor: string
        pressedBorderColor: string,
        pressedBackgroundColor: string
    }

    type ButtonState = (
        | 'Idle'
        | 'Highlight'
        | 'Pressed'
        | 'Disabled'
    )
}