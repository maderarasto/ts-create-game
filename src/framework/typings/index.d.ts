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
        type: 'KeyDown' | 'KeyUp' | 'MouseDown' | 'MouseUp' | 'MouseMove'|'MouseEnter'|'MouseLeave' | 'MouseWheel',
        alt: boolean
        ctrl: boolean
        shift: boolean
    } | {
        type: 'KeyDown'|'KeyUp',
        code: string
        key: string
    } | {
        type: 'MouseDown' | 'MouseUp' | 'MouseMove'|'MouseEnter'|'MouseLeave' | 'MouseWheel',
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
    type Context = {
        config: Core.AppConfig,
        assets: import('../Assets/AssetManager').default
        inputController?: import('../Interfaces/InputController').default
    }
}