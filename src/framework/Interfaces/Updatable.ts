/**
 * Provides update game logic funcionality.
 */
export default interface Updatable {
    /**
     * Updates game logic of component.
     * 
     * @param deltaTime delta time for current update.
     */
    update(deltaTime: number): void|boolean;
}