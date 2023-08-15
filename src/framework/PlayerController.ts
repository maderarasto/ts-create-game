import Mob from "./Entities/Mob";
import { Category } from "./Entities/Entity";
import Vector2 from "./Core/Vector2";

type PlayerAction = (
    | 'MOVE_UP'
    | 'MOVE_DOWN'
    | 'MOVE_LEFT'
    | 'MOVE_RIGHT'
    | 'JUMP'
    | 'FIRE'
);

export default class PlayerController {
    private static readonly MOVEMENT_VECTORS: 
        Map<Entities.Movement, Vector2> = new Map([
            ['MOVE_UP', new Vector2(0, -1)],
            ['MOVE_DOWN', new Vector2(0, 1)],
            ['MOVE_LEFT', new Vector2(-1, 0)],
            ['MOVE_RIGHT', new Vector2(1, 0)],
        ]
    );

    private keyBindings: Map<string, PlayerAction>;
    private actionBindings: Map<PlayerAction, Entities.Command>;

    constructor() {
        this.keyBindings = new Map();
        this.actionBindings = new Map();

        this.setupKeys();
        this.setupActions();
    }

    handleKeyEvent(event: KeyboardEvent) {
        const foundAction = this.keyBindings.get(event.key);

        if (!foundAction) {
            return;
        }

        const foundCommand = this.actionBindings.get(foundAction);

        if (!foundCommand) {
            return;
        }

        // TODO: enque command of triggered event
    }

    private setupKeys() {
        this.keyBindings.set('w', 'MOVE_UP');
        this.keyBindings.set('s', 'MOVE_DOWN');
        this.keyBindings.set('a', 'MOVE_LEFT');
        this.keyBindings.set('d', 'MOVE_RIGHT');
    }

    private setupActions() {
        this.createMoveCommand('Move Up', 'MOVE_UP');
        this.createMoveCommand('Move Down', 'MOVE_DOWN');
        this.createMoveCommand('Move Left', 'MOVE_LEFT');
        this.createMoveCommand('Move Right', 'MOVE_RIGHT');
    }

    private createMoveCommand(name: string, move: Entities.Movement) {
        this.actionBindings.set(move, {
            name: name,
            category: Category.Player,
            action: (entity) => {
                (entity as Mob).velocity = PlayerController.MOVEMENT_VECTORS.get(move) as Vector2;
            }
        })
    }
}