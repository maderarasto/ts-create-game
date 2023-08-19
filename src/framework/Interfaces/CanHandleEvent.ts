/**
 * Provides functionality to handle event from event queue.
 */
export default interface CanHandleEvent {
    /**
     * Handle event from event queue.
     * 
     * @param event event
     */
    handleEvent(event: Core.Event): void|boolean;
}