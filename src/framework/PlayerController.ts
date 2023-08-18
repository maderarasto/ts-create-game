import Mob from "./Entities/Mob";
import { Category } from "./Entities/Entity";
import Vector2 from "./Core/Vector2";
import Queue from "./Core/Queue";
import { Keyboard, KeyboardKey } from "./Core/Input";

enum PlayerActionBinding {
    MOVE_UP = 'Move Up',
    MOVE_DOWN = 'Move Down',
    MOVE_LEFT = 'Move Left',
    MOVE_RIGHT = 'Move Right',
    JUMP = 'Jump',
    FIRE = 'Fire',
}

type PlayerAction = keyof typeof PlayerActionBinding;

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

    handleKeyEvent(event: KeyboardEvent, commands: Queue<Entities.Command>) {
        // const keyBinding = this.keyBindings.get(event.key);
        
        // if (!keyBinding) {
        //     return;
        // }
        
        // commands.enqueue(keyBinding.command);
    }

    private setupKeyBindings() {
        // this.keyBindings.set('KeyW', this.createMoveCommand('MOVE_UP'),);
        // this.keyBindings.set('KeyS', 'MOVE_DOWN');
        // this.keyBindings.set('KeyA', 'MOVE_LEFT');
        // this.keyBindings.set('KeyD', 'MOVE_RIGHT');
    }

    // private setupActions() {
    //     this.createMoveCommand('Move Up', 'MOVE_UP');
    //     this.createMoveCommand('Move Down', 'MOVE_DOWN');
    //     this.createMoveCommand('Move Left', 'MOVE_LEFT');
    //     this.createMoveCommand('Move Right', 'MOVE_RIGHT');
    // }

    private createMoveBinding(move: Entities.Movement) {
        {

        }

        return {
            name: PlayerActionBinding[move],
            category: Category.Player,
            action: (entity) => {
                const mobEntity = entity as Mob;
                const moveVector = PlayerController.MOVEMENT_VECTORS.get(move) as Vector2;

                mobEntity.velocity = Vector2.add(mobEntity.velocity, moveVector);
            }
        } as Entities.Command;
    }
}