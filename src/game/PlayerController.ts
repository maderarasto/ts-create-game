import Mob from "../framework/Entities/Mob";
import { Category } from "../framework/Entities/Entity";
import Vector2 from "../framework/Core/Vector2";
import Queue from "../framework/Core/Structures/Queue";
import Input, { Keyboard, KeyboardKey } from "../framework/Core/Input";
import InputController from "../framework/Interfaces/InputController";

/**
 * Represents binding between player action identifier and its name.
 */
enum PlayerActionBinding {
    MOVE_UP = 'Move Up',
    MOVE_DOWN = 'Move Down',
    MOVE_LEFT = 'Move Left',
    MOVE_RIGHT = 'Move Right',
    JUMP = 'Jump',
    FIRE = 'Fire',
}

/**
 * Represents input key and its corresponding command.
 */
type KeyBinding = {
    key: KeyboardKey,
    command: Entities.Command
    realtime: boolean
};

/**
 * Provides funcitonality to specify input keys and its corresponding command to control playable characters.
 */
export default class PlayerController implements InputController {
    /**
     * Mapping of player move actions to corresponding vectors.
     */
    private static readonly MOVEMENT_VECTORS: 
        Map<Entities.Movement, Vector2> = new Map([
            ['MOVE_UP', new Vector2(0, -1)],
            ['MOVE_DOWN', new Vector2(0, 1)],
            ['MOVE_LEFT', new Vector2(-1, 0)],
            ['MOVE_RIGHT', new Vector2(1, 0)],
        ]
    );

    /**
     * Map of keys binded with commands.
     */
    private keyBindings: Map<Keyboard.Code, KeyBinding>;

    constructor() {
        this.keyBindings = new Map();
        this.setupKeyBindings();
    }

    /**
     * Handle a keyboard event. If key is register in controller and its not realtime input
     * then it will push its corresponding command to command queue.
     * 
     * @param event event from event queue
     * @param commands command queue
     */
    handleKeyboardEvent(event: Core.Event, commands: Queue<Entities.Command>) {
        let keyBinding: KeyBinding | undefined;

        if ('code' in event) {
            keyBinding = this.keyBindings.get(event.key as Keyboard.Code);
        } 

        if (!keyBinding || (keyBinding?.realtime ?? true)) {
            return;
        }
        
        commands.enqueue(keyBinding.command);
    }

    /**
     * Handle realtime input. If input key is pressed then it will push corresponding
     * command to command queue.
     * 
     * @param commands command queue
     */
    handleRealtimeInput(commands: Queue<Entities.Command>) {
        this.keyBindings.forEach((keyBinding, keyCode) => {
            if (!keyBinding.realtime) {
                return;
            }

            if (Input.isKeyPressed(keyCode)) {
                commands.enqueue(keyBinding.command);
            }
        })
    }

    /**
     * Register key bindings with corresponding commands.
     */
    private setupKeyBindings() {
        this.keyBindings.set('KeyW', this.createMoveBinding(KeyboardKey.KeyW, 'MOVE_UP'));
        this.keyBindings.set('KeyS', this.createMoveBinding(KeyboardKey.KeyS, 'MOVE_DOWN'));
        this.keyBindings.set('KeyA', this.createMoveBinding(KeyboardKey.KeyA, 'MOVE_LEFT'));
        this.keyBindings.set('KeyD', this.createMoveBinding(KeyboardKey.KeyD, 'MOVE_RIGHT'));
    }

    /**
     * Create key binding for movement.
     * 
     * @param key keyboard key
     * @param move entity movement
     * @returns key binding
     */
    private createMoveBinding(key: KeyboardKey, move: Entities.Movement): KeyBinding {
        return {
            key: key,
            command : {
                name: PlayerActionBinding[move],
                category: Category.Player,
                action: (entity) => {
                    const mobEntity = entity as Mob;
                    let moveVector = PlayerController.MOVEMENT_VECTORS.get(move) as Vector2;
    
                    mobEntity.velocity = Vector2.add(mobEntity.velocity, moveVector);
                }
            },
            realtime: true
        } as KeyBinding;
    }
}