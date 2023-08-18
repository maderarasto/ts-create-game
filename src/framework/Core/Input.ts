/**
 * Represents key on keyboard
 */
export enum KeyboardKey  {
    // Numbers
    Digit1 = '1',
    Digit2 = '2',
    Digit3 = '3',
    Digit4 = '4',
    Digit5 = '5',
    Digit6 = '6',
    Digit7 = '7',
    Digit8 = '8',
    Digit9 = '9',
    Digit0 = '0',

    // Letters
    KeyA = 'a',
    KeyB = 'b',
    KeyC = 'c',
    KeyD = 'd',
    KeyE = 'e',
    KeyF = 'f',
    KeyG = 'g',
    KeyH = 'h',
    KeyI = 'i',
    KeyJ = 'j',
    KeyK = 'k',
    KeyL = 'l',
    KeyM = 'm',
    KeyN = 'n',
    KeyO = 'o',
    KeyP = 'p',
    KeyQ = 'q',
    KeyR = 'r',
    KeyS = 's',
    KeyT = 't',
    KeyU = 'u',
    KeyV = 'v',
    KeyW = 'w',
    KeyX = 'x',
    KeyY = 'y',
    KeyZ = 'z',

    // Symbols
    Backquote = '`',
    Minus = '-',
    Equals = '=',
    BracketLeft = '[',
    BracketRight = ']',
    Backslash = '\\',
    Semicolon = ';',
    Quote = '\'',
    Comma = ',',
    Period = '.',
    Slash = '/',
    Space = 'Space',

    // Controls
    Backspace = 'Backspace',
    Enter = 'Enter',
    RightAlt = 'Alt',
    LeftAlt = 'Alt',
    RightControl = 'Control',
    LeftControl = 'Control',
    RightShift = 'Shift',
    LeftShift = 'Shift',
    ArrowUp = 'ArrowUp',
    ArrowLeft = 'ArrowLeft',
    ArrowDown = 'ArrowDown',
    ArrowRight = 'ArrowRight'
}

export declare namespace Keyboard {
    /**
     * Represents code of keyboard key
     */
    type Code = keyof typeof KeyboardKey

    /**
     * Represents status of keyboard key
     */
    type Status = 'KeyDown' | 'KeyUp'
}

/**
 * Represents of keyboard key with its status.
 */
type KeyboardKeyStatus = {
    key: KeyboardKey
    code: Keyboard.Code
    status: Keyboard.Status
}

/**
 * Provides functionality for realtime input.
 */
export default class Input {
    private static instance: Input;

    /**
     * Map of keyboard events.
     */
    private keys: Map<Keyboard.Code, KeyboardKeyStatus>;

    private constructor() {
        this.keys = new Map();
        
        (Object.keys(KeyboardKey) as Keyboard.Code[]).forEach(code => {
            this.keys.set(code, {
                key: KeyboardKey[code],
                code: code,
                status: 'KeyUp'
            });
        });

        window.addEventListener('keydown', this.handleKeyEvent.bind(this));
        window.addEventListener('keyup', this.handleKeyEvent.bind(this));
    }

    /**
     * Handle a keyboard event and set keyboard key status. 
     * 
     * @param ev keyboard event
     */
    private handleKeyEvent(ev: KeyboardEvent) {
        const key = this.keys.get(ev.code as Keyboard.Code);

        if (key) {
            key.status = ev.type === 'keydown' ? 'KeyDown' : 'KeyUp'
        }
    }

    /**
     * Check if keyboard key is currently pressed.
     * 
     * @param code code of keyboard key
     */
    static isKeyPressed(code: Keyboard.Code) {
        return Input.get().keys.get(code)?.status === 'KeyDown' ?? false;
    }

    /**
     * Translate a keyboard code to keyboard key.
     * 
     * @param code keyboard code
     * @returns keyboard key
     */
    static localize(code: Keyboard.Code) {
        return KeyboardKey[code];
    }

    /**
     * Translate a keyboard key to keyboard code.
     * 
     * @param key keyboard key
     * @returns keyboard code
     */
    static delocalize(key: KeyboardKey) {
        const keyboardCodes = Object.keys(KeyboardKey);
        const keyboardKeys = Object.values(KeyboardKey);

        return keyboardCodes[keyboardKeys.indexOf(key)];
    }

    /**
     * Get instance of input.
     * 
     * @returns instance of input.
     */
    private static get(): Input {
        if (!Input.instance) {
            Input.instance = new Input();
        }

        return Input.instance;
    }
}