import Mob from "./Entities/Mob";
import { Category } from "./Entities/Entity";
import Vector2 from "./Core/Vector2";
import Queue from "./Core/Queue";
import Input, { Keyboard, KeyboardKey } from "./Core/Input";

enum PlayerActionBinding {
    MOVE_UP = 'Move Up',
    MOVE_DOWN = 'Move Down',
    MOVE_LEFT = 'Move Left',
    MOVE_RIGHT = 'Move Right',
    JUMP = 'Jump',
    FIRE = 'Fire',
}

type KeyBinding = {
    key: KeyboardKey,
    command: Entities.Command
    realtime: boolean
};

export default class PlayerController {
    private static readonly MOVEMENT_VECTORS: 
        Map<Entities.Movement, Vector2> = new Map([
            ['MOVE_UP', new Vector2(0, -1)],
            ['MOVE_DOWN', new Vector2(0, 1)],
            ['MOVE_LEFT', new Vector2(-1, 0)],
            ['MOVE_RIGHT', new Vector2(1, 0)],
        ]
    );

    private keyBindings: Map<Keyboard.Code, KeyBinding>;

    constructor() {
        this.keyBindings = new Map();
        this.setupKeyBindings();
    }

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

    private setupKeyBindings() {
        this.keyBindings.set('KeyW', this.createMoveBinding(KeyboardKey.KeyW, 'MOVE_UP'));
        this.keyBindings.set('KeyS', this.createMoveBinding(KeyboardKey.KeyS, 'MOVE_DOWN'));
        this.keyBindings.set('KeyA', this.createMoveBinding(KeyboardKey.KeyA, 'MOVE_LEFT'));
        this.keyBindings.set('KeyD', this.createMoveBinding(KeyboardKey.KeyD, 'MOVE_RIGHT'));
    }

    private createMoveBinding(key: KeyboardKey, move: Entities.Movement): KeyBinding {
        return {
            key: key,
            command : {
                name: PlayerActionBinding[move],
                category: Category.Player,
                action: (entity) => {
                    const mobEntity = entity as Mob;
                    let moveVector = PlayerController.MOVEMENT_VECTORS.get(move) as Vector2;
                    moveVector = Vector2.multiply(moveVector, 100);
    
                    mobEntity.velocity = Vector2.add(mobEntity.velocity, moveVector);
                }
            },
            realtime: true
        } as KeyBinding;
    }
}