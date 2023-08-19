import Queue from "../Core/Structures/Queue";

/**
 * Represents interface that can handle keyboard events and realtime input.
 */
export default interface InputController {
    /**
     * Handle a keyboard event.
     * 
     * @param event event from queue.
     * @param commands command queue.
     */
    handleKeyboardEvent(event: Core.Event, commands: Queue<Entities.Command>): void;

    /**
     * Handle realtime input.
     * 
     * @param commands commands queue.
     */
    handleRealtimeInput(commands: Queue<Entities.Command>): void;
}