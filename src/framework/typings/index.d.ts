namespace Core {
    type AppConfig = {
        name: string

        default: {
            width: number,
            height: number
        }
    }

    /**
     * Represents a type event that can occur in event queue.
     */
    type EventType = (
        | 'KeyDown'
        | 'KeyUp'
        | 'MouseDown'
        | 'MouseUp'
        | 'MouseMove'
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
        type: 'KeyDown'|'KeyUp',
        code: string
        key: string
        alt: boolean
        ctrl: boolean
        shift: boolean
    } | {
        type: 'MouseMove'|'MouseEnter'|'MouseLeave',
        x: number
        y: number
        alt: boolean
        ctrl: boolean
        shift: boolean
        button: MouseButton
    } | {
        type: 'MouseDown'|'MouseUp',
        x: number
        y: number
        alt: boolean
        ctrl: boolean
        shift: boolean
        button: MouseButton
    } | {
        type: 'MouseWheel',
        x: number
        y: number
        alt: boolean
        ctrl: boolean
        shift: boolean
        delta: number
    }
}

namespace Entities {
    /**
     * Represents a category if entities.
     */
    type Category = (
        | 'Entity'
        | 'Enemy'     
        | 'Player'  
    );
}